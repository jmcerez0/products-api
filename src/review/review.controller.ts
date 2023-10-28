import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewEntity } from './entities/review.entity';
import { Review } from '@prisma/client';

@Controller('reviews')
@ApiTags('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @ApiCreatedResponse({ type: ReviewEntity })
  async createReview(
    @Body() createReviewDto: CreateReviewDto,
  ): Promise<Review> {
    return await this.reviewService.createReview(createReviewDto);
  }

  @Get()
  @ApiOkResponse({ type: ReviewEntity, isArray: true })
  async getAllReviews(): Promise<Review[]> {
    return await this.reviewService.getAllReviews();
  }

  @Get(':id')
  @ApiOkResponse({ type: ReviewEntity })
  @ApiNotFoundResponse({ description: 'Error: Not Found' })
  async getOneReview(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Review> {
    return await this.reviewService.getOneReview(id);
  }

  @Put(':id')
  @ApiOkResponse({ type: ReviewEntity })
  @ApiNotFoundResponse({ description: 'Error: Not Found' })
  async updateReview(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ): Promise<Review> {
    return await this.reviewService.updateReview(id, updateReviewDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ReviewEntity })
  @ApiNotFoundResponse({ description: 'Error: Not Found' })
  async deleteReview(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Review> {
    return await this.reviewService.deleteReview(id);
  }
}
