import { Model, STRING } from 'sequelize';
import db from '.';

class User extends Model {
  public id: number;
  public username: string;
  public role: string;
  public email: string;
  public password: string;
}

User.init({
  username: STRING,
  role: STRING,
  email: STRING,
  password: STRING,
}, {
  underscored: true,
  sequelize: db,
  modelName: 'User',
  tableName: 'users',
  timestamps: false,
});

export default User;
