import IMatch from '../Interface/Match/IMatch';
import Match from '../database/models/MatchModel';
import INewMatch from '../Interface/Match/INewMatch';

export default class MatchService {
  public allMatches = async (): Promise<IMatch[]> => {
    const response = await Match.findAll(
      { include: [{ all: true, attributes: ['teamName'] }] },
    );
    return response;
  };

  public inProgress = async (query: string): Promise<IMatch[] | null> => {
    let isInProgress;
    if (query === 'true') isInProgress = true;
    if (query === 'false') isInProgress = false;

    const result = await Match.findAll({
      where: {
        inProgress: isInProgress,
      },
      include: [{ all: true, attributes: ['teamName'] }],
    });

    if (!result) return null;

    return result;
  };

  public newMatch = async (body: INewMatch): Promise<IMatch | null> => {
    const create = await Match.create({
      homeTeam: body.homeTeam,
      homeTeamGoals: body.homeTeamGoals,
      awayTeam: body.awayTeam,
      awayTeamGoals: body.awayTeamGoals,
      inProgress: true,
    });
    if (!create) return null;

    return create;
  };
}
