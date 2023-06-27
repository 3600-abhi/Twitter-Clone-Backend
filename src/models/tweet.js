import mongoose from 'mongoose';

const { Schema } = mongoose;

const TweetSchema = new Schema({
    content: {
        type: String
    },
    likes: {
        type: Number
    },
    noOfRetweet: {
        type: Number
    },
    comment: {
        type: String
    }
});

const Tweet = mongoose.model('Tweet', TweetSchema);

export default Tweet;