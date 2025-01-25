import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { State } from './entities/state.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatesService {
  constructor(
    @InjectRepository(State)
    private readonly statesReporitory: Repository<State>,
  ) {}

  async findAll() {
    return await this.statesReporitory.find();
  }

  async findOne(id: number) {
    return await this.statesReporitory.findOneBy({ id });
  }
}
