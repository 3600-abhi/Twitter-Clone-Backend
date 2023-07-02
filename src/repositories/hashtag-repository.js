import CrudRepository from './crud-repository.js';
import { Hashtag } from '../models/index.js';

class HashtagRepository extends CrudRepository {
    constructor() {
        super(Hashtag);
    }

    async getOldHashtags(hashtags) {
        const oldHashtags = await this.model.find({ text: { $in: hashtags } });
        return oldHashtags;
    }

    async updateOldHashtags(tweetId, oldHashtags) {
        await this.model.updateMany(
            { text: { $in: oldHashtags } },
            { $push: { tweets: tweetId } }
        );
    }
}

export default HashtagRepository;