import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { DocTypeModule } from './doc-type/doc-type.module';
import { StatesModule } from './states/states.module';
import { SuppliesModule } from './supplies/supplies.module';

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
      entities: [],
      synchronize: true
    }),
    RolesModule,
    UsersModule,
    DocTypeModule,
    StatesModule,
    SuppliesModule
  ],
  controllers: [],
  providers: []
})

export class AppModule { }