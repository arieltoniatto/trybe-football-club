import IMatch from '../Interface/Match/IMatch';
import Match from '../database/models/MatchModel';
import INewMatch from '../Interface/Match/INewMatch';
import IEdit from '../Interface/Match/IEdit';

export default class MatchService {
  public allMatches = async (): Promise<IMatch[]> => {
    const response = await Match.findAll(
      { include: [{ all: true, attributes: ['teamName'] }] },
    );
    return response;
  };

  public inProg = async (query: string): Promise<IMatch[] | null> => {
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

  public finishMatch = async (id: string): Promise<void> => {
    await Match.update(
      { inProgress: false },
      { where: { id: Number(id) } },
    );
  };

  public editMatch = async (id: string, body: IEdit): Promise<void> => {
    await Match.update(
      { homeTeamGoals: body.homeTeamGoals, awayTeamGoals: body.awayTeamGoals },
      { where: { id: Number(id) } },
    );
  };
}
