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
}

export default UserRepository;