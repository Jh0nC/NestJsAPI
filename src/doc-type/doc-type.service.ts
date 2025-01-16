import { Injectable } from '@nestjs/common';
import { CreateDocTypeDto } from './dto/create-doc-type.dto';
import { UpdateDocTypeDto } from './dto/update-doc-type.dto';

@Injectable()
export class DocTypeService {
  create(createDocTypeDto: CreateDocTypeDto) {
    return 'This action adds a new docType';
  }

  findAll() {
    return `This action returns all docType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} docType`;
  }

  update(id: number, updateDocTypeDto: UpdateDocTypeDto) {
    return `This action updates a #${id} docType`;
  }

  remove(id: number) {
    return `This action removes a #${id} docType`;
  }
}
