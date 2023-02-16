import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize';
import { UserModelService } from '../../service/user-module.service';
import { UsersDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userModuleService: UserModelService) {}

  create(user: UsersDto, transaction?: Transaction) {
    return this.userModuleService.sequelize.transaction(
      { transaction },
      async (transaction) => {
        return this.userModuleService.repository.create(user as any, {
          transaction,
        });
      },
    );
  }

  getAll(transaction?: Transaction) {
    return this.userModuleService.sequelize.transaction(
      { transaction },
      async (transaction) => {
        return this.userModuleService.repository.findAll({
          transaction,
        });
      },
    );
  }

  updateUser(id: number, updateUser: UsersDto, transaction?: Transaction) {
    return this.userModuleService.sequelize.transaction(
      { transaction },
      async (transaction) => {
        // const user = await this.userModuleService.repository.findByPk(id);
        // if (!user) {
        //   throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
        // }

        return this.userModuleService.repository
          .findByPk(id, {
            rejectOnEmpty: new Error('No Use Found'),
            transaction,
          })
          .then((savedEntity) =>
            savedEntity.update(updateUser, { transaction }),
          );
      },
    );
  }

  deleteUserById(id: number, transaction?: Transaction) {
    return this.userModuleService.sequelize.transaction(
      { transaction },
      async (transaction) => {
        const user = await this.userModuleService.repository.findByPk(id, {
          transaction,
        });
        if (!user) {
          return new Error('No User Found');
        }
        return user.destroy();
      },
    );
  }
}
