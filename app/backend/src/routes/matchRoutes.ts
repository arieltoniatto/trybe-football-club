import { Router } from 'express';
import middlewareToken from '../middlewares/auth/tokenAuth';
import { teamsAuth, validateTeams } from '../middlewares/auth/teamsAuth';
import MatchController from '../controller/matchController';

const router = Router();

const matchController = new MatchController();

router.get('/', matchController.getAll);
router.post('/', middlewareToken, teamsAuth, validateTeams, matchController.saveMatch);
router.patch('/:id/finish', matchController.finishMatch);
router.patch('/:id', matchController.editMatch);

export default router;
