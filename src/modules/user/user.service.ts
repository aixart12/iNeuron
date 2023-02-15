import { Injectable } from "@nestjs/common";
import { Transaction } from "sequelize";
import { UserModelService } from "src/service/user-module.service";
import { UsersDto } from "./dto/user.dto";


@Injectable()
export class UserService {
  constructor(private readonly userModuleService : UserModelService){}

  create( user : UsersDto , transaction? : Transaction){
    return this.userModuleService.sequelize.transaction(
      {transaction},
      async (transaction) => {
        return this.userModuleService.repository.create(user as any , {transaction})
      }
    )
  }

  getAll(transaction?: Transaction){
    return this.userModuleService.sequelize.transaction(
      {transaction},
      async (transaction) => {
        return this.userModuleService.repository.findAll({transaction})
      }
    )
  }

  updateUser( id : number , transaction?: Transaction){
    return this.userModuleService.sequelize.transaction(
      {transaction},
      async (transaction) => {
        return this.userModuleService.repository.findByPk(id , {transaction})
      }
    )
  }

  deleteUserById(id : number ,transaction?: Transaction){
    return this.userModuleService.sequelize.transaction(
      {transaction},
      async (transaction) => {
        return this.userModuleService.repository.findByPk(id , {rejectOnEmpty : new Error('User not found') , transaction })
        .then(entity =>entity.destroy({transaction}).then(() => true))
      }
    )
  }



}