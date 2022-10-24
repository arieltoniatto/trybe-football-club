import Team from '../database/models/TeamModel';
import ITeam from '../Interface/Team/ITeam';

export default class TeamService {
  public allTeams = async (): Promise<ITeam[]> => {
    const response = await Team.findAll();

    return response;
  };

  public findById = async (id: string): Promise<ITeam | null> => {
    const response = await Team.findByPk(Number(id));
    if (!response) return null;

    return response;
  };
}
