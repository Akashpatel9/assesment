

# Task Management API

## Overview
A Task Management API with user authentication and task management features.

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
You can import the following Postman collection to test the API endpoints:

[Postman Collection](https://api.postman.com/collections/36422499-213d0121-d660-4779-93af-38363a51cab6?access_key=PMAT-01J9KMGT3XGZ9784WADCBDCKFT)

---
