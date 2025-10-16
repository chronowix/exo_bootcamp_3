import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/userService.js';

// GET /users
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    //TODO: appeler userService.gerAllUsers() pour return les users
}

//GET /users/:id
export const getUserId = async (req: Request, res: Response, next: NextFunction) => {
    //TODO: appeler userService.getUserId() pour trouver le user par son ID
}

//PUT /users/:id
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    //TODO: appeler userService.updateUser()
}

//DELETE /users/:id
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    //TODO: appeler userService.deleteUser()
}
