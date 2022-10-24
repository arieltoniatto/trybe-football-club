import IMatch from '../Interface/Match/IMatch';
import Match from '../database/models/MatchModel';

export default class MatchService {
  public allMatches = async (): Promise<IMatch[]> => {
    const response = await Match.findAll(
      { include: [{ all: true, attributes: ['teamName'] }] },
    );

    return response;
  };
}
