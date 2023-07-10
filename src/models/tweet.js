import mongoose from 'mongoose';

const { Schema } = mongoose;

const TweetSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    likes: [{
        type: Schema.Types.ObjectId,
        default: [],
        ref: 'Like'
    }],
    noOfRetweet: {
        type: Number,
        default: 0
    },
    comment: [{
        type: Schema.Types.ObjectId,
        default: [],
        ref: 'Comment'
    }],
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

const Tweet = mongoose.model('Tweet', TweetSchema);

export default Tweet;