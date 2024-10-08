# Task Manager API

A task manager API that allows users to sign up, log in, and perform CRUD operations on tasks. Includes JWT-based authentication and task filtering with pagination.

## Features
- **User Authentication:** Sign up and Sign in using JWT
- **CRUD Operations:** Create, Read, Update, Delete tasks
- **Task Filtering & Pagination**

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT
- **Validation:** Zod

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB

### Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Akashpatel9/assesment.git
   cd assesment
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file in the root directory:**
   ```bash
   touch .env
   ```

4. **Add the following variables in the `.env` file:**
   ```bash
   PORT=5000
   MONGO_URI=your_mongo_database_uri
   JWT_SECRET=your_jwt_secret_key
   ```

5. **Start the server:**
   ```bash
   npm start
   ```

   The server will be running on `http://localhost:5000`.

## API Endpoints

### Postman Collection
You can access the Postman collection [here](https://api.postman.com/collections/36422499-f203e658-c399-4726-9afd-2c940ff22a79?access_key=PMAT-01J9KPQXFTD42HHKY5Y70WSFWB).

### 1. Signup
- **Method:** `POST`
- **Endpoint:** `/user/signup`
- **Request Body:**
  ```json
  {
    "username": "your_username",
    "email": "your_email",
    "password": "your_password"
  }
  ```
- **URL:** [https://assesment-1-t29e.onrender.com/user/signup](https://assesment-1-t29e.onrender.com/user/signup)

### 2. Signin
- **Method:** `POST`
- **Endpoint:** `/user/signin`
- **Request Body:**
  ```json
  {
    "email": "your_email",
    "password": "your_password"
  }
  ```
- **URL:** [https://assesment-1-t29e.onrender.com/user/signin](https://assesment-1-t29e.onrender.com/user/signin)

### 3. Get All Tasks
- **Method:** `GET`
- **Endpoint:** `/tasks`
- **Authorization:** Bearer Token
- **Query Parameters:** `status`, `dueDate`, `page`, `limit`
- **URL:** [https://assesment-1-t29e.onrender.com/tasks](https://assesment-1-t29e.onrender.com/tasks?status&dueDate=&page=1&limit=10)

### 4. Add Task
- **Method:** `POST`
- **Endpoint:** `/tasks`
- **Authorization:** Bearer Token
- **Request Body:**
  ```json
  {
    "title": "Task title",
    "description": "Task description",
    "dueDate": "2024-10-10",
    "status": "pending"
  }
  ```
- **URL:** [https://assesment-1-t29e.onrender.com/tasks](https://assesment-1-t29e.onrender.com/tasks)

### 5. Get Task by ID
- **Method:** `GET`
- **Endpoint:** `/tasks/{taskId}`
- **Authorization:** Bearer Token
- **URL:** [https://assesment-1-t29e.onrender.com/tasks/{taskId}](https://assesment-1-t29e.onrender.com/tasks/{taskId})

### 6. Update Task
- **Method:** `PUT`
- **Endpoint:** `/tasks/{taskId}`
- **Authorization:** Bearer Token
- **Request Body:**
  ```json
  {
    "title": "Updated task title",
    "description": "Updated task description",
    "dueDate": "2024-10-10",
    "status": "completed"
  }
  ```
- **URL:** [https://assesment-1-t29e.onrender.com/tasks/{taskId}](https://assesment-1-t29e.onrender.com/tasks/{taskId})

### 7. Delete Task
- **Method:** `DELETE`
- **Endpoint:** `/tasks/{taskId}`
- **Authorization:** Bearer Token
- **URL:** [https://assesment-1-t29e.onrender.com/tasks/{taskId}](https://assesment-1-t29e.onrender.com/tasks/{taskId})
