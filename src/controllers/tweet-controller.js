import { StatusCodes } from 'http-status-codes';
import { TweetService } from '../services/index.js';
import { ErrorResponse, SuccessResponse } from '../utils/common/index.js';
import AppError from '../utils/errors/app-errors.js';

async function createTweet(req, res) {
    try {
        const tweet = await TweetService.createTweet({ ...req.body, user: req.userId });

        SuccessResponse.message = 'Successfully created a new Tweet';
        SuccessResponse.data = tweet;

        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error; // this error object is (AppError) object

        if (error instanceof AppError) {
            return res.status(error.statusCode).json(ErrorResponse);
        }

        return res.json(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function getTweet(req, res) {
    try {
        const tweet = await TweetService.getTweet({
            _id: req.params.id,
            user: req.userId
        });

        SuccessResponse.message = 'Successfully fetch the Tweet';
        SuccessResponse.data = tweet;

        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error; // this error object is (AppError) object

        if (error instanceof AppError) {
            return res.status(error.statusCode).json(ErrorResponse);
        }

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function getAllTweets(req, res) {
    try {
        const tweets = await TweetService.getAllTweets(req.userId);

        SuccessResponse.message = 'Successfully fetched the Tweets';
        SuccessResponse.data = tweets;

        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error; // this error object is (AppError) object

        if (error instanceof AppError) {
            return res.status(error.statusCode).json(ErrorResponse);
        }

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function updateTweet(req, res) {
    try {
        const tweet = await TweetService.updateTweet({
            ...req.body,
            tweetId: req.params.id,
            user: req.userId
        });

        SuccessResponse.message = 'Successfully updated the Tweet';

        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error; // this error object is (AppError) object

        if (error instanceof AppError) {
            return res.status(error.statusCode).json(ErrorResponse);
        }

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function destroyTweet(req, res) {
    try {
        const tweet = await TweetService.destroyTweet({
            tweetId: req.params.id,
            userId: req.userId
        });

        SuccessResponse.message = 'Successfully deleted the Tweet'

        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error; // this error object is (AppError) object

        if (error instanceof AppError) {
            return res.status(error.statusCode).json(ErrorResponse);
        }

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

export default {
    createTweet,
    getTweet,
    getAllTweets,
    updateTweet,
    destroyTweet
};