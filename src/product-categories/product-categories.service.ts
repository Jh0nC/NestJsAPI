import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from './entities/product-category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductCategoriesService {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategoriesRepository: Repository<ProductCategory>,
  ) {}

  async create(createProductCategoryDto: CreateProductCategoryDto) {
    const { name, description } = createProductCategoryDto;

    const existingCategory = await this.productCategoriesRepository.findOneBy({ name });
    if (existingCategory) {
      throw new BadRequestException('Category with this name already exists.');
    }

    const productCategory = this.productCategoriesRepository.create({
      name,
      description,
    });

    return await this.productCategoriesRepository.save(productCategory);
  }

  async findAll() {
    return await this.productCategoriesRepository.find();
  }

  async findOne(id: number) {
    const productCategory = await this.productCategoriesRepository.findOne({ where: { id } });

    if (!productCategory) {
      throw new NotFoundException(`Product category with id ${id} not found.`);
    }

    return productCategory;
  }

  async update(id: number, updateProductCategoryDto: UpdateProductCategoryDto) {
    const productCategory = await this.productCategoriesRepository.findOne({ where: { id } });

    if (!productCategory) {
      throw new NotFoundException(`Product category with id ${id} not found.`);
    }

    const updatedCategory = Object.assign(productCategory, updateProductCategoryDto);

    return await this.productCategoriesRepository.save(updatedCategory);
  }

  async remove(id: number) {
    const productCategory = await this.productCategoriesRepository.findOne({ where: { id } });

    if (!productCategory) {
      throw new NotFoundException(`Product category with id ${id} not found.`);
    }

    await this.productCategoriesRepository.remove(productCategory);

    return { message: `Product category with id ${id} has been removed successfully.` };
  }
}
