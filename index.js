import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { router } from "./router/router.js";
import amqp from "amqplib";
import { Todo } from "./model/SearchTodo.js";
import cors from "cors";
dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json("application/json"));
app.use(cors("http://localhost:3000"));


const consume = async()=>{
    const connect = await amqp.connect("amqp://localhost");
    const channel = await connect.createChannel();
    await channel.assertExchange("logExchange", "direct");
    const q= await channel.assertQueue("readQueue");
    channel.consume(q.queue,async message=>{
        const data = JSON.parse(message.content);
        console.log(data);
        const {id, name, description, date}=data.message;
        const {logType} = data;
        if(logType == "create"){
            await Todo.create({name, description, date})
        }else if(logType == "update"){
            await Todo.update({name, description, date}, {where : {id}});
        }else if(logType == "delete"){
            await Todo.destroy({where : {id}});
        }
        channel.ack(message);
    })
}
consume();


app.use(router)


app.listen(Number(process.env.DB_PORT),()=>{
    console.log(`Server Running on PORT ${process.env.DB_PORT}`);
});