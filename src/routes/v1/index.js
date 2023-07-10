import express from 'express';
import tweetRoutes from './tweet-routes.js';
import userRoutes from './user-routes.js';
import likeRoutes from './like-routes.js';

const router = express.Router();

router.use('/tweets', tweetRoutes);

router.use('/users', userRoutes);

router.use('/likes', likeRoutes);

export default router;