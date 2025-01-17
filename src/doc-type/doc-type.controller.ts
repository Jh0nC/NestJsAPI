import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DocTypeService } from './doc-type.service';
import { CreateDocTypeDto } from './dto/create-doc-type.dto';
import { UpdateDocTypeDto } from './dto/update-doc-type.dto';

@Controller('doc-type')
export class DocTypeController {
  constructor(private readonly docTypeService: DocTypeService) {}

  @Post()
  create(@Body() createDocTypeDto: CreateDocTypeDto) {
    return this.docTypeService.create(createDocTypeDto);
  }

  @Get()
  findAll() {
    return this.docTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.docTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDocTypeDto: UpdateDocTypeDto) {
    return this.docTypeService.update(+id, updateDocTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.docTypeService.remove(+id);
  }
}
