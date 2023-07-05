import express from 'express';
import tweetRoutes from './tweet-routes.js';
import userRoutes from './user-routes.js';

const router = express.Router();

router.use('/tweets', tweetRoutes);

router.use('/users', userRoutes);

export default router;