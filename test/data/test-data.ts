import { UsersDto } from 'src/modules/user/dto/user.dto';

export const createUserDto1: UsersDto = {
  email: 'testemail@gmail.com',
  password: 'password123',
  firstName: 'John',
  lastName: 'Smith',
};

export const createUserDto2 = {
  email: 'testemail@gmail.com',
  password: 'password123',
  lastName: 'Smith',
};

export const createUserDto3 = {
  ...createUserDto1,
  email: 'not-email',
};

export const createUserDto4 = {
  ...createUserDto1,
  password: 1234,
};

export const updateUserDto = {
  ...createUserDto1,
  firstName: 'Dhruv',
};
