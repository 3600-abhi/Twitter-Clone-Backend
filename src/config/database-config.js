import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

async function connectToMongoDB() {
    await mongoose.connect(MONGODB_URI);
    console.log('Successfully connected with MongoDB');
}

export default {
    connectToMongoDB
}