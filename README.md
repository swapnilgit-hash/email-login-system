# Email Verification Backend Service

# Overview

This project is a Node.js backend service that allows users to:

- Register using name, email, and password
- Receive a verification email with a unique link
- Verify their email address
- Login only after successful email verification

---

# Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- bcrypt (password hashing)
- nodemailer (email sending)
- crypto (secure token generation)

---

## Setup Instructions

### Clone the repository

```
git clone https://github.com/swapnilgit-hash/email-login-system.git
cd LoginProject
```

---

### Install dependencies

```
npm install
```

---

### Configure environment variables

Create a `.env` file in the root directory:

```
PORT=3000

MONGO_URI=mongodb://localhost:27017/email-verification

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password


### Run the server

For development:

```

npm run start

```

For production:

```

node server.js

```

---

## Base URL

```

http://localhost:3000

```

---

## Email Verification Flow

1. User registers
2. Server generates a verification token
3. Email is sent with verification link

Example:

```

http://localhost:3000/api/auth/verify-email?token=your_token_here

````

4. User clicks the link
5. Account gets verified

---

## API Endpoints

---

###  1. Register User

**POST** `/api/auth/register`

#### Request Body

```json
{
  "name": "Swapnil",
  "email": "swapnil@gmail.com",
  "password": "123456"
}
````

#### Response

```json
{
  "message": "User registered. Please verify email."
}
```

---

### 🔹 2. Verify Email

**GET** `/api/auth/verify-email?token=your_token_here`

#### Success Response

```json
{
  "message": "Email verified successfully"
}
```

#### Error Responses

```json
{
  "message": "Invalid token"
}
```

```json
{
  "message": "Token expired"
}
```

---

### 🔹 3. Login User

**POST** `/api/auth/login`

#### Request Body

```json
{
  "email": "swapnil@gmail.com",
  "password": "123456"
}
```

---

#### Success

```json
{
  "message": "Login successful"
}
```

---

#### If Email Not Verified

```json
{
  "message": "Please verify your email before login"
}
```

---

#### Invalid Credentials

```json
{
  "message": "Invalid credentials"
}
```

---

## Security Practices

- Passwords are hashed using bcrypt
- Verification tokens are securely generated using crypto
- Tokens have expiration (24 hours)
- Login is restricted for unverified users

---

## Error Handling

- Duplicate email registration
- Invalid or expired verification token
- Invalid login credentials
- Unverified account login attempt

---

## Future Improvements

- Resend verification email
- JWT authentication
- Rate limiting
- Email queue using Redis + BullMQ

---

## Author

Swapnil
