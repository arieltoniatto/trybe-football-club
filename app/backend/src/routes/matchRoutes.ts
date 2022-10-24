import { Router } from 'express';
import MatchController from '../controller/matchController';

const router = Router();

const matchController = new MatchController();

router.get('/', matchController.getAll);

export default router;
