import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSupplyDto } from './dto/create-supply.dto';
import { UpdateSupplyDto } from './dto/update-supply.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Supply } from './entities/supply.entity';
import { Repository } from 'typeorm';
import { State } from 'src/states/entities/state.entity';
import { BoughtDetail } from 'src/boughts/entities/bought-detail.entity';
import { plainToInstance } from 'class-transformer';
import { ProductDetail } from 'src/products/entities/product-detail.entity';

@Injectable()
export class SuppliesService {
  constructor(
    @InjectRepository(Supply)
    private readonly suppliesRepository: Repository<Supply>,

    @InjectRepository(State)
    private readonly statesRepository: Repository<State>,

    @InjectRepository(BoughtDetail)
    private readonly boughtDetailsRepository: Repository<BoughtDetail>,

    @InjectRepository(ProductDetail)
    private readonly productDetailsRepository: Repository<ProductDetail>,
  ) {}

  async create(createSupplyDto: CreateSupplyDto) {
    const { name, unit } = createSupplyDto;

    const state: State = await this.statesRepository.findOneBy({
      name: 'activo',
    });

    if (await this.suppliesRepository.findOneBy({ name })) {
      throw new BadRequestException('Supply name already exist');
    }

    const createdSupply = await this.suppliesRepository.save({
      name,
      unit,
      state,
    });

    return plainToInstance(Supply, createdSupply, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const supplies: Supply[] = await this.suppliesRepository.find({
      relations: ['state'],
    });

    return plainToInstance(Supply, supplies, { excludeExtraneousValues: true });
  }

  async findOne(id: number) {
    const supply: Supply = await this.suppliesRepository.findOne({
      where: { id },
      relations: ['state'],
    });

    if (!supply) {
      throw new BadRequestException('Supply not found.');
    }

    return plainToInstance(Supply, supply, { excludeExtraneousValues: true });
  }

  async update(id: number, updateSupplyDto: UpdateSupplyDto) {
    const { name, state, stock, unit } = updateSupplyDto;

    if (!name && !state && !stock && !unit) {
      return { message: 'No changes detected.' };
    }

    const currentSupply: Supply = await this.suppliesRepository.findOneBy({
      id,
    });

    if (name && name !== currentSupply.name) {
      const nameExists: Supply = await this.suppliesRepository.findOneBy({
        name,
      });

      if (nameExists) {
        throw new BadRequestException('Supply name already exists');
      }
    }

    if (unit && unit !== currentSupply.unit && currentSupply.stock > 0) {
      const isUsed: boolean = await this.checkSupplyAssociations(currentSupply);

      if (isUsed) {
        throw new BadRequestException(
          'Cannot change the unit. The supply is already associated with other records.',
        );
      }
    }

    let newState = undefined;
    if (state && state !== currentSupply.state.id) {
      newState = await this.statesRepository.findOneBy({
        id: state,
      });

      if (!newState) {
        throw new BadRequestException('State not found');
      }
    }

    const updatedSupply = await this.suppliesRepository.update(id, {
      name: name || currentSupply.name,
      stock: stock || currentSupply.stock,
      unit: unit || currentSupply.unit,
      state: newState || currentSupply.state,
    });

    return plainToInstance(Supply, updatedSupply, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: number) {
    const currentSupply = await this.suppliesRepository.findOneBy({ id });
    if (currentSupply) {
      const isUsed: boolean = await this.checkSupplyAssociations(currentSupply);
      if (isUsed) {
        throw new BadRequestException(
          'Cannot delete the supply. The supply is already associated with other records.',
        );
      }
      return await this.suppliesRepository.delete({ id });
    } else {
      throw new BadRequestException('Supply not found');
    }
  }

  private async checkSupplyAssociations(supply: Supply): Promise<boolean> {
    if (
      await this.boughtDetailsRepository.findOneBy({
        supply,
      })
    ) {
      return true;
    }
    if (
      await this.productDetailsRepository.findOneBy({
        supply,
      })
    ) {
      return true;
    }

    return false;
  }
}
