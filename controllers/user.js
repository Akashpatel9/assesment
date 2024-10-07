import jwt from "jsonwebtoken";
import { userModel } from "../models/user.js";
import bcryptjs from "bcryptjs";
import { string, z } from 'zod';


const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[0-9])(?!.*\s).{6,}$/;

const signUpSchema = z.object({
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email format"),
    password: z.string()
        .min(6, "Password must be at least 6 characters long")
        .regex(passwordRegex, "Password must contain at least one special character and one number, and cannot contain spaces"),
});

const signInSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string()
        .min(6, "Password must be at least 6 characters long")
        .regex(passwordRegex, "Password must contain at least one special character and one number, and cannot contain spaces"),
});



// signUp handler
export const signUpHandler = async (req, res) => {
    try {

        // Verify input
        const parsedData = signUpSchema.parse(req.body)

        // get data from body
        const { username, email, password } = req.body;

        // Check if all fields are provided
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        // Check if the user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already registered",
                success: false
            });
        }

        // Hash the password
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Create a new user
        const userDetails = await userModel.create({
            username,
            email,
            password: hashedPassword
        });

        // successfull response
        return res.status(201).json({
            message: "User signed up successfully",
            success: true,
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



// signIn handler
export const signInHandler = async (req, res) => {
    try {

        // Verify input
        const parsedData = signInSchema.parse(req.body);


        // get data from body
        const { email, password } = req.body;

        // Check if all fields are provided
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        // Check if the user not exists
        const existingUser = await userModel.findOne({ email });
        if (!existingUser) {
            return res.status(401).json({
                message: "User not registered",
                success: false
            });
        }

        // check password
        const resCheckPassword = await bcryptjs.compare(password, existingUser?.password);
        if (!resCheckPassword) {
            return res.status(401).json({
                message: "Wrong Password",
                success: false
            });
        }

        // generating jwt token
        const token = await jwt.sign({ email }, process.env.JWT_SECRET, {
            expiresIn: '3h'
        });

        return res.status(200).json({
            message: "Successfully logged in",
            success: true,
            token
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
