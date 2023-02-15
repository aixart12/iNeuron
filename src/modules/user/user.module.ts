import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { UserModelService } from "src/service/user-module.service";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports : [DatabaseModule.forFeature([UserModelService])],
    controllers : [UserController],
    providers : [UserService]
})
export class UserModule{}