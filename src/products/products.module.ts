import { forwardRef, Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductDetail } from './entities/product-detail.entity';
import { State } from 'src/states/entities/state.entity';
import { ProductCategory } from '../product-categories/entities/product-category.entity';
import { StatesModule } from 'src/states/states.module';
import { Supply } from 'src/supplies/entities/supply.entity';
import { SuppliesModule } from 'src/supplies/supplies.module';
import { ProductCategoriesModule } from 'src/product-categories/product-categories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductDetail, ProductCategory, State, Supply]),
    forwardRef(() => StatesModule),
    forwardRef(() => SuppliesModule),
    forwardRef(() => ProductCategoriesModule)
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService, TypeOrmModule]
})
export class ProductsModule {}
