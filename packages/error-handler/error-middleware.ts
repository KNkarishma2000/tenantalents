import { NextFunction, Request, Response } from "express";
import { AppError } from "./index"

export const errorMiddleware = (err: Error, req:Request, res: Response, next:NextFunction) => {
    if(err instanceof AppError){
        console.log(`AppError: ${req.method} ${req.url}: ${err.message}`);

        return res.status(err.statusCode).json({
            status: "error",
            message: err.message,
            ...(err.details ? { details: err.details } : {}),
        });
    }

    console.log(`Unexpected Error:`, err);
    return res.status(500).json({
        status: "error",
        message: "An unexpected error occurred. Please try again later.",
    });
}