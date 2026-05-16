import { applyDecorators } from '@nestjs/common';
import { IsInt, Min, ValidationOptions } from 'class-validator';

export default function IsId(options?: ValidationOptions) {
  return applyDecorators(IsInt(options), Min(0, options));
}
