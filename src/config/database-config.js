import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

async function connectToMongoDB() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Successfully connected with MongoDB');
    } catch (error) {
        console.log(error);
    }
}

export default {
    connectToMongoDB
}