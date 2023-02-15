import {
    AutoIncrement,
    Column,
    DataType,
    Default,
    Model,
    PrimaryKey,
    Sequelize,
    Table,
  } from 'sequelize-typescript';
import { POSTGRES_CURRENT_TIMESTAMP } from 'src/constants/databaseConstants';
import { DATABASE_TABLES } from 'src/constants/tableConstants';
import { User } from 'src/interface/userInterface';
 
  @Table({
    tableName: DATABASE_TABLES.USERS,
    modelName: DATABASE_TABLES.USERS,
    paranoid: true,
  })
  export class UserSchema extends Model<User> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;
  
    @Column
    firstName: string;
  
    @Column
    lastName: string;
  
    @Column
    email: string;
  
    @Column
    password: string;
    
    @Default(Sequelize.literal(POSTGRES_CURRENT_TIMESTAMP))
    @Column({ type: DataType.DATE })
    createdAt: string;
  
    @Default(Sequelize.literal(POSTGRES_CURRENT_TIMESTAMP))
    @Column({ type: DataType.DATE })
    updatedAt: string;
  }