import mongoose from "mongoose";
import { taskModel } from "../models/task.js";
import { userModel } from "../models/user.js";
import { z } from "zod";


// Define schemas for validation
const createTaskSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    dueDate: z.string(),
    status: z.enum(["pending", "completed"]).optional()
});

const updateTaskSchema = z.object({
    title: z.string().min(1, "Title is required").optional(),
    description: z.string().min(1, "Description is required").optional(),
    status: z.enum(["pending", "completed"]).optional()
});





export const createTaskHandler = async (req, res) => {
    try {
        // Validate input
        createTaskSchema.parse(req.body);

        // get data from request body
        const { title, description, dueDate , status} = req.body;

        // check all fields
        if (!title || !description || !dueDate) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        // Create task in db
        const taskData = await taskModel.create({
            title,
            description,
            dueDate,
            status
        });

        // Find the user
        const userData = await userModel.findOne({ email: req.user.email });

        // Check if the user exists or not
        if (!userData) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        
        // Push taskId to user tasks array
        userData.tasks.push(taskData._id);
        await userData.save();
        
        userData.password = undefined

        return res.status(200).json({
            message: "Successfully created task",
            success: true,
            data: {
                task: taskData,
                user: userData
            }
        });

    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.errors.map((err)=>err.message), success: false });
        }
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
};





export const getAllTaskHandler = async (req, res) => {
    try {

        const { status, dueDate, page, limit } = req.query;


        // fetch current user all tasks
        const userData = await userModel.findOne({ email: req.user.email }).populate("tasks");

        // Check if the user exists or not
        if (!userData) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        // removed password for security purpose
        userData.password = undefined

        let filteredTasks = userData.tasks;
        

        // filter by status
        if (status=="completed" || status == "pending") {
            filteredTasks = filteredTasks?.filter(task => {
                return task.status == status
            });
        }

         // filter by date
        if (dueDate) {
            filteredTasks = filteredTasks?.filter(task => {

                const recordDate = new Date(task.dueDate);
                const userInputDate = new Date(dueDate);

                return (recordDate.toISOString().slice(0, 10) === userInputDate.toISOString().slice(0, 10));
            });
        }


        // Convert page and limit to number
        let pageNum = parseInt(page);
        let limitNum = parseInt(limit);

        if(!pageNum){
            pageNum = 1;
        }
        if(!limitNum){
            limitNum = 10;
        }

        // Pagination
        const totalTasks = filteredTasks.length;
        const startIndex = (pageNum - 1) * limitNum;
        const endIndex = startIndex + limitNum;

        const paginatedTasks = filteredTasks.slice(startIndex, endIndex);

        // sucessfull response
        return res.status(200).json({
            message: "Successfully get all task",
            success: true,
            data: paginatedTasks
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
};





export const getTaskByIdHandler = async (req, res) => {
    try {
        const { id } = req.params;

        // check id is correct
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid task ID",
                success: false
            });
        }

        // Fetch the task by ID
        const taskData = await taskModel.findById(id);

        // Check if the task exists
        if (!taskData) {
            return res.status(404).json({
                message: "Task not found",
                success: false
            });
        }

        // check if the task belongs to the user
        const userData = await userModel.findOne({ email: req.user.email });
        if (!userData || !userData.tasks.includes(taskData._id)) {
            return res.status(403).json({
                message: "You dont have permission to access this task",
                success: false
            });
        }

        return res.status(200).json({
            message: "Successfully retrieved task by ID",
            success: true,
            data: taskData
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
};








export const updateTaskHandler = async (req, res) => {
    try {
        const { id } = req.params;

        // check id is correct
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid task ID",
                success: false
            });
        }

        // Validate input
        updateTaskSchema.parse(req.body);

        const { title, description, dueDate, status } = req.body;

        // check all fields
        if (!title || !description || !dueDate) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        // update the task by ID
        const taskData = await taskModel.findById(id);


        // Check if the task exists
        if (!taskData) {
            return res.status(404).json({
                message: "Task not found",
                success: false
            });
        }

        // check if the task belongs to the user
        const userData = await userModel.findOne({ email: req.user.email });
        if (!userData || !userData.tasks.includes(taskData._id)) {
            return res.status(403).json({
                message: "You dont have permission to manuplate this task",
                success: false
            });
        }

        // update task
        const data = await taskModel.findByIdAndUpdate({_id:id},{
            title, description, dueDate, status
        },{new:true});

        return res.status(200).json({
            message: "Successfully update task by ID",
            success: true,
            data: data
        });

    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.errors.map((err)=>err.message), success: false });
        }
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
};





export const deleteTaskHandler = async (req, res) => {
    try {
        const { id } = req.params;

        // check id is correct
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid task ID",
                success: false
            });
        }

        // delete the task by ID
        const taskData = await taskModel.findById(id);


        // Check if the task exists
        if (!taskData) {
            return res.status(404).json({
                message: "Task not found",
                success: false
            });
        }

        // Optionally check if the task belongs to the user
        const userData = await userModel.findOne({ email: req.user.email });
        if (!userData || !userData.tasks.includes(taskData._id)) {
            return res.status(403).json({
                message: "You dont have permission to manuplate this task",
                success: false
            });
        }


        // delete task
        const data = await taskModel.findByIdAndDelete(id);


        // sucess response
        return res.status(200).json({
            message: "Successfully delete task by ID",
            success: true,
            data
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
};
