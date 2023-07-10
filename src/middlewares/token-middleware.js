import { StatusCodes } from 'http-status-codes';
import { ErrorResponse } from '../utils/common/index.js';
import AppError from '../utils/errors/app-errors.js';

function isTokenPresent(req, res, next) {
    if (req.headers['x-access-token'] === undefined) {
        ErrorResponse.message = 'Something went wrong';
        ErrorResponse.error = new AppError(
            ['token is missing in the headers of incoming request'],
            StatusCodes.BAD_REQUEST
        );

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    next();
}

export default {
    isTokenPresent
};