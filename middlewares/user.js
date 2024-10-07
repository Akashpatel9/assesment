import jwt from "jsonwebtoken";
import { z } from 'zod';

const headersSchema = z.object({
    authorization: z.string().min(1, "Authorization header is required"),
});

export const auth = async (req, res, next) => {
    try {
        // Validate headers
        const headersValidationResult = headersSchema.safeParse(req.headers);

        if (!headersValidationResult.success) {
            return res.status(400).json({
                message: headersValidationResult.error.errors,
                success: false,
            });
        }

        // Extract token from authorization header
        const token = req.headers.authorization.split(' ')[1];

        // Check if the token is present
        if (!token) {
            return res.status(401).json({
                message: "Token not found",
                success: false,
            });
        }

        // Verify the token
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        next();

    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                message: "Invalid token",
                success: false,
            });
        }

        return res.status(500).json({
            message: error.message,
            success: false,
        });
    }
};
