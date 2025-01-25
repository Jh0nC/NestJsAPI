import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { State } from 'src/states/entities/state.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,

    @InjectRepository(State)
    private readonly statesRepository: Repository<State>,
  ) {}

  async findAll() {
    const roles: Role[] = await this.rolesRepository.find({
      relations: ['state'],
    });
    return plainToInstance(Role, roles, { excludeExtraneousValues: true });
  }

  async findOne(id: number) {
    const role: Role = await this.rolesRepository.findOne({
      where: { id },
      relations: ['state'],
    });

    if (!role) {
      throw new BadRequestException('Role not found.');
    }

    return plainToInstance(Role, role, { excludeExtraneousValues: true });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const { state } = updateRoleDto;
    if (state) {
      let newState = undefined;
      if (state) {
        newState = await this.statesRepository.findOneBy({ id: state });
        if (!newState) {
          throw new BadRequestException('State not found');
        }
      }

      const updatedRole = await this.rolesRepository.update(id, {
        state: newState,
      });

      return plainToInstance(Role, updatedRole, {
        excludeExtraneousValues: true,
      });
    } else {
      return { message: 'No changes detected' };
    }
  }
}
