import { Module } from '@nestjs/common';
import { DocTypeService } from './doc-type.service';
import { DocTypeController } from './doc-type.controller';

@Module({
  controllers: [DocTypeController],
  providers: [DocTypeService],
})
export class DocTypeModule {}
