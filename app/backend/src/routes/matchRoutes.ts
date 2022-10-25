import { Router } from 'express';
import middlewareToken from '../middlewares/auth/tokenAuth';
import MatchController from '../controller/matchController';

const router = Router();

const matchController = new MatchController();

router.get('/', matchController.getAll);
router.post('/', middlewareToken, matchController.saveMatch);

export default router;
