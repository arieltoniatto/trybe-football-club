import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  public getAllHome = async (req: Request, res: Response) => {
    const response = await this.leaderboardService.getLeaderboard();
    return res.status(200).json(response);
  };
}
