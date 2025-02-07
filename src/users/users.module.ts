import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DocType } from 'src/doc-type/entities/doc-type.entity';
import { Role } from 'src/roles/entities/role.entity';
import { State } from 'src/states/entities/state.entity';
import { DocTypeModule } from 'src/doc-type/doc-type.module';
import { RolesModule } from 'src/roles/roles.module';
import { StatesModule } from 'src/states/states.module';
import { DocTypeService } from 'src/doc-type/doc-type.service';
import { RolesService } from 'src/roles/roles.service';
import { StatesService } from 'src/states/states.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, DocType, Role, State]),
    DocTypeModule,
    RolesModule,
    StatesModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, DocTypeService, RolesService, StatesService],
})
export class UsersModule {}
