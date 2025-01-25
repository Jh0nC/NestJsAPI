import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductDetail } from './entities/product-detail.entity';
import { ProductCategory } from '../product-categories/entities/product-category.entity';
import { State } from 'src/states/entities/state.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { plainToInstance } from 'class-transformer';
import { Supply } from 'src/supplies/entities/supply.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,

    @InjectRepository(ProductDetail)
    private readonly productDetailsRepository: Repository<ProductDetail>,

    @InjectRepository(ProductCategory)
    private readonly productCategoriesRepository: Repository<ProductCategory>,

    @InjectRepository(State)
    private readonly statesRepository: Repository<State>,

    @InjectRepository(Supply)
    private readonly suppliesRepository: Repository<Supply>,
  ) {}

  async findAll() {
    const products = await this.productsRepository.find({
      relations: ['category', 'details', 'details.supply', 'state'],
    });

    return plainToInstance(Product, products, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: number) {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ['category', 'details', 'details.supply', 'state'],
    });

    if (!product) {
      throw new BadRequestException('Product not found.');
    }

    return plainToInstance(Product, product, { excludeExtraneousValues: true });
  }

  async create(createProductDto: CreateProductDto) {
    const { name, category, description, image, price, details } =
      createProductDto;

    const productCategory = await this.productCategoriesRepository.findOneBy({
      id: category,
    });
    if (!productCategory) {
      throw new BadRequestException('Category not found.');
    }

    const state: State = await this.statesRepository.findOneBy({
      name: 'activo',
    });

    const product: Product = this.productsRepository.create({
      name,
      category: productCategory,
      description,
      image,
      state,
      price,
    });

    const savedProduct = await this.productsRepository.save(product);

    const productDetails = await Promise.all(
      details.map(async (detail) => {
        const currentSupply = await this.suppliesRepository.findOneBy({
          id: detail.supply,
        });
        if (!currentSupply) {
          throw new BadRequestException(
            `Supply with <id: ${detail.supply}> not found`,
          );
        }

        const productDetail = this.productDetailsRepository.create({
          product: savedProduct,
          supply: currentSupply,
        });

        return await this.productDetailsRepository.save(productDetail);
      }),
    );

    savedProduct.details = productDetails;

    return plainToInstance(Product, savedProduct, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const { name, category, state, description, image, stock, price, details } =
      updateProductDto;

    const currentProduct = await this.productsRepository.findOneBy({ id });
    if (!currentProduct) {
      throw new BadRequestException('Product not found.');
    }

    if (
      !name &&
      !category &&
      !state &&
      !description &&
      !image &&
      !stock &&
      !price &&
      !details
    ) {
      return { message: 'No changes detected.' };
    }

    if (name && name !== currentProduct.name) {
      const nameExist: Product = await this.productsRepository.findOneBy({
        name,
      });

      if (nameExist) {
        throw new BadRequestException('Product name already exist.');
      }
    }

    if (category && category !== currentProduct.category.id) {
      const productCategory = await this.productCategoriesRepository.findOneBy({
        id: category,
      });
      if (!productCategory) {
        throw new BadRequestException('Category not found.');
      }
      currentProduct.category = productCategory;
    }

    if (state && state !== currentProduct.state.id) {
      const productState = await this.statesRepository.findOneBy({ id: state });
      if (!productState) {
        throw new BadRequestException('State not found.');
      }
      currentProduct.state = productState;
    }

    if (details) {
      await this.productDetailsRepository.delete({
        product: { id: currentProduct.id },
      });

      const productDetails = await Promise.all(
        details.map(async (detail) => {
          const currentSupply = await this.suppliesRepository.findOneBy({
            id: detail.supply,
          });
          if (!currentSupply) {
            throw new BadRequestException(
              `Supply with <id: ${detail.supply}> not found`,
            );
          }

          const productDetail = this.productDetailsRepository.create({
            product: currentProduct,
            supply: currentSupply,
          });

          return await this.productDetailsRepository.save(productDetail);
        }),
      );

      currentProduct.details = productDetails;
    }

    currentProduct.name = name || currentProduct.name;
    currentProduct.description = description || currentProduct.description;
    currentProduct.image = image || currentProduct.image;
    currentProduct.stock = stock !== undefined ? stock : currentProduct.stock;
    currentProduct.price = price || currentProduct.price;

    const updatedProduct = await this.productsRepository.save(currentProduct);

    return plainToInstance(Product, updatedProduct, {
      excludeExtraneousValues: true,
    });
  }
}
