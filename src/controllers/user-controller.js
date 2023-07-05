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
        if (error instanceof AppError) throw error;

        ErrorResponse.message = 'Something went wrong while creating User';
        ErrorResponse.error = error; // this error object is (AppError) object

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

export default {
    signup
};