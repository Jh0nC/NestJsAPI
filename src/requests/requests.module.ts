import { forwardRef, Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from './entities/request.entity';
import { RequestDetail } from './entities/request-detail.entity';
import { State } from 'src/states/entities/state.entity';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';
import { StatesModule } from 'src/states/states.module';
import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Request, RequestDetail, State, User, Product]),
    forwardRef(() => StatesModule),
    forwardRef(() => UsersModule),
    forwardRef(() => ProductsModule),
  ],
  controllers: [RequestsController],
  providers: [RequestsService],
  exports: [RequestsService, TypeOrmModule],
})
export class RequestsModule {}
