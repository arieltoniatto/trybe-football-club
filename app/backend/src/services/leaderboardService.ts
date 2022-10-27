import IMatch from '../Interface/Match/IMatch';
import Match from '../database/models/MatchModel';
import ILeaderboard from '../Interface/Leaderboard/ILeaderboard';
import generateBoard, { generateGeneralBoard } from '../helpers/leaderboard';

export default class LeaderboardService {
  public getFinishedMatches = async (): Promise<IMatch[]> => {
    const matches = await Match.findAll({
      where: { inProgress: false },
      include: [{ all: true, attributes: ['teamName'] }],
    });
    return matches;
  };

  public getLeaderboard = async (isHome: boolean): Promise<ILeaderboard[]> => {
    const matches = await this.getFinishedMatches();
    let names: string[] = [];
    if (isHome) {
      names = matches.map(({ teamHome }) => teamHome?.teamName) as string[];
    } else {
      names = matches.map(({ teamAway }) => teamAway?.teamName) as string[];
    }
    const teamsNames = names.filter((v, i) => names.indexOf(v) === i) as string[];

    const board = generateBoard(teamsNames as string[], matches, isHome);

    return board;
  };

  public generalLeaderboard = async (): Promise<ILeaderboard[]> => {
    const home = await this.getLeaderboard(true);
    const away = await this.getLeaderboard(false);
    const board = generateGeneralBoard(home, away);
    return board;
  };
}
