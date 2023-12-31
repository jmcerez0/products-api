import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from '@prisma/client';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async createReview(createReviewDto: CreateReviewDto): Promise<Review> {
    const product = await this.prisma.product.findUnique({
      where: { id: createReviewDto.productId },
    });

    if (!product) {
      throw new NotFoundException('Product does not exist.');
    }

    return await this.prisma.review.create({
      data: createReviewDto,
    });
  }

  async getAllReviews(): Promise<Review[]> {
    try {
      return await this.prisma.review.findMany({});
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getOneReview(id: string): Promise<Review> {
    const review = await this.prisma.review.findUnique({
      where: { id },
    });

    if (!review) {
      throw new NotFoundException('Review does not exist.');
    }

    return review;
  }

  async updateReview(
    id: string,
    updateReviewDto: UpdateReviewDto,
  ): Promise<Review> {
    try {
      return await this.prisma.review.update({
        where: { id },
        data: updateReviewDto,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Review does not exist.');
      }
    }
  }

  async deleteReview(id: string): Promise<Review> {
    try {
      return await this.prisma.review.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Review does not exist.');
      }
    }
  }
}
