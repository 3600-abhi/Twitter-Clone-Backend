import express from 'express';
import { LikeMiddleware, UserMiddleware, TokenMiddleware } from '../../middlewares/index.js';
import { LikeController } from '../../controllers/index.js';

const router = express.Router();

router.use([
    LikeMiddleware.validateToggleLikeRequest,
    TokenMiddleware.isTokenPresent,
    UserMiddleware.authenticateUser
]);

router.get(
    '/',
    LikeController.toggleLike
);

export default router;