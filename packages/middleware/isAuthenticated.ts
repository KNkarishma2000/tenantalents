/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response, NextFunction } from "express";
import  jwt  from "jsonwebtoken";
import prisma from "packages/libs/prisma";

const isAuthenticated = async (req:any, res:Response, next:NextFunction) => {
    try {
        const token = req.cookies.access_token || req.headers.authorization?.split(" ")[1];

        if(!token) {
            return res.status(410).json({message:"Authentication not allowed, No, Auth Token"});
        }

        //verifying token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as {
            id: string;
            role: "user" | "Seller"
        };

        if(!decoded) {
            return res.status(401).json({message: "Invalid Access Token found..."});
        }

        const account = await prisma.users.findUnique({where: {id:decoded.id}});

        req.user = account;

        if(!account) {
            return res.status(401).json({message: "Account Not available.."});
        }

        return next();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return res.status(401).json({message: "Token Expired.."});
    }
}

export default isAuthenticated;