import { Module } from '@nestjs/common';
import { DocTypeService } from './doc-type.service';
import { DocTypeController } from './doc-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocType } from './entities/doc-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DocType])],
  controllers: [DocTypeController],
  providers: [DocTypeService],
})
export class DocTypeModule {}
