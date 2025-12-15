// import { NextFunction } from 'express';
import {pool} from '../models/MessageModel.ts';
import { Request, Response, NextFunction, json } from "express";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";





// - [X ] In `server/controllers/messageController.ts`, add the following functionality as a middleware controller. (Since these functions will act as middleware, they should take the appropriate arguments and perform the necessary callback operation(s).)
//   - [X ] `messageController.postMessage` should create a new item in the database
//   - [ X] `messageController.getMessages` should retrieve all items from the database and send it back to the client as JSON
//   - [ X] `messageController.deleteMessage` should find items in the database based on an `id` and delete the `message` if it exists. (Later, you will be asked to authenticate before deleting the message.)

interface loginBody{
    id : Number,
    // token : string,

}
interface payLoad{
    userId : Number,
}


interface PostMessageBody {
    id : string,
    message : string,
    password : string,
}

interface deleteMessage {
    id : string,
}


interface messageController  {
 postMessage(
    req: Request<{}, {}, PostMessageBody>,  // req.body = PostMessageBody
    res: Response,
    next: NextFunction
  ): Promise<void>;

  getMessages(
    req : Request,
    res : Response,
    next : NextFunction
  ): Promise<void>;

  deleteMessage(
    req : Request<{},{},deleteMessage>,
    res : Response,
    next : NextFunction
  ): Promise<void>;
}

interface userController {
    login(
        req: Request,
        res : Response,
        next : NextFunction
    ): Promise<void>;

}




const messageController : Partial<messageController> = {};
const userController : Partial<userController> = {};


messageController.postMessage = async  (req : Request ,res : Response ,next : NextFunction)  => {
    try{
    const {password, message} = req.body;
    const id = uuidv4();


    await pool.query(`INSERT INTO "Message"(id,message,password) VALUES($1,$2,$3)`,
        [id,message, password,]
    )
     res.status(200).send(`Message Sucesffully posted`)

    }catch(error){
        console.log(error)
        return next(
            {
                log : `Error 501`,
                status : 500,
                message : `Error in PostMessageController `
        }
            
        )

    }
}


messageController.getMessages = async(req,res, next) => {
    try{
       const data =  await pool.query(`SELECT * FROM "Message" `
        );
            console.log(data);
           res.status(201).json({
                log : `Message Sucessful`,
                rows : data.rows
           })
    }catch(error){
        return next(
            {
                log : `Error 501`,
                status : 500,
                message : `Error While retriving Message`
            }
        )

    }

}
messageController.deleteMessage = async(req,res , next) => {
    try{
    const {id} = req.body;
 
    const result = await pool.query(
      `DELETE FROM "Message" WHERE id = $1 RETURNING *`,
      [id]
    );

    res.status(200).json({
        message : `Delete Sucessful`,
        deleted : result.rows[0]
    })
    }catch(error){
        console.log(error)
        return next({
            log : `Error`,
            status : 500,
            message : `Error while deleteting` 
        })

    }
}



userController.login = async (req,res,next) => {
    try{
        const {id} = req.body;
        const payload : payLoad = {userId : id };
        const token = jwt.sign({
            userID : id},`Secret`,{
            expiresIn : "1h",
        })
    res.cookie("token", token,{httpOnly: true});

    res.json({message : `Logged In`});
        
      
    }catch(error){
        console.log(error);
        return next({
            log : `Erorr 500`,
            status : 500,
            Message : `Error While Login, in login Controller`
        })


    }
}


// messageController.

export {messageController, userController};