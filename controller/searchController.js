import { Todo } from "../model/SearchTodo.js";
export const getAllTodo = async(req,res)=>{
    try{
        const todos = await Todo.findAll();
        
        res.status(201).json({message : "Data Berhasil Didapatkan", todos});
    }catch(e){
        res.status(400).json({message : "Gagal Mendapatkan Data"});
    }
}

export const getTodoById= async(req,res)=>{
    try{
        const {id} = req.params;
        const todo = await Todo.findOne({where : {id}});
        todo? res.status(201).json({message : "Data Ditemukan", todo}) : res.status(401).json({message : "Data Tidak Ditemukan"});
    }catch(e){
        res.status(400).json({message : "Gagal Mendapatkan Data"});
    }
}

