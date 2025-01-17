import { Injectable } from '@nestjs/common';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { State } from './entities/state.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatesService {
  constructor(
    @InjectRepository(State)
    private readonly statesReporitory: Repository<State>,
  ) {}

  async create(createStateDto: CreateStateDto) {
    return await this.statesReporitory.save(createStateDto);
  }

  async findAll() {
    return await this.statesReporitory.find();
  }

  async findOne(id: number) {
    return await this.statesReporitory.findOneBy({ id });
  }

  async update(id: number, updateStateDto: UpdateStateDto) {
    return `This action updates a #${id} state`;
  }

  async remove(id: number) {
    return `This action removes a #${id} state`;
  }
}
