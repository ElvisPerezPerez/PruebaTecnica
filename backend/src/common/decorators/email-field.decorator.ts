import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export function EmailField() {
  return applyDecorators(
    ApiProperty({ type: String }),
    Transform(({ value }) => value?.toLowerCase()),
    IsString(),
    IsEmail(),
  );
}
