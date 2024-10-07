import express from "express";
import { dbConnect } from "./configs/db.js";
import dotenv from "dotenv";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import cors from "cors"

const app = express();


// configs
dotenv.config();
dbConnect();

app.use(cors())


const PORT = process.env.PORT || 3000;

app.use(express.json());



app.use("/user",userRouter)
app.use("/tasks",taskRouter)


// // test route
// app.get('/', (req, res) => {
//     res.send("Hello World!")
// })


// undefined route
app.get("*", (req, res) => {
    res.status(404).json({
        message: "Route Not Found",
        success: false
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

// global catch
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({
        message: "Something went wrong!",
        error: err.message
    });
});

