import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { Products } from './entities/products.entity.js';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('create-product')
  async createProduct(@Body() product: CreateProductDto): Promise<string> {
    return await this.productsService.createProduct(product);
  }
}
