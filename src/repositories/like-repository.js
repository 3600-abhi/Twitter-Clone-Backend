import CrudRepository from './crud-repository.js';
import { Like } from '../models/index.js';

class LikeRepository extends CrudRepository {
    constructor() {
        super(Like);
    }
}

export default LikeRepository;