import { StatusCodes } from 'http-status-codes';
import { ErrorResponse, SuccessResponse } from '../utils/common/index.js';
import { LikeService } from '../services/index.js';

async function toggleLike(req, res) {
    try {
        const response = await LikeService.toggleLike({
            userId: req.userId,
            collectionName: req.query.collectionName,
            likeOnId: req.query.likeOnId
        });

        SuccessResponse.message = 'Successfully toggled the Like';

        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log(error);
        ErrorResponse.error = error; // this error object is (AppError) object
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

export default {
    toggleLike
};