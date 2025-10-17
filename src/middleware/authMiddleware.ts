import { Request, Response, NextFunction } from 'express';
import jwt, {JwtPayload} from 'jsonwebtoken';
import {User} from '../models/userModel.js'
import AppError from '../utils/AppError.js';

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload | string;
        }
    }
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        //vérifie si token existant
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).send({message: 'Token manquant!'});
        }

        const token = authHeader.split(" ")[1];

        //vérifie et déchiffre le token
        const decrypt = jwt.verify(token, JWT_SECRET) as JwtPayload;

        //vérifie si user existe dans la BDD
        const user = await User.findById(decrypt.id).select("-password");
        if (!user) {
            return res.status(401).send({message: 'Utilisateur introuvable!'});
        }

        //add le user à la requête pour les prochains middlewares/controllers
        req.user = user;
        next();
    } catch (err) {
        console.error("Erreur JWT", err);
        res.status(403).send({message: 'Token invalide ou expiré!'});
    }
}