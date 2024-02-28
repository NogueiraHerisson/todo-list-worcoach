import { Request, Response } from "express"
import TodoModel, { ITodo } from "../models/Todo"

export const getAllTodos = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const todos = await TodoModel.find()
    res.status(200).json(todos)
  } catch (error) {
    console.error(error)
    res.status(500).send("internal server error")
  }
}

export const getTodoById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params

  try {
    const todo = await TodoModel.findById(id)
    if (todo) {
      res.status(200).json(todo)
    } else {
      res.status(404).send("todo not found")
    }
  } catch (error) {
    console.error(error)
    res.status(500).send("internal server error")
  }
}

export const createTodo = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { title, description } = req.body

  try {
    const newTodo = new TodoModel({ title, description })
    const savedTodo = await newTodo.save()
    res.status(201).json(savedTodo)
  } catch (error) {
    console.error(error)
    res.status(500).send("internal server error")
  }
}

export const updateTodo = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params
  const { title, description, completed } = req.body

  try {
    const updatedTodo = await TodoModel.findByIdAndUpdate(
      id,
      { title, description, completed },
      { new: true },
    )
    if (updatedTodo) {
      res.status(200).json(updatedTodo)
    } else {
      res.status(404).send("todo not found")
    }
  } catch (error) {
    console.error(error)
    res.status(500).send("internal server error")
  }
}

export const deleteTodo = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params

  try {
    const deletedTodo = await TodoModel.findByIdAndDelete(id)
    if (deletedTodo) {
      res.status(200).json(deletedTodo)
    } else {
      res.status(404).send("todo not found")
    }
  } catch (error) {
    console.error(error)
    res.status(500).send("internal server error")
  }
}
