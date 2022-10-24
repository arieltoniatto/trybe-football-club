import { Router } from 'express';
import authLogin from '../middlewares/auth/loginAuth';
import LoginController from '../controller/loginController';

const router = Router();

const loginController = new LoginController();

router.post('/', authLogin, loginController.login);
router.get('/validate', loginController.validate);

export default router;
