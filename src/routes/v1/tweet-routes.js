import express from 'express';
import { TweetMiddleware, UserMiddleware, TokenMiddleware } from '../../middlewares/index.js';
import { TweetController } from '../../controllers/index.js';


const router = express.Router();

router.use([
    TokenMiddleware.isTokenPresent,
    UserMiddleware.authenticateUser
]);


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
    TweetMiddleware.validateUpdateTweetRequest,
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