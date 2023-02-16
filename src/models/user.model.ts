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
import { DATABASE_TABLES } from '../constants/tableConstants';
import { User } from '../interface/userInterface';
import { POSTGRES_CURRENT_TIMESTAMP } from '../constants/databaseConstants';

@Table({
  tableName: DATABASE_TABLES.USERS,
  modelName: DATABASE_TABLES.USERS,
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
