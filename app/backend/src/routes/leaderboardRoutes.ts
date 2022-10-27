import { Router } from 'express';
import LeaderboardController from '../controller/leaderboardController';

const router = Router();

const leaderboardController = new LeaderboardController();

router.get('/', leaderboardController.getGeneral);
router.get('/home', leaderboardController.getAllHome);
router.get('/away', leaderboardController.getAllAway);

export default router;
