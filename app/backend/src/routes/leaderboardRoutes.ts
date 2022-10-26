import { Router } from 'express';
import LeaderboardController from '../controller/leaderboardController';

const router = Router();

const leaderboardController = new LeaderboardController();

router.get('/home', leaderboardController.getAllHome);

export default router;
