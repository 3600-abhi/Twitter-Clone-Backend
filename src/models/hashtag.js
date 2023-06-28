import mongoose from 'mongoose';

const { Schema } = mongoose;

const HashtagSchema = new Schema({
    text: {
        type: String,
        unique: true
    },
    tweets: [
        {
            type: Schema.Types.ObjectId
        }
    ],
    
});

const Hashtag = mongoose.model('Hashtag', HashtagSchema);

export default Hashtag;