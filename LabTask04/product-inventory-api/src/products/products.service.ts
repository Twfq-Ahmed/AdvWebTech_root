import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './entities/products.entity.js';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto.js';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepo: Repository<Products>,
  ) {}
  async createProduct(product: CreateProductDto): Promise<string> {
    try {
      const prdct = await this.productsRepo.create(product);
      const p = await this.productsRepo.save(prdct);
      if (p != null) {
        return 'Product Created successfully';
      } else {
        return 'Product creation failed';
      }
    } catch {
      throw new BadRequestException(
        'Failed to create. Exception due to DB error',
      );
    }
  }

  async findAll(): Promise<{
    message: string;
    count: number;
    products: Products[];
  }> {
    const products = await this.productsRepo.find({
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        stock: true,
        category: true,
      },
    });

    return {
      message: `${products.length} products returned successfully`,
      count: products.length,
      products: products,
    };
  }
}
