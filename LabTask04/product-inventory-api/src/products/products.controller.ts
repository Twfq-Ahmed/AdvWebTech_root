import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { Products } from './entities/products.entity.js';
import { PartialUpdateProductDto } from './dto/partial-update-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('create-product')
  async createProduct(@Body() product: CreateProductDto): Promise<string> {
    return await this.productsService.createProduct(product);
  }

  @Get('findAllProducts')
  async findAllProducts(): Promise<{
    message: string;
    count: number;
    products: Products[];
  }> {
    return await this.productsService.findAll();
  }

  @Get('findOneProduct/:id')
  async findOneProduct(
    @Param('id') id: number,
  ): Promise<{ message: string; product: Products } | string> {
    return await this.productsService.findOneProduct(id);
  }

  @Patch('/:id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() product: PartialUpdateProductDto,
  ): Promise<{ message: string; data: Products } | string> {
    return this.productsService.updateProduct(id, product);
  }

  @Put('/:id')
  async replaceProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() product: UpdateProductDto,
  ): Promise<{ message: string; data: Products } | string> {
    return this.productsService.replaceProduct(id, product);
  }

  @Delete('/:id')
  async removeProduct(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.productsService.removeProduct(id);
  }

  @Get('category/:cat')
  async findProductByCategory(
    @Param('cat') cat: string,
  ): Promise<{ message: string; count: number; data: Products[] } | string> {
    return this.productsService.findProductByCatefory(cat);
  }

  @Get('search')
  async searchProduct(
    @Query('keyword') keyword: string,
  ): Promise<{ message: string; count: number; data: Products[] } | string> {
    return this.productsService.searchProduct(keyword);
  }
}
