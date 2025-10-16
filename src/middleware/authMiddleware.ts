import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js'
import AppError from '../utils/AppError.js';

//TODO: middleware protect pour vérif le JWT