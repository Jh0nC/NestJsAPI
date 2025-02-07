import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOptionsSelect, Repository } from 'typeorm';
import { DocType } from 'src/doc-type/entities/doc-type.entity';
import { Role } from 'src/roles/entities/role.entity';
import { State } from 'src/states/entities/state.entity';
import * as bcrypt from 'bcryptjs';
import { Name as RoleName } from 'src/roles/types/name.enum';

@Injectable()
export class UsersService {
  findRequiredFields: FindOptionsSelect<User> = {
    id: true,
    role: {},
    state: {},
    docType: {},
    document: true,
    firstName: true,
    lastName: true,
    phoneNumber: true,
    address: true,
    email: true,
    password: false,
    createdAt: true,
    updatedAt: true,
  };

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @InjectRepository(DocType)
    private readonly docTypesRepository: Repository<DocType>,

    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,

    @InjectRepository(State)
    private readonly statesRepository: Repository<State>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const {
      address,
      docType,
      document,
      email,
      firstName,
      lastName,
      password,
      phoneNumber,
    } = createUserDto;

    if (isNaN(Number(document)) || isNaN(Number(phoneNumber))) {
      throw new BadRequestException(
        'Document and phone number must contain only numbers.',
      );
    }

    const newDocType: DocType = await this.docTypesRepository.findOneBy({
      id: docType,
    });
    if (!newDocType) {
      throw new BadRequestException('Document type not found.');
    }

    const newRole: Role = await this.rolesRepository.findOneBy({
      name: RoleName.cliente,
    });
    if (!newRole) {
      throw new BadRequestException('Role not found.');
    }

    const newState: State = await this.statesRepository.findOneBy({
      name: 'activo',
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.usersRepository.save({
      role: newRole,
      state: newState,
      docType: newDocType,
      document,
      firstName,
      lastName,
      phoneNumber,
      address,
      email,
      password: hashedPassword,
    });
  }

  async findAll() {
    return await this.usersRepository.find({
      select: this.findRequiredFields,
    });
  }

  async findOne(id: number) {
    const user: User = await this.usersRepository.findOne({
      where: { id },
      select: this.findRequiredFields,
    });

    if (!user) {
      throw new BadRequestException('User not found.');
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
