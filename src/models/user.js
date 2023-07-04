import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    tweets: [{
        type: Schema.Types.ObjectId,
        ref: 'Tweet'
    }]
});

const User = mongoose.model('User', UserSchema);

export default User;