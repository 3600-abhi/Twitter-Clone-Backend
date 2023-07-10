import { StatusCodes } from 'http-status-codes';
import { UserRepository } from '../repositories/index.js';
import AppError from '../utils/errors/app-errors.js';
import { Auth } from '../utils/common/index.js';

const userRepository = new UserRepository();

async function signup(data) {
    try {
        let user = await userRepository.getUserByEmail(data.email);

        if (user) {
            throw new AppError('Email is already in used try another Email', StatusCodes.BAD_REQUEST);
        }

        user = await userRepository.create(data);
        return user;
    } catch (error) {
        if (error instanceof AppError) throw error;

        if (error.name === 'MongoServerError') throw error;

        throw new AppError('Cannot create a new user', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function signin(data) {
    try {
        const user = await userRepository.getUserByEmail(data.email);

        if (!user) {
            throw new AppError('Invalid Email', StatusCodes.BAD_REQUEST);
        }

        const isPasswordMatch = Auth.validatePassword(data.password, user.password);

        if (!isPasswordMatch) {
            throw new AppError('Invalid Password', StatusCodes.BAD_REQUEST);
        }

        // the object which we are passing, we will get when we will
        // verify it using jwt.verify() as response
        const token = Auth.createToken({ userId: user.id });

        return token;
    } catch (error) {
        console.log(error);
        throw new AppError('Cannot Sigin the User');
    }
}

async function authenticateUser(token) {
    try {
        const data = Auth.verifyToken(token);

        const user = await userRepository.get(data.userId);

        if (!user) {
            throw new AppError('User not found', StatusCodes.NOT_FOUND);
        }

        return user.id;
    } catch (error) {
        if (error instanceof AppError) throw error;

        if (error.name === 'JsonWebTokenError') {
            throw new AppError('Invalid JWT Token', StatusCodes.BAD_REQUEST);
        }

        throw new AppError('Cannot Authenticate', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getUser(userId) {
    try {
        const user = await userRepository.getUserWithTweets(userId);
        return user;
    } catch (error) {
        throw new AppError('Cannot get the User', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function addTweetToUser(data) {
    try {
        const user = await userRepository.addTweetToUser(data);
        return user;
    } catch (error) {
        throw new AppError('Cannot add tweet to User', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function removeTweetFromUser(data) {
    try {
        const user = await userRepository.removeTweetFromUser(data);
        return user;
    } catch (error) {
        throw new AppError('Cannot remove tweet from User', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export default {
    signup,
    signin,
    authenticateUser,
    getUser,
    addTweetToUser,
    removeTweetFromUser
};