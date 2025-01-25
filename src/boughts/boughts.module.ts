import { forwardRef, Module } from '@nestjs/common';
import { BoughtsService } from './boughts.service';
import { BoughtsController } from './boughts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bought } from './entities/bought.entity';
import { BoughtDetail } from './entities/bought-detail.entity';
import { User } from 'src/users/entities/user.entity';
import { Supply } from 'src/supplies/entities/supply.entity';
import { UsersModule } from 'src/users/users.module';
import { SuppliesModule } from 'src/supplies/supplies.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bought, BoughtDetail, User, Supply]),
    forwardRef(() => UsersModule),
    forwardRef(() => SuppliesModule),
  ],
  controllers: [BoughtsController],
  providers: [BoughtsService],
  exports: [BoughtsService, TypeOrmModule],
})
export class BoughtsModule {}
