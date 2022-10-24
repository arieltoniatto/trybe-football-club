import Team from '../database/models/TeamModel';
import ITeam from '../Interface/Team/ITeam';

export default class TeamService {
  public allTeams = async (): Promise<ITeam[]> => {
    const response = await Team.findAll();

    return response;
  };
}
