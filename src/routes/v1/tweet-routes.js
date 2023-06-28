import express from 'express';
import { TweetController } from '../../controllers/index.js';

const router = express.Router();

/** 
 * POST: /api/v1/tweets
*/
router.post(
    '/',
    TweetController.createTweet
);


/**
 * GET: /api/v1/tweets/:id
 */
router.get(
    '/:id',
    TweetController.getTweet
);


/** 
 * GET: /api/v1/tweets
*/
router.get(
    '/',
    TweetController.getAllTweets
);


/** 
 * PATCH: /api/v1/tweets/:id
*/
router.patch(
    '/:id',
    TweetController.updateTweet
);


/** 
 * DELETE: /api/v1/tweets/:id
*/
router.delete(
    '/:id',
    TweetController.destroyTweet
);


export default router;