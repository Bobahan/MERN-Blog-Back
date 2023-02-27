import { Router } from 'express';

import checkAuth from './middlewares/checkAuth.js';
import UserController from './controllers/UserController.js';
import { registerValidation, loginValidation, postValidation } from './validations.js';
import PostController from './controllers/PostController.js';
import handleError from './middlewares/handleError.js';

const router = new Router();

router.post('/auth/register', registerValidation, handleError, UserController.register);
router.post('/auth/login', loginValidation, handleError, UserController.login);
router.get('/auth/me', checkAuth, UserController.getMe);

router.get('/post', PostController.getAllPosts);
router.get('/post/:id', PostController.getOnePost);
router.post('/post', checkAuth, postValidation, handleError, PostController.createPost);
router.delete('/post/:id', checkAuth, PostController.deletePost);
router.patch('/post/:id', checkAuth, handleError, PostController.editPost);

export default router;
