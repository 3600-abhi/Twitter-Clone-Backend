import { StatusCodes } from 'http-status-codes';
import { HashtagRepository } from '../repositories/index.js';
import AppError from '../utils/errors/app-errors.js';
import extractHashtags from '../utils/helpers/extract-hashtags-helper.js';

const hashtagRepository = new HashtagRepository();

async function createHashtag(tweetId, content) {
    try {
        const hashtags = extractHashtags(content);

        let oldHashtags = await hashtagRepository.getOldHashtags(hashtags);
        oldHashtags = oldHashtags.map(hashtags => hashtags.text);

        let newHashtags = hashtags.filter(hashtag => !oldHashtags.includes(hashtag));
        newHashtags = newHashtags.map(hashtag => {
            return {
                text: hashtag,
                tweets: [tweetId]
            }
        });

        // push the tweetId to the corresponding old-hashtags
        if (oldHashtags.length) {
            await hashtagRepository.updateOldHashtags(tweetId, oldHashtags);
        }

        // create the new-hashtags
        if (newHashtags.length) {
            await hashtagRepository.create(newHashtags);
        }

    } catch (error) {
        throw new AppError('Cannot create Hashtag', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export default {
    createHashtag
};