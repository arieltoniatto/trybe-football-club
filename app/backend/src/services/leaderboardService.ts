import IMatch from '../Interface/Match/IMatch';
import Match from '../database/models/MatchModel';
import ILeaderboard from '../Interface/Leaderboard/ILeaderboard';
import generateBoard from '../helpers/leaderboard';

export default class LeaderboardService {
  public getFinishedMatches = async (): Promise<IMatch[]> => {
    const matches = await Match.findAll({
      where: { inProgress: false },
      include: [{ all: true, attributes: ['teamName'] }],
    });
    return matches;
  };

  public getLeaderboard = async (): Promise<ILeaderboard[]> => {
    const matches = await this.getFinishedMatches();
    const allTNames = matches.map(({ teamHome }) => teamHome?.teamName);

    console.log(allTNames);

    const teamsNames = allTNames.filter((v, i) => allTNames.indexOf(v) === i) as string[];

    const board = generateBoard(teamsNames as string[], matches);

    // https://stackoverflow.com/questions/6913512/how-to-sort-an-array-of-objects-by-multiple-fields

    const sortedBoard = board.sort(
      (a, b) => b.totalPoints - a.totalPoints
      || b.goalsBalance - a.goalsBalance || b.goalsFavor - a.goalsFavor || a.goalsOwn - b.goalsOwn,
    );

    return sortedBoard;
  };
}
