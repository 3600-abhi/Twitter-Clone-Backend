import mongoose from 'mongoose';

const { Schema } = mongoose;

const CommentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    commentOn: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'collectionsName' // name of collection on which comment has been
    },
    collectionsName: {
        type: Schema.Types.ObjectId,
        required: true,
        enum: ['Tweet', 'Comment']
    }
});


const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;