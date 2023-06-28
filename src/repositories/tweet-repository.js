import CrudRepository from './crud-repository.js';
import { Tweet } from '../models/index.js';

class TweetRepository extends CrudRepository {
    constructor() {
        super(Tweet);
    }
}

export default TweetRepository;