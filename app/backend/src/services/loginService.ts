import * as bcryptjs from 'bcryptjs';
import { generateToken, validateToken } from '../middlewares/jwt/token';
import { ILogin, IToken } from '../Interface/User';
import User from '../database/models/UserModel';

export default class LoginService {
  public login = async (login: ILogin): Promise<IToken | null> => {
    const response = await User.findOne({ where: { email: login.email } });
    if (!response) return null;

    const decript = bcryptjs.compareSync(login.password, response.password);
    if (!decript) return null;

    const { email } = response;

    const token = generateToken(email);

    return {
      token,
    };
  };

  public getRole = async (authorization: string): Promise<string | null> => {
    const email = validateToken(authorization);
    const response = await User.findOne({ where: { email } });
    console.log('service', response);
    if (!response) return authorization;
    return response.role;
  };
}
