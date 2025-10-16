import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/authService.js';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// POST /auth/register
export const register = async (req: Request, res: Response, next: NextFunction) => {
    //TODO: appeler authService.registerUser() et return le JWT
}

//POST /auth/login
export const login = async (req: Request, res: Response, next: NextFunction) => {
    //TODO: appeler authService.loginUser() et return le JWT
}

// GET /me
export const getMe = async (req: Request, res: Response, next: NextFunction) => {
    //TODO: return le user co
}