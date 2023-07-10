import { StatusCodes } from 'http-status-codes';
import { ErrorResponse, SuccessResponse } from '../utils/common/index.js';
import AppError from '../utils/errors/app-errors.js';
import { UserService } from '../services/index.js';

async function signup(req, res) {
    try {
        const user = await UserService.signup(req.body);

        SuccessResponse.message = 'Successfully created a new User';
        SuccessResponse.data = user;

        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message = 'Something went wrong while creating User';
        ErrorResponse.error = error; // this error object is (AppError) object

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function signin(req, res) {
    try {
        const token = await UserService.signin(req.body);

        SuccessResponse.message = 'Successfully Signedin the User';
        SuccessResponse.data = { token };

        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error; // this error object is (AppError) object
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function getUser(req, res) {
    try {
        const user = await UserService.getUser(req.userId);

        SuccessResponse.message = 'Successfully fetched the User';
        SuccessResponse.data = user;

        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error; // this error object is (AppError) object
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

export default {
    signup,
    signin,
    getUser
};