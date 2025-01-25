import { forwardRef, Module } from '@nestjs/common';
import { State } from 'src/states/entities/state.entity';
import { Supply } from './entities/supply.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatesModule } from 'src/states/states.module';
import { SuppliesService } from './supplies.service';
import { SuppliesController } from './supplies.controller';
import { BoughtDetail } from 'src/boughts/entities/bought-detail.entity';
import { BoughtsModule } from 'src/boughts/boughts.module';
import { ProductDetail } from 'src/products/entities/product-detail.entity';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Supply, State, BoughtDetail, ProductDetail]),
    StatesModule,
    forwardRef(() => ProductsModule),
    forwardRef(() => BoughtsModule),
  ],
  controllers: [SuppliesController],
  providers: [SuppliesService],
  exports: [SuppliesService, TypeOrmModule],
})
export class SuppliesModule {}
