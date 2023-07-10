import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import AppError from '../errors/app-errors.js';
import { ServerConfig } from '../../config/index.js';


function validatePassword(plainPassword, encryptedPassword) {
    try {
        return bcrypt.compareSync(plainPassword, encryptedPassword);
    } catch (error) {
        throw new AppError('Cannot validate the Password', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

function createToken(data) {
    try {
        // when we will verify the generated token using jwt.verify() fn
        // we will get this data object as response
        return jwt.sign(data, ServerConfig.JWT_SECRET, { expiresIn: ServerConfig.JWT_EXPIRY });
    } catch (error) {
        throw new AppError('Cannot create the Token', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

function verifyToken(token) {
    try {
        // jwt.verify() fn return the object with which it was signed if verified
        // {id: 'xxxxx', email: 'xyz@gmail.com', iat: 55654, expire: 45665}
        return jwt.verify(token, ServerConfig.JWT_SECRET);
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new AppError('JWT token  expired', StatusCodes.BAD_REQUEST);
        }

        throw new AppError('Cannot verify the Token', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export default {
    validatePassword,
    createToken,
    verifyToken
};