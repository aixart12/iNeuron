import { UserModelService } from '../../service/user-module.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from '../../interface/userInterface';
import { Test } from '@nestjs/testing';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  let userModelService: UserModelService;

  beforeEach(() => {
    userService = new UserService(userModelService);
    userController = new UserController(userService);
  });

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
    userController = moduleRef.get<UserController>(UserController);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result = ['test'];
      jest.spyOn(userService, 'getAll').mockImplementation();

      expect(await userController.getAllUser()).toBe(result);
    });
  });
});
