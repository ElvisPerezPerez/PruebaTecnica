import { IntersectionType, OmitType, PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateUserDto } from './create-user.dto';
import IsIntPositiveOptional from 'src/common/decorators/is-int-positive-optional.decorator';

export class SearchUserDto extends IntersectionType(
  PaginationDto,
  PartialType(OmitType(CreateUserDto, ['password', 'email'] as const)),
) {
  @IsIntPositiveOptional()
  id?: number;

  @IsOptional()
  @IsString()
  username?: string;
  @IsOptional()
  @IsString()
  email?: string;
}
