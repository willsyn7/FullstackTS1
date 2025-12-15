import express from "express";
import {checkDatabaseConnection} from "./models/MessageModel.ts";
import {messageController,userController} from "./controllers/messageController.ts";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import authController from "./controllers/authController.ts";

const app = express();

app.use(cookieParser());

const port = 8080;

checkDatabaseConnection();
app.use(bodyParser.json());


app.post("/login", authController.login)





app.post("/postMessage", messageController.postMessage!);

app.get("/getMessages" , messageController.getMessages!);
app.delete("/deleteMessage", messageController.deleteMessage!)



app.listen(port, () => {
    console.log(`Server is lisenting on Port : ${port}`)
})