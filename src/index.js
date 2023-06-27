import express from 'express';
import { ServerConfig, DatabaseConfig } from './config/index.js';
import { Tweet } from './models/index.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(ServerConfig.PORT, async function () {
    console.log(`Successfully started server at PORT : ${ServerConfig.PORT}`);
    await DatabaseConfig.connectToMongoDB();

    await Tweet.create({
        content: 'Hey I am Abhishek just testing the tweet setup',
        likes: 151,
        noOfRetweet: 501,
        comment: "Hey i am commenting on ur tweet"
    });

    console.log("Done");
})