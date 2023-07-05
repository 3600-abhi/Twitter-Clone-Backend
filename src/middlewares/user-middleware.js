import { StatusCodes } from 'http-status-codes';
import AppError from '../utils/errors/app-errors.js';
import { ErrorResponse } from '../utils/common/index.js';

function validateSignupRequest(req, res, next) {
    if (req.body.name === undefined) {
        ErrorResponse.message = 'Something went wrong';
        ErrorResponse.error = new AppError(
            ['Name is missing in the incoming request'],
            StatusCodes.BAD_REQUEST
        );

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    if (req.body.email === undefined) {
        ErrorResponse.message = 'Something went wrong';
        ErrorResponse.error = new AppError(
            ['Email is missing in the incoming request'],
            StatusCodes.BAD_REQUEST
        );

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    if (req.body.password === undefined) {
        ErrorResponse.message = 'Something went wrong';
        ErrorResponse.error = new AppError(
            ['Password is missing in the incoming request'],
            StatusCodes.BAD_REQUEST
        );

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    next();
}

export default {
    validateSignupRequest
};