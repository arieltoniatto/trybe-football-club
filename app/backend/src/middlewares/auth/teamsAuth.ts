import { Request, Response, NextFunction } from 'express';
import Team from '../../database/models/TeamModel';

export async function teamsAuth(req: Request, res: Response, next: NextFunction) {
  const { homeTeam, awayTeam } = req.body;
  if (homeTeam === awayTeam) {
    return res.status(422)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }
  next();
}

export async function validateTeams(req: Request, res: Response, next: NextFunction) {
  const { homeTeam, awayTeam } = req.body;

  const isHomeValid = await Team.findByPk(homeTeam);

  const isAwayValid = await Team.findByPk(awayTeam);

  if (!isHomeValid || !isAwayValid) {
    return res.status(404)
      .json({ message: 'There is no team with such id!' });
  }
  next();
}
