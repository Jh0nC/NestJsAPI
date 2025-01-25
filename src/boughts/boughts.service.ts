import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterBoughtDto } from './dto/register-bought.dto';
import { UpdateBoughtDto } from './dto/update-bought.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bought } from './entities/bought.entity';
import { Repository } from 'typeorm';
import { BoughtDetail } from './entities/bought-detail.entity';
import { User } from 'src/users/entities/user.entity';
import { Supply } from 'src/supplies/entities/supply.entity';
import { format } from 'date-fns';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class BoughtsService {
  constructor(
    @InjectRepository(Bought)
    private readonly boughtsRepository: Repository<Bought>,

    @InjectRepository(BoughtDetail)
    private readonly boughtDetailsRepository: Repository<BoughtDetail>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @InjectRepository(Supply)
    private readonly suppliesRepository: Repository<Supply>,
  ) {}

  async register(registerBoughtDto: RegisterBoughtDto) {
    const { user, bill, date, total, details } = registerBoughtDto;

    const newUser: User = await this.usersRepository.findOneBy({
      id: user,
    });

    if (!newUser) {
      throw new BadRequestException('User not found.');
    }

    if (await this.boughtsRepository.findOneBy({ bill })) {
      throw new BadRequestException('Bill is already registered.');
    }

    if (new Date(date) > new Date()) {
      throw new BadRequestException('Date cannot be in the future');
    }

    const formattedDate = format(new Date(date), 'yyyy-MM-dd HH:mm:ss');

    const bought: Bought = this.boughtsRepository.create({
      user: newUser,
      bill,
      date: formattedDate,
      total,
    });

    const savedBought = await this.boughtsRepository.save(bought);

    const boughtDetails = await Promise.all(
      details.map(async (detail) => {
        const currentSupply: Supply = await this.suppliesRepository.findOneBy({
          id: detail.supply,
        });
        if (!currentSupply) {
          throw new BadRequestException(
            `Supply with <id: ${detail.supply}> not found`,
          );
        }

        const boughtDetail = this.boughtDetailsRepository.create({
          bought: savedBought,
          supply: currentSupply,
          amount: detail.amount,
        });

        return await this.boughtDetailsRepository.save(boughtDetail);
      }),
    );

    savedBought.details = boughtDetails;

    return plainToInstance(Bought, savedBought, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const boughts: Bought[] = await this.boughtsRepository.find({
      relations: ['user'],
    });
    return plainToInstance(Bought, boughts, { excludeExtraneousValues: true });
  }

  async findOne(id: number) {
    const bought: Bought = await this.boughtsRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!bought) {
      throw new BadRequestException('Bought not found.');
    }

    return plainToInstance(Bought, bought, { excludeExtraneousValues: true });
  }

  async update(id: number, updateBoughtDto: UpdateBoughtDto) {
    const { bill, date, total, details } = updateBoughtDto;

    const currentBought: Bought = await this.boughtsRepository.findOneBy({
      id,
    });

    if (!currentBought) {
      throw new BadRequestException('Bought not found.');
    }

    if (!bill && !date && !total && !details) {
      return { message: 'No changes detected.' };
    }

    if (bill && bill !== currentBought.bill) {
      const billExist: Bought = await this.boughtsRepository.findOneBy({
        bill,
      });

      if (billExist) {
        throw new BadRequestException('Bought bill already exist.');
      }
    }

    let formattedDate = undefined;
    if (date) {
      formattedDate = format(new Date(date), 'yyyy-MM-dd HH:mm:ss');
    }

    if (details) {
      await this.boughtDetailsRepository.delete({
        bought: { id: currentBought.id },
      });

      const boughtDetails = await Promise.all(
        details.map(async (detail) => {
          const currentSupply: Supply = await this.suppliesRepository.findOneBy(
            {
              id: detail.supply,
            },
          );
          if (!currentSupply) {
            throw new BadRequestException(
              `Supply with <id: ${detail.supply}> not found`,
            );
          }

          const boughtDetail = this.boughtDetailsRepository.create({
            bought: currentBought,
            supply: currentSupply,
            amount: detail.amount,
          });

          return await this.boughtDetailsRepository.save(boughtDetail);
        }),
      );

      currentBought.details = boughtDetails;
    }

    currentBought.bill = bill || currentBought.bill;
    currentBought.date = formattedDate || currentBought.date;
    currentBought.total = total || currentBought.total;

    const updatedBought = await this.boughtsRepository.save(currentBought);

    return plainToInstance(
      Bought,
      await this.boughtsRepository.findOne({
        where: { id: updatedBought.id },
        relations: ['user'],
      }),
      { excludeExtraneousValues: true },
    );
  }
}
