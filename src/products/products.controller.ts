import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductIncludeReviewsDto } from './dto/product-include-reviews.dto';
import { ProductDto } from './dto/product.dto';

@Controller('products')
@ApiTags('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiCreatedResponse({ type: ProductDto })
  async createProduct(@Body() createProducDto: CreateProductDto) {
    return await this.productsService.createProduct(createProducDto);
  }

  @Get()
  @ApiOkResponse({ type: ProductDto })
  async getAllProducts() {
    return await this.productsService.getAllProducts();
  }

  @Get(':id')
  @ApiOkResponse({ type: ProductIncludeReviewsDto })
  async getOneProduct(@Param('id') id: string) {
    return await this.productsService.getOneProduct(id);
  }

  @Put(':id')
  @ApiOkResponse({ type: ProductIncludeReviewsDto })
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.productsService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ProductIncludeReviewsDto })
  async deleteProduct(@Param('id') id: string) {
    return await this.productsService.deleteProduct(id);
  }
}
