import { Injectable } from '@nestjs/common';
import { Model, Repository, Sequelize } from 'sequelize-typescript';
import { UserSchema } from '../models/user.model';

@Injectable()
export class UserModelService {
  repository: Repository<UserSchema>;

  constructor(public readonly sequelize: Sequelize) {
    this.repository = sequelize.getRepository(UserSchema);
  }
}
