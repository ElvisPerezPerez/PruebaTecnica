import { applyDecorators } from '@nestjs/common';
import { IsInt, IsOptional, Min } from 'class-validator';

export default function IsIntPositiveOptional() {
  return applyDecorators(IsOptional(), IsInt(), Min(0));
}
