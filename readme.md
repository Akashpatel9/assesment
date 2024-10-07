# Task Management API

## Overview
A simple Task Management API that provides user authentication and task management functionalities.

## Features
1. **User Authentication & Authorization:**
   - JWT-based authentication.
   - Endpoints to create and log in users.

2. **Task Management:**
   - CRUD operations for tasks.
   - Filtering tasks by status and due date.

3. **Security Considerations:**
   - Ensure only task owners can manage their tasks.
   - Input validation for all API requests.

4. **Error Handling & Logging:**
   - Clear error messages for invalid requests.

5. **Database:**
   - MongoDB for data storage.

6. **Deployment:**
   - Deployed on AWS (or specify your chosen platform).

## Environment Variables
- `DB_URL`: MongoDB connection string
- `PORT`: Server port (default: 3000)
- `JWT_SECRET`: Secret key for JWT

## API Endpoints

### User Authentication
- **POST /user/signup**
  - Create a new user account.
  - **Body:**
    ```json
    {
      "username": "string",
      "email": "string",
      "password": "string"
    }
    ```

- **POST /user/signin**
  - Log in an existing user and generate a JWT token.
  - **Body:**
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```

### Task Management
- **POST /tasks**
  - Create a new task.
  - **Body:**
    ```json
    {
      "title": "string",
      "description": "string",
      "dueDate": "YYYY-MM-DD",
      "status": "Pending/Completed"
    }
    ```

- **GET /tasks**
  - List all tasks for the authenticated user.
  - **Query Parameters:**
    - `status` (optional)
    - `dueDate` (optional)
    - `page` (optional, default: 1)
    - `limit` (optional, default: 10)

- **GET /tasks/:id**
  - Fetch a specific task by its ID.

- **PUT /tasks/:id**
  - Update a task's details.
  - **Body:**
    ```json
    {
      "title": "string",
      "description": "string",
      "dueDate": "YYYY-MM-DD",
      "status": "Pending/Completed"
    }
    ```

- **DELETE /tasks/:id**
  - Delete a task by its ID.

## Postman Collection
You can import the provided Postman collection to test the API endpoints.
