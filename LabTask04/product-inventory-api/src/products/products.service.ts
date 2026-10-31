import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './entities/products.entity.js';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto.js';

@Injectable()
export class ProductsService {
  // constructor(
  //   @InjectRepository(Products)
  //   private readonly productsRepo: Repository<Products>,
  // ) {}
  // async createProduct(product: CreateProductDto): Promise<Products | string> {
  //   try{
  //   }
  //   catch{
  //   }
  // }
}
