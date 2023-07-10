import CrudRepository from "./crud-repository.js";
import { Comment } from '../models/index.js';

class CommentRepository extends CrudRepository {
    constructor() {
        super(Comment);
    }

    async getByData(data) {
        const comment = await this.model.findOne(data);
        return comment;
    }
}

export default CommentRepository;