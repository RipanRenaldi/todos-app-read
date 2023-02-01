import { Router } from "express";
import { getAllTodo, getTodoById } from "../controller/searchController.js";

const router = Router();
router.get("/todos",getAllTodo);
router.get("/todos/:id",getTodoById);


export {router};