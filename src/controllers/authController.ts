import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {User} from '../models/userModel.js';
import {AuthService} from "../services/authService.js";

const authService = new AuthService();

// POST /auth/register
//appele authService.registerUser() et return le JWT
export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {name, email, password} = req.body;
        const user = await authService.register(name, email, password); //TODO: create register function in authService
        const { password: _, ...userWoutPwd } = user.toObject(); //retire le champ password avec le mdp hashé
        res.status(201).json({ message: 'Utilisateur enregistré avec succès!', user });
    } catch (err: any) {
        res.status(400).json({ message: err.message }); //400 means Bad Request
    }
};

//POST /auth/login
//appele authService.loginUser() et return le JWT
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, password} = req.body;
        const token = await authService.login(email, password); //TODO: create login function in authService
        res.status(200).json({ message: "Utilisateur connecté avec succès!", token});
    } catch (err: any) {
        res.status(401).json({ message: err.message }); //401 means Unauthorized
    }
};

// GET /me
//return le user connecté
export const getMe = async (req: Request, res: Response, next: NextFunction) => {
    try{
        if (!req.user) {
            return res.status(401).json({ message: "Non autorisé!"});
        }
        res.status(200).json({message: "Utilisateur connecté récupéré avec succès!", user: req.user,});
    } catch (err: any) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};