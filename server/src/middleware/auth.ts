import { Request, Response, NextFunction } from "express";
import jwt, {JwtPayload} from 'jsonwebtoken'
export const authenticateToken = (req:Request, res:Response, next:NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({error:'Access denied'});
    try {
        const verified = jwt.verify(token, 'secret') as JwtPayload;
        // Check if verified is a JwtPayload and contains id
        if (typeof verified !== 'string' && verified.id) {
            req.user = verified as JwtPayload & {id: string}
        }
    } catch (error) {
        res.status(400).json({error: 'Invalid token'})
    }
};

