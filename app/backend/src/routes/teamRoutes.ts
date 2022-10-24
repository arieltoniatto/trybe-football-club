import { Router } from 'express';
import TeamController from '../controller/teamController';

const router = Router();

const teamController = new TeamController();

router.get('/', teamController.getAll);
router.get('/:id', teamController.findByPK);

export default router;
