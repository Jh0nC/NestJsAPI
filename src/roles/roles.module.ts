import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { StatesModule } from 'src/states/states.module';
import { StatesService } from 'src/states/states.service';
import { State } from 'src/states/entities/state.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, State]), StatesModule],
  controllers: [RolesController],
  providers: [RolesService, StatesService]
})
export class RolesModule {}
