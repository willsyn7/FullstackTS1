import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'




interface authController{

    verify(
        req : Request,
        res: Response,
        next : NextFunction,
    ) : Promise<void>;


}

const authController: Partial<auth> = { }
authController.verify = async (req,res,next) => {
    try {

        const token = req.cookies.token; 

        if (!token) {

            res.status(401).json({ message: 'Cookie is Missing, Invalid' });
  
            return; 
        }

        const decoded = jwt.verify(token, 'secret');
        res.locals.user = decoded;
        
  
        next();
        return;


    } catch (error) {
        console.log(error);
        
        // Pass error to global error handler
        next({
            log: 'Error Verifying JWT',
            status: 501,
            Message: 'Invalid Token'
        });
        return;
    }
};





export default authController