import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { HttpErrors } from '@loopback/rest';
import { Credentials, User } from '../models';
import { UserRepository } from '../repositories';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';

@injectable({scope: BindingScope.TRANSIENT})
export class UserService {
  constructor(
    @repository(UserRepository) public userRepository : UserRepository,
  ) {}

  public async signin(user: User): Promise<User>{

    if ( await this.userRepository.findOne({where: {or: [{username: user.username}, {email: user.email}]}}) ){
      this.userError(400, 'Bad Request', 'That username or email already exists');
    }

    const passwordEncrypted = CryptoJS.MD5(user.password).toString();
    user.password = passwordEncrypted;
    const userCreated = await this.userRepository.create(user);
    return userCreated;  
  }

  public async login(creds: Credentials): Promise<object> {
    const password = CryptoJS.MD5(creds.password!).toString();
    const user = await this.userRepository.findOne({where: {username: creds.username, password: password}});
    if(!user){ 
      this.userError(404, 'Not Found', 'Invalid username or password');
    }
    const token = await this.generateToken(user!);

    return {
      user: user?.username,
      token: token
    }
  }


  private async generateToken(user: User) {

    const secretKey = process.env.TOKEN_KEY;
    const tk = jwt.sign({
      data: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    }, secretKey!, {expiresIn: process.env.TOKEN_EXPIRED});
    return tk;
  }


  private userError(errorCode: number, code: string, message: string) {
    const error = new HttpErrors[errorCode]();
    //Temporalmente se establece asi, ya que el code del 404 es este mismo
    error.code = code;
    error.message = message;
    throw error;
  }
}
