import CrudRepository from './crud-repository.js';
import { Tweet } from '../models/index.js';

class TweetRepository extends CrudRepository {
    constructor() {
        super(Tweet);
    }

    async getTweetByData(data) {
        const tweet = await this.model.findOne(data);
        return tweet;
    }

    async getAllTweetByData(data) {
        const tweets = await this.model.find(data);
        return tweets;
    }

    async updateTweetByData(filter, dataForUpdate) {
        const tweet = await this.model.updateOne(filter, dataForUpdate);
        return tweet;
    }

    async destoryTweetByData(filter) {
        const tweet = await this.model.deleteOne(filter);
        return tweet;
    }

    async addLikeToTweet(data) {
        const tweet = await this.model.updateOne({ _id: data.tweetId }, {
            $push: { likes: data.userId }
        });

        return tweet;
    }

    async removeLikeFromTweet(data) {
        const tweet = await this.model.updateOne({ _id: data.tweetId }, {
            $pull: { likes: data.userId }
        });

        return tweet;
    }
}

export default TweetRepository;