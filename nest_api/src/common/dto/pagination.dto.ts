import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  page: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  perPage: number;
}

export class Pagination {
  public static query(page = 1, perPage = 10) {
    return {
      skip: (page - 1) * perPage,
      take: perPage,
    };
  }
}
