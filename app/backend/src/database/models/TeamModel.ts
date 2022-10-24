import { Model, STRING } from 'sequelize';
import db from '.';

class Team extends Model {
  public id: number;
  public teamName: string;
}

Team.init({
  teamName: STRING,
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  tableName: 'teams',
  timestamps: false,
});

export default Team;
