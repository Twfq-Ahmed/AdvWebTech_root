import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './entities/products.entity.js';
import { CreateDateColumn, ILike, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { PartialUpdateProductDto } from './dto/partial-update-product.dto.js';
import { stringify } from 'querystring';
import { repl } from '@nestjs/core';

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

      order: {
        createdAt: 'DESC',
      },
    });

    return {
      message: `${products.length} products returned successfully`,
      count: products.length,
      products: products,
    };
  }

  async findOneProduct(
    id: number,
  ): Promise<{ message: string; product: Products } | string> {
    const product = await this.productsRepo.findOne({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        stock: true,
        category: true,
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    } else {
      return {
        message: `Product with id ${id} found`,
        product: product,
      };
    }
  }

  async updateProduct(
    id: number,
    partialUpdateProductDto: PartialUpdateProductDto,
  ): Promise<{ message: string; data: Products } | string> {
    try {
      // const product = await this.findOneProduct(id);
      const res = (await this.productsRepo.update(id, partialUpdateProductDto))
        .affected;

      if (res != null && res > 0) {
        const u = await this.findOneProduct(id);
        if (typeof u === 'string') {
          return u;
        } else {
          return {
            message: 'Product successfully updated',
            data: u.product,
          };
        }
      } else {
        return `Product with id ${id} not found`;
      }
    } catch {
      throw new BadRequestException('Failed due to DB error');
    }
  }

  async replaceProduct(
    id: number,
    replaceProduct: UpdateProductDto,
  ): Promise<{ message: string; data: Products } | string> {
    try {
      // const product = await this.findOneProduct(id);
      // if(!product){
      //   throw new BadRequestException('Product not found');
      // }

      const res = (await this.productsRepo.update(id, replaceProduct)).affected;
      if (res != null && res > 0) {
        const rep = await this.findOneProduct(id);
        if (typeof rep === 'string') {
          return rep;
        } else {
          return {
            message: `Product with id ${id} was successfully replaced`,
            data: rep.product,
          };
        }
      } else {
        return `Product with id ${id} not found`;
      }
    } catch {
      throw new BadRequestException('Failed due to DB error');
    }
  }

  async removeProduct(id: number): Promise<string> {
    try {
      const res = (await this.productsRepo.delete(id)).affected;
      if (res != null && res > 0) {
        return `Product with id ${id} was deleted`;
      } else {
        throw new NotFoundException(`Product with id ${id} was not found`);
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Something went wrong');
    }
  }

  async findProductByCatefory(
    cat: string,
  ): Promise<{ message: string; count: number; data: Products[] } | string> {
    try {
      const product = await this.productsRepo.find({
        where: {
          category: cat,
        },
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          stock: true,
          category: true,
        },
        // order: {
        //   id: 'ASC',
        // },
      });
      if (product) {
        return {
          message: `All products of category: ${cat} fetched`,
          count: product.length,
          data: product,
        };
      } else {
        throw new NotFoundException(
          `No products with category: ${cat} were found`,
        );
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Something went wrong');
    }
  }

  async searchProduct(
    keyword: string,
  ): Promise<{ message: string; count: number; data: Products[] } | string> {
    try {
      const product = await this.productsRepo.find({
        where: {
          name: ILike(`%${keyword}%`),
        },

        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          stock: true,
          category: true,
        },
      });

      if (product) {
        return {
          message: `${product.length} products found`,
          count: product.length,
          data: product,
        };
      } else {
        throw new NotFoundException(
          `No products found with the keyword: ${keyword}`,
        );
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new BadRequestException(
        'Could not find product. Something went wrong',
      );
    }
  }

  toggleActive() {}
}
