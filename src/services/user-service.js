import { StatusCodes } from 'http-status-codes';
import { UserRepository } from '../repositories/index.js';
import AppError from '../utils/errors/app-errors.js';

const userRepository = new UserRepository();

async function signup(data) {
    try {
        const user = await userRepository.create(data);
        return user;
    } catch (error) {
        if (error.name === 'MongoServerError') throw error;

        throw new AppError('Cannot create a new user', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export default {
    signup
};