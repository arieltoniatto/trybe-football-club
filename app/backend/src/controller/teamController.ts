import { Request, Response } from 'express';
import TeamService from '../services/teamService';

export default class TeamController {
  constructor(private teamService = new TeamService()) {}

  public getAll = async (_req: Request, res: Response) => {
    try {
      const response = await this.teamService.allTeams();
      return res.status(200).json(response);
    } catch (err) {
      return res.send(err);
    }
  };
}
