import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString({ each: true })
  photoUris: string[];

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsString()
  sellerId: string;

  constructor(name: string, description: string, photoUris: string[], price: number, sellerId: string) {
    this.name = name;
    this.description = description;
    this.photoUris = photoUris;
    this.price = price;
    this.sellerId = sellerId;
  }
}

export class CreateProductResultDto {
  @ApiProperty()
  id: string;
}
