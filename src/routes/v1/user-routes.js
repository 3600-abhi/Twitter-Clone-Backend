import express from 'express';
import { UserMiddleware } from '../../middlewares/index.js';
import { UserController } from '../../controllers/index.js';

const router = express.Router();

/** 
 * POST: api/v1/users
*/
router.post(
    '/signup',
    UserMiddleware.validateSignupRequest,
    UserController.signup
);

/** 
 * POST: api/v1/users
*/
router.post(
    '/signin',
    UserMiddleware.validateSigninRequest,
    UserController.signin
);


/** 
 * GET: api/v1/users
 * To see its profile signin is required
*/
router.get(
    '/',
    UserMiddleware.authenticateUser,
    UserController.getUser
);

export default router;