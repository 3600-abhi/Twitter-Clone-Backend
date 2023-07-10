import CrudRepository from './crud-repository.js';
import { User } from '../models/index.js';

class UserRepository extends CrudRepository {
    constructor() {
        super(User);
    }

    async getUserByEmail(email) {
        const user = await this.model.findOne({ email });
        return user;
    }

    async getUserWithTweets(userId) {
        const user = await this.model.findOne({ _id: userId }).populate('tweets').exec();
        return user;
    }

    async addTweetToUser(data) {
        const user = await this.model.updateOne({ _id: data.userId }, {
            $push: { tweets: data.tweetId }
        });

        return user;
    }

    async removeTweetFromUser(data) {
        const user = await this.model.updateOne({ _id: data.userId }, {
            $pull: { tweets: data.tweetId }
        });

        return user;
    }
}

export default UserRepository;