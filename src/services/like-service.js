import { StatusCodes } from 'http-status-codes';
import AppError from '../utils/errors/app-errors.js';
import { LikeRepository } from '../repositories/index.js';
import { TweetService, CommentService } from '../services/index.js';
import capitalize from '../utils/helpers/capitalize-helper.js';

const likeRepository = new LikeRepository();

async function toggleLike(data) {
    try {
        data.collectionName = capitalize(data.collectionName);

        const targetService = data.collectionName === 'Tweet' ? TweetService : CommentService;

        let response = await likeRepository.getLikeByData({
            likeOnId: data.likeOnId,
            collectionName: data.collectionName
        });

        if (!response) {
            response = await likeRepository.create({
                likeOnId: data.likeOnId,
                collectionName: data.collectionName,
                users: [data.userId]
            });

            await targetService.addLike(data.likeOnId, data.userId);
        }
        else {
            const isAlreadyLiked = await likeRepository.hasUserLiked(data);

            const likeId = response.id;
            
            if (isAlreadyLiked) {
                response = await likeRepository.removeUserToLike(data);
                await targetService.removeLike(data.likeOnId, data.userId);

                // delete Like-document if length of users element is zero
                await likeRepository.destroyLikeWithNoUser(likeId);

            }
            else {
                response = await likeRepository.addUserToLike(data);
                await targetService.addLike(data.likeOnId, data.userId);
            }
        }

        return response;
    } catch (error) {
        console.log(error);
        throw new AppError('Cannot toggle the Like', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export default {
    toggleLike
};