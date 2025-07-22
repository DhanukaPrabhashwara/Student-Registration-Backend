# Student Registration System

A system designed to manage student registrations. It allows students to register using name, email address and class name, then send confirmation emails to students.

## Technologies Used
- Backend: Node.js, Express.js
- Database: Firestore
- Email Service: Nodemailer

## Setup Instructions
1. Clone the repository
```bash
   git clone https://github.com/DhanukaPrabhashwara/Student-Registration-Backend.git
   cd Student-Registration-Backend
```
2. Install the dependencies
```bash
   npm install
```
3. Set up your environment variables in a .env file
```bash
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-email-app-password
```
4. Start the application
```bash
   node app.js
```

## API Endpoints
### Example API call
To register a student, send a `POST` request to `http://localhost:5000/api/register` with the following JSON body:

```json
{
  "name": "Simon Riley",
  "email": "simon.riley@example.com",
  "className": "Math M01"
}
