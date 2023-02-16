import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Sequelize } from 'sequelize-typescript';
import { UserSchema } from '../src/models/user.model';
import * as request from 'supertest';
import { config } from './config/config.development';
import {
  createUserDto1,
  createUserDto2,
  createUserDto3,
  createUserDto4,
  updateUserDto,
} from './data/test-data';
import { AppModule } from '../src/app.module';
import { User } from '../src/interface/userInterface';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let sequelize: Sequelize;
  let userId: 1;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        {
          provide: 'SEQUELIZE',
          useFactory: () => {
            sequelize = new Sequelize(config.database);

            sequelize.addModels([UserSchema]);

            return sequelize;
          },
          inject: [],
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('api');
    await app.init();
  });

  describe('/user', () => {
    describe('POST', () => {
      it('should return 400 if email is not valid', () => {
        return request(app.getHttpServer())
          .post('/api/user')
          .send(createUserDto3)
          .expect(HttpStatus.BAD_REQUEST);
      });

      it('should return 400 if password is not string', () => {
        return request(app.getHttpServer())
          .post('/api/user')
          .send(createUserDto4)
          .expect(HttpStatus.BAD_REQUEST);
      });

      it('should return 400 if any of the required fields is missing', () => {
        return request(app.getHttpServer())
          .post('/api/user')
          .send(createUserDto2)
          .expect(HttpStatus.BAD_REQUEST);
      });

      it('should return 201 if user is created', () => {
        return request(app.getHttpServer())
          .post('/api/user')
          .send(createUserDto1)
          .expect(HttpStatus.CREATED)
          .expect((response: request.Response) => {
            const user: User = response.body;
            const {
              id,
              firstName,
              lastName,
              password,
              email,
              createdAt,
              updatedAt,
            } = response.body;
          });
      });

      it('should return 409 if user with given email already exists', () => {
        return request(app.getHttpServer())
          .post('/api/user')
          .send(createUserDto1)
          .expect(HttpStatus.CONFLICT);
      });
    });
    describe('GET', () => {
      it('should get the data of type User', () => {
        return request(app.getHttpServer())
          .get('/api/user')
          .expect((response: request.Response) => {
            const {
              id,
              firstName,
              lastName,
              password,
              email,
              createdAt,
              updatedAt,
            } = response.body;
          });
      });
    });
    describe('UPDATE', () => {
      it('should update the user form the table', () => {
        return request(app.getHttpServer())
          .put('/api/user/1')
          .send(updateUserDto)
          .expect((response: request.Response) => {
            const {
              id,
              firstName,
              lastName,
              password,
              email,
              createdAt,
              updatedAt,
            } = response.body;
            expect(typeof id).toBe(Number);
            expect(firstName).toEqual(updateUserDto.firstName);
          });
      });
      it('should give not found error if id is not passed in the url', () => {
        return request(app.getHttpServer())
          .put('/api/user/')
          .expect(HttpStatus.NOT_FOUND);
      });
      it('should give 400 bad request error if id is not found in database', () => {
        return request(app.getHttpServer())
          .put('/api/user/567')
          .expect(HttpStatus.BAD_REQUEST);
      });
    });
    describe('DELETE', () => {
      it('should delete the user form the table', () => {
        return request(app.getHttpServer())
          .delete('/api/user/1')
          .expect((res: request.Response) => {
            expect(res.body).toBe([]);
          });
      });
      it('should give not found error if id is not passed in the url', () => {
        return request(app.getHttpServer())
          .delete('/api/user/')
          .expect(HttpStatus.NOT_FOUND);
      });
    });
    afterAll((done) => {
      app.close();
      // sequelize.drop();
      sequelize.close();
      done();
    });
  });
});
