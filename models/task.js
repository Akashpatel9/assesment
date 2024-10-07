import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ["completed", "pending"],
        default: "pending",
    }
}, { timestamps: true });


export const taskModel = mongoose.model("Task", taskSchema);