import mongoose from 'mongoose';

const { Schema } = mongoose;

// we are using dynamic referencing using mongoose (refPath)
// so that LikeSchema can handle both like on tweets and comments
const LikeSchema = new Schema({
    likeOnId: { // objectId of document which has been liked which can be either tweet or comment
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'collectionsName' // name of collection which has been liked
    },
    collectionName: { // here we provide the collection name that a like could be on either tweet or comment
        type: String,
        required: true,
        enum: ['Tweet', 'Comment']
    },
    users: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }]
});

const Like = mongoose.model('Like', LikeSchema);

export default Like;