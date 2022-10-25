import IMatch from '../Interface/Match/IMatch';
import Match from '../database/models/MatchModel';

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
}
