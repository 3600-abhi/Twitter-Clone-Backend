import { StatusCodes } from 'http-status-codes';
import { TweetRepository } from '../repositories/index.js';
import AppError from '../utils/errors/app-errors.js';
import { HashtagService } from '../services/index.js';

const tweetRepository = new TweetRepository();

async function createTweet(data) {
    try {
        const tweet = await tweetRepository.create(data);

        // => output : ObjectId("649e961c30ba5058961b6135")
        // console.log('_id = ', tweet._id); 

        // => output : 649e961c30ba5058961b6135
        //console.log('id = ', tweet.id); 

        // create the hashtag from the Tweet
        await HashtagService.createHashtag(tweet.id, data.content);

        return tweet;
    } catch (error) {
        throw new AppError('Cannot create new Tweet', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getTweet(id) {
    try {
        const tweet = await tweetRepository.get(id);
        return tweet;
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }

        throw new AppError('Cannot fetch Tweet', StatusCodes.NOT_FOUND);
    }
}

async function getAllTweets() {
    try {
        const tweets = await tweetRepository.getAll();
        return tweets;
    } catch (error) {
        throw new AppError('Cannot fetch Tweets', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateTweet(id, data) {
    try {
        const tweet = await tweetRepository.update(id, data);
        return tweet;
    } catch (error) {
        throw new AppError('Cannot update the Tweet', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyTweet(id) {
    try {
        const tweet = await tweetRepository.destory(id);
        return tweet;
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }

        throw new AppError('Cannot delete the Tweet', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export default {
    createTweet,
    getTweet,
    getAllTweets,
    updateTweet,
    destroyTweet
};