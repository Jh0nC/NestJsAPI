import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { State } from 'src/states/entities/state.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,

    @InjectRepository(State)
    private readonly statesRepository: Repository<State>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const state = await this.statesRepository.findOneBy({
      id: createRoleDto.state,
    });

    if (!state) {
      throw new BadRequestException('State not found');
    }

    return await this.rolesRepository.save({
      ...createRoleDto,
      state
    });
  }

  async findAll() {
    return await this.rolesRepository.find();
  }

  async findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  async remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
