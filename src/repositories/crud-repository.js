import { StatusCodes } from 'http-status-codes';
import AppError from '../utils/errors/app-errors.js';

class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        const response = await this.model.create(data);
        return response;
    }

    async get(id) {
        // const response = await this.model.find({_id: id});

        // OR
        const response = await this.model.findById(id);

        if (!response) {
            throw new AppError('No record found', StatusCodes.NOT_FOUND);
        }

        return response;
    }

    async getAll() {
        const response = await this.model.find({});
        return response;
    }

    async update(id, data) { // data is object ----> {........}
        // const response = this.model.updateOne({ _id: id }, { $set: data });

        // OR
        const response = this.model.findByIdAndUpdate(id, data);

        console.log('r = ', response);

        if (!response) {
            throw new AppError('Record not found to update', StatusCodes.NOT_FOUND);
        }

        return response;
    }

    async destory(id) {
        // const response = await this.model.deleteOne({ _id: id });

        // OR
        const response = await this.model.findByIdAndDelete(id);

        if (!response) {
            throw new AppError(
                'Record you are trying to delete is not present',
                StatusCodes.NOT_FOUND
            );
        }

        return response;
    }
}

export default CrudRepository;