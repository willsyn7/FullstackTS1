import express from "express";
import {checkDatabaseConnection} from "./models/MessageModel.ts";
import messageController from "./controllers/messageController.ts";
import bodyParser from "body-parser";

const app = express();

const port = 8080;

checkDatabaseConnection();
app.use(bodyParser.json())


app.post("/postMessage", messageController.postMessage!);

app.get("/getMessages" , messageController.getMessages!);
app.delete("/deleteMessage", messageController.deleteMessage!)



app.listen(port, () => {
    console.log(`Server is lisenting on Port : ${port}`)
})