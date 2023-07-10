import CrudRepository from './crud-repository.js';
import { Like } from '../models/index.js';

class LikeRepository extends CrudRepository {
    constructor() {
        super(Like);
    }

    async getLikeByData(data) {
        const response = await this.model.findOne(data);
        return response;
    }

    async hasUserLiked(data) {
        const count = await this.model.find({
            likeOnId: data.likeOnId,
            collectionName: data.collectionName,
            users: data.userId
        }).count();

        return count ? true : false;
    }

    async addUserToLike(data) {
        const response = await this.model.updateOne(
            {
                likeOnId: data.likeOnId,
                collectionName: data.collectionName
            },
            {
                $push: { users: data.userId }
            }
        );

        return response;
    }

    async removeUserToLike(data) {
        const response = await this.model.updateOne(
            {
                likeOnId: data.likeOnId,
                collectionName: data.collectionName
            },
            {
                $pull: { users: data.userId }
            }
        );

        return response;
    }

    async destroyLikeWithNoUser(likeId) {
        const response = await this.model.deleteOne({
            _id: likeId,
            users: { $size: 0 }
        });

        return response;
    }
}

export default LikeRepository;