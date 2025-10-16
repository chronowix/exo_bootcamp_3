import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/AppError.js';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    //TODO: centraliser les erreurs (msgs, code HTTP, code applicatif)
}