import { Controller, Get, Param } from '@nestjs/common';
import { DocTypeService } from './doc-type.service';

@Controller('doc-type')
export class DocTypeController {
  constructor(private readonly docTypeService: DocTypeService) {}

  @Get()
  findAll() {
    return this.docTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.docTypeService.findOne(id);
  }
}
