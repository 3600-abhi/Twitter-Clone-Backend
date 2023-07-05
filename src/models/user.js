import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { ServerConfig } from '../config/index.js';

const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
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


UserSchema.pre('save', function (next) {
    const saltRounds = parseInt(ServerConfig.SALT_ROUNDS);

    const encryptedPassword = bcrypt.hashSync(this.password, saltRounds);

    this.password = encryptedPassword;

    next();
});

const User = mongoose.model('User', UserSchema);

export default User;