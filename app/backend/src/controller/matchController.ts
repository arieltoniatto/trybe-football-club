import { Request, Response } from 'express';
import MatchService from '../services/matchService';

export default class MatchController {
  constructor(private matchService = new MatchService()) {}

  public getAll = async (_req: Request, res: Response) => {
    try {
      const response = await this.matchService.allMatches();
      return res.status(200).json(response);
    } catch (err) {
      return res.send(err);
    }
  };
}
