import { Request, Response, NextFunction } from 'express';
import {UserService} from '../services/userService.js';

const service = new UserService();

// GET /users
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    //TODO: appeler userService.gerAllUsers() pour return les users
    try{
        const users = await service.getAllUsers();
        res.status(200).json(users);
    } catch (err){
        res.status(500).json({message: "Erreur dans la récupération des utilisateurs", error: err});
    }
};

//GET /users/:id
export const getUserId = async (req: Request, res: Response, next: NextFunction) => {
    //TODO: appeler userService.getUserId() pour trouver le user par son ID
    try{
        const {id} = req.params; //extract id from route
        const user = await service.getUserId(id);
        //if id not found, 404
        if (!user) {
            return res.status(404).json({message: "Utilisateur introuvable!"});
        }
        const safeUser = user.toObject();
        delete safeUser.password;
        res.status(200).json(user);
    } catch (err){
        res.status(500).json({message: "Erreur dans la récupération de l'utilisateur", error: err});
    }
};

//PUT /users/:id
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    //TODO: appeler userService.updateUser()
    try{
        const {id} = req.params;
        const user = await service.updateUser(id, req.body);
        if (!user) {
            return res.status(404).json({message: "Utilisateur introuvable!"});
        }
        const safeUser = user.toObject();
        delete safeUser.password;
        res.status(200).json({ message: "Utilisateur mis à jour!"});
    } catch (err){
        res.status(500).json({message: "Erreur dans la modification de l'utilisateur", error: err});
    }
}

//DELETE /users/:id
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    //TODO: appeler userService.deleteUser()
    try{
        const {id} = req.params;
        const user = await service.deleteUser(id);
        if (!user) {
            return res.status(404).json({message: "Utilisateur introuvable!"});
        }
        const safeUser = user.toObject();
        delete safeUser.password;
        res.status(200).json({ message: "Utilisateur supprimé avec succès!", user: safeUser });
    } catch (err){
        res.status(500).json({message: "Erreur dans la suppression de l'utilisateur", error: err});
    }
}
