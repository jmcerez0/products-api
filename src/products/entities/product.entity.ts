import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Product, Review } from '@prisma/client';

export class ProductEntity implements Product {
  @ApiProperty({ example: '69e9d7a0-6ecf-445d-ae00-854c67623d3f' })
  readonly id: string;

  @ApiProperty({ example: 'ALL CONFERENCE INDOOR-OUTDOOR BASKETBALL' })
  readonly name: string;

  @ApiProperty({
    example: 'Ball',
  })
  readonly description: string;

  @ApiProperty({ example: 49.99 })
  readonly price: number;

  @ApiProperty({ example: false })
  readonly sale: boolean;

  @ApiProperty({
    type: () => $Enums.Availability,
    enum: $Enums.Availability,
    example: $Enums.Availability.IN_STORE,
  })
  readonly availability: $Enums.Availability;

  @ApiProperty({ example: '2023-10-24T08:51:30.067Z' })
  readonly createdAt: Date;

  @ApiProperty({ example: '2023-10-24T08:51:30.067Z' })
  readonly updatedAt: Date;

  @ApiProperty({
    example: [
      {
        id: '05ffabdb-58fa-4a73-8a05-7f5b80ecc0ab',
        title: 'Great Product',
        content: 'The quality is superb.',
        rating: 5,
        productId: '69e9d7a0-6ecf-445d-ae00-854c67623d3f',
      },
    ],
  })
  readonly reviews: Review[];
}
