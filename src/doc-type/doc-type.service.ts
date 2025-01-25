import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DocType } from './entities/doc-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DocTypeService {
  constructor(
    @InjectRepository(DocType)
    private readonly docTypesRepository: Repository<DocType>,
  ) {}

  async findAll() {
    return await this.docTypesRepository.find();
  }

  async findOne(id: number) {
    const docType: DocType = await this.docTypesRepository.findOneBy({ id });

    if (!docType) {
      throw new BadRequestException('DocType not found.');
    }

    return docType;
  }
}
