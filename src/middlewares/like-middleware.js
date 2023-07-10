import { StatusCodes } from 'http-status-codes';
import { ErrorResponse } from '../utils/common/index.js';
import AppError from '../utils/errors/app-errors.js';

function validateToggleLikeRequest(req, res, next) {
    if (req.query.likeOnId === undefined) {
        ErrorResponse.message = 'Something went wrong';
        ErrorResponse.error = new AppError(
            ['likeOnId property is missing inside request query'],
            StatusCodes.BAD_REQUEST
        );

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    if (req.query.collectionName === undefined) {
        ErrorResponse.message = 'Something went wrong';
        ErrorResponse.error = new AppError(
            ['CollectionName is missing in the incoming request'],
            StatusCodes.BAD_REQUEST
        );

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    if (req.query.collectionName !== 'Tweet' && req.query.collectionName !== 'Comment') {
        ErrorResponse.message = 'Something went wrong';
        ErrorResponse.error = new AppError(
            ['collection name can only be either tweet or comment'],
            StatusCodes.BAD_REQUEST
        );

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    next();
}

export default {
    validateToggleLikeRequest
};
