import { CreateUserDto } from './create-user.dto';
import { PartialType, OmitType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['password', 'email'] as const),
) {}
