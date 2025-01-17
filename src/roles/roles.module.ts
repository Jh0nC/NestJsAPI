import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { StatesModule } from 'src/states/states.module';
import { StatesService } from 'src/states/states.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), StatesModule],
  controllers: [RolesController],
  providers: [RolesService, StatesService],
  exports: [],
})
export class RolesModule {}
