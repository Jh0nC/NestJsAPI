import { forwardRef, Module } from '@nestjs/common';
import { State } from 'src/states/entities/state.entity';
import { Supply } from './entities/supply.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatesModule } from 'src/states/states.module';
import { SuppliesService } from './supplies.service';
import { SuppliesController } from './supplies.controller';
import { BoughtDetail } from 'src/boughts/entities/bought-detail.entity';
import { BoughtsModule } from 'src/boughts/boughts.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Supply, State, BoughtDetail]),
    StatesModule,
    forwardRef(() => BoughtsModule),
  ],
  controllers: [SuppliesController],
  providers: [SuppliesService],
  exports: [SuppliesService, TypeOrmModule],
})
export class SuppliesModule {}
