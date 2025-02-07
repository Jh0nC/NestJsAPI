import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { DocTypeModule } from './doc-type/doc-type.module';
import { StatesModule } from './states/states.module';
import { SuppliesModule } from './supplies/supplies.module';
import { BoughtsModule } from './boughts/boughts.module';
import { ProductsModule } from './products/products.module';
import { ProductionOrdersModule } from './production-orders/production-orders.module';
import { SalesModule } from './sales/sales.module';
import { RequestsModule } from './requests/requests.module';
import { AuthModule } from './auth/auth.module';
import { ProductCategoriesModule } from './product-categories/product-categories.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    RolesModule,
    UsersModule,
    DocTypeModule,
    StatesModule,
    SuppliesModule,
    BoughtsModule,
    ProductsModule,
    ProductionOrdersModule,
    SalesModule,
    RequestsModule,
    AuthModule,
    ProductCategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
