import { Request, Response, NextFunction } from "express";
import { VerifyErrors } from "jsonwebtoken";
import { verifyToken } from "./jwt";
const cookieName: string = process.env.COOKIE_NAME! || "r45demo";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token: string = req.cookies[cookieName];
    if (!token) return res.status(401).redirect("/login");
    verifyToken(token).then(decodedToken => {
        res.locals = decodedToken; next();
    }).catch(err => {
        res.locals = {};
        const error = err as VerifyErrors;
        return res.status(401).redirect("/login");
    });
}