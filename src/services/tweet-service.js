import { StatusCodes } from 'http-status-codes';
import { TweetRepository } from '../repositories/index.js';
import AppError from '../utils/errors/app-errors.js';
import { HashtagService, UserService } from '../services/index.js';

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

        await UserService.addTweetToUser({ userId: data.user, tweetId: tweet.id });

        return tweet;
    } catch (error) {
        throw new AppError('Cannot create new Tweet', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getTweet(data) {
    try {
        const tweet = await tweetRepository.getTweetByData(data);
        return tweet;
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }

        throw new AppError('Cannot fetch Tweet', StatusCodes.NOT_FOUND);
    }
}

async function getAllTweets(userId) {
    try {
        const tweets = await tweetRepository.getAllTweetByData({ user: userId });
        return tweets;
    } catch (error) {
        throw new AppError('Cannot fetch Tweets', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateTweet(data) {
    try {

        const filter = { _id: data.tweetId, user: data.userId };

        // removing the tweetId ans userId keys from object
        const { tweetId, userId, ...dataForUpdate } = data;

        console.log('filter = ', filter);
        console.log('dataForUpdate = ', dataForUpdate);

        const tweet = await tweetRepository.updateTweetByData(filter, dataForUpdate);

        return tweet;
    } catch (error) {
        throw new AppError('Cannot update the Tweet', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyTweet(data) {
    try {
        const tweet = await tweetRepository.destoryTweetByData({
            _id: data.tweetId,
            user: data.userId
        });

        await UserService.removeTweetFromUser({ tweetId: data.tweetId, userId: data.userId })

        return tweet;
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }

        throw new AppError('Cannot delete the Tweet', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function addLike(tweetId, userId) { // add like to tweet
    try {
        const tweet = await tweetRepository.addLikeToTweet({ tweetId, userId });
        return tweet;
    } catch (error) {
        console.log(error);
        throw new AppError('Cannot add like to Tweet', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function removeLike(tweetId, userId) { // to remove like from tweet
    try {
        const tweet = await tweetRepository.removeLikeFromTweet({ tweetId, userId });
        return tweet;
    } catch (error) {
        console.log(error);
        throw new AppError('Cannot add like to Tweet', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export default {
    createTweet,
    getTweet,
    getAllTweets,
    updateTweet,
    destroyTweet,
    addLike,
    removeLike
};