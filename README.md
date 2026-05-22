# User Management App

User Management App is a full-stack web application developed using the MERN stack. The application allows users to perform CRUD (Create, Read, Update, Delete) operations and manage user information efficiently.

The project consists of a frontend built with React and Vite, and a backend developed using Express and MongoDB. Users can add new records, view existing users, update user details, and delete users through a simple and structured interface.

This project was created to practice full-stack development concepts such as frontend-backend communication, REST APIs, routing, database integration, and state management.

## Features

- Add new users
- View list of users
- Update user information
- Delete users
- Navigation between pages
- REST API integration
- Backend database connectivity
- Error handling
- Responsive interface

## Technologies Used

### Frontend
- React
- Vite
- JavaScript
- CSS
- React Router

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS
- dotenv

## Project Structure

project/
│
├── Frontend/
│   ├── src/
│   │   ├── Components/
│   │   ├── App.jsx
│   │   └── main.jsx
│
├── Backend/
│   ├── APIs/
│   ├── Models/
│   ├── server.js
│   └── package.json

## API Endpoints

### User APIs

- GET /user-api/users  
  Fetch all users

- GET /user-api/users/:id  
  Fetch user by ID

- POST /user-api/users  
  Add a new user

- PUT /user-api/users/:id  
  Update user details

- DELETE /user-api/users/:id  
  Delete user

## Installation

### Clone the repository

```bash
git clone <repository-url>
```

### Setup Frontend

```bash
cd Frontend
npm install
npm run dev
```

### Setup Backend

```bash
cd Backend
npm install
npm start
```

## Database Configuration

Create a `.env` file inside the Backend folder and add:

```env
PORT=5000
DB_URL=your_mongodb_connection_string
```

## Learning Objectives

This project helps in understanding:

- React component structure
- React Router
- Express API creation
- MongoDB integration
- CRUD operations
- RESTful APIs
- Frontend and backend connection
- Error handling

## Author

Developed as a MERN stack learning and practice project.
