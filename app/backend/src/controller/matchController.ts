import { Request, Response } from 'express';
import MatchService from '../services/matchService';

export default class MatchController {
  constructor(private matchService = new MatchService()) {}

  public getAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (inProgress) return this.inProg(req, res);
    try {
      const response = await this.matchService.allMatches();
      return res.status(200).json(response);
    } catch (err) {
      return res.send(err);
    }
  };

  public inProg = async (req: Request, res: Response) => {
    console.log(req.query);
    try {
      const { inProgress } = req.query;
      const response = await this.matchService.inProg(inProgress as string);
      if (!response) return res.status(404).json({ message: 'Not found' });
      return res.status(200).json(response);
    } catch (err) {
      return res.send(err);
    }
  };

  public saveMatch = async (req: Request, res: Response) => {
    const request = req.body;
    const response = await this.matchService.newMatch(request);
    if (!response) return res.status(404).json({ message: 'Not found' });
    return res.status(201).json(response);
  };

  public finishMatch = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this.matchService.finishMatch(id);
      return res.status(200).json({ message: 'Finished' });
    } catch (err) {
      return res.send(err);
    }
  };
}
