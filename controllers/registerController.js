// controllers/registerController.js
const db = require('../config/firebase');  // Import Firestore reference
const { sendConfirmationEmail } = require('../services/mailService');  // Email service

// Regular expression for email validation
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

exports.registerStudent = async (req, res) => {
  const { name, email, className } = req.body;

  // Validate the email format
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  if (!name || !email || !className) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
   // Step 1: Check if the email already exists in Firestore
    const existingStudentRef = db.collection('students').where('email', '==', email);
    const existingStudentSnapshot = await existingStudentRef.get();

    if (!existingStudentSnapshot.empty) {
      // If the snapshot is not empty, it means the email already exists
      return res.status(400).json({ error: 'Email is already registered' });
    }

    // Step 2: If email is unique, continue with ID generation and registration process
    const counterRef = db.collection('system').doc('student_counter');
    const counterDoc = await counterRef.get();

    let studentId;
    if (!counterDoc.exists) {
      studentId = 'STD001';
      await counterRef.set({ counter: 1 });
    } else {
      const counter = counterDoc.data().counter;
      studentId = `STD${(counter).toString().padStart(3, '0')}`;
      await counterRef.update({ counter: counter + 1 });
    }

    const studentData = {
      id: studentId,
      name,
      email,
      className,
      registeredAt: new Date()
    };

    const newStudentRef = db.collection('students').doc(studentId);
    await newStudentRef.set(studentData);

    await sendConfirmationEmail(name, studentId, className, email);

    res.status(201).json({ message: 'Registration successful', student: studentData });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ error: 'Registration failed' });
  }
};
