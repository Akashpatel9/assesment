### Postman Collection

You can access the complete Postman collection [here](https://api.postman.com/collections/36422499-f203e658-c399-4726-9afd-2c940ff22a79?access_key=PMAT-01J9KPQXFTD42HHKY5Y70WSFWB).



### API Documentation

#### 1. Signup
- **Endpoint:** `POST /user/signup`
- **Request Body:**
```json
{
    "username": "akash",
    "email": "akashsp@gmail.com",
    "password": "akash@123"
}
```
- **URL:** `https://assesment-1-t29e.onrender.com/user/signup`

#### 2. Signin
- **Endpoint:** `POST /user/signin`
- **Request Body:**
```json
{
    "email": "akashsp@gmail.com",
    "password": "akash@123"
}
```
- **URL:** `https://assesment-1-t29e.onrender.com/user/signin`

#### 3. Get All Tasks
- **Endpoint:** `GET /tasks`
- **Authorization:** Bearer Token
- **Query Parameters:** `status`, `dueDate`, `page`, `limit`
- **URL:** `https://assesment-1-t29e.onrender.com/tasks?status&dueDate=&page=1&limit=10`

#### 4. Add Task
- **Endpoint:** `POST /tasks`
- **Authorization:** Bearer Token
- **Request Body:**
```json
{
    "title": "hee",
    "description": "hee how are you",
    "dueDate": "2024-10-10",
    "status": "pending"
}
```
- **URL:** `https://assesment-1-t29e.onrender.com/tasks`

#### 5. Get Task by ID
- **Endpoint:** `GET /tasks/{taskId}`
- **Authorization:** Bearer Token
- **URL:** `https://assesment-1-t29e.onrender.com/tasks/{taskId}`

#### 6. Update Task
- **Endpoint:** `PUT /tasks/{taskId}`
- **Authorization:** Bearer Token
- **Request Body:**
```json
{
    "title": "foodeeeeeeeeeee",
    "description": "hee how are you",
    "dueDate": "2024-10-10",
    "status": "completed"
}
```
- **URL:** `https://assesment-1-t29e.onrender.com/tasks/{taskId}`

#### 7. Delete Task
- **Endpoint:** `DELETE /tasks/{taskId}`
- **Authorization:** Bearer Token
- **URL:** `https://assesment-1-t29e.onrender.com/tasks/{taskId}`



