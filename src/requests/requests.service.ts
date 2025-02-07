import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from './entities/request.entity';
import { Repository } from 'typeorm';
import { RequestDetail } from './entities/request-detail.entity';
import { State } from 'src/states/entities/state.entity';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request)
    private readonly requestsRepository: Repository<Request>,

    @InjectRepository(RequestDetail)
    private readonly requestDetailsRepository: Repository<RequestDetail>,

    @InjectRepository(State)
    private readonly statesRepository: Repository<State>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async create(createRequestDto: CreateRequestDto) {
    const { user, total, details } = createRequestDto;

    const currentUser: User = await this.usersRepository.findOneBy({
      id: user,
    });

    if (!currentUser) {
      throw new BadRequestException('User nod found.');
    }

    const state: State = await this.statesRepository.findOneBy({
      name: 'activo',
    });

    const request: Request = this.requestsRepository.create({
      user: currentUser,
      state,
      total,
    });

    const savedRequest: Request = await this.requestsRepository.save(request);

    const requestDetails = await Promise.all(
      details.map(async (detail) => {
        const currentProduct = await this.productsRepository.findOneBy({
          id: detail.product,
        });
        if (!currentProduct) {
          throw new BadRequestException(
            `Product with <id: ${detail.product}> not found`,
          );
        }

        const requestDetail = this.requestDetailsRepository.create({
          request: savedRequest,
          product: currentProduct,
          quantity: detail.quantity,
        });

        return await this.requestDetailsRepository.save(requestDetail);
      }),
    );

    savedRequest.details = requestDetails;

    return plainToInstance(Product, savedRequest, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const requests: Request[] = await this.requestsRepository.find({
      relations: ['user', 'state', 'details', 'details.product'],
    });

    return plainToInstance(Request, requests, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: number) {
    return `This action returns a #${id} request`;
  }

  async update(id: number, updateRequestDto: UpdateRequestDto) {
    return `This action updates a #${id} request`;
  }

  async remove(id: number) {
    return `This action removes a #${id} request`;
  }
}
