import { Router } from "express";
import { auth } from "../middlewares/user.js";
import { createTaskHandler, deleteTaskHandler, getAllTaskHandler, getTaskByIdHandler, updateTaskHandler } from "../controllers/task.js";

const route = Router();

route.post("/", auth, createTaskHandler);
route.get("/", auth, getAllTaskHandler);
route.get("/:id", auth, getTaskByIdHandler);
route.put("/:id", auth, updateTaskHandler);
route.delete("/:id",auth, deleteTaskHandler);

export default route;
