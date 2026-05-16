import { applyDecorators, SetMetadata } from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';

export const Is_Public = 'isPublic';

const _Public = () => SetMetadata(Is_Public, true);

export function Public() {
  return applyDecorators(
    _Public(), // Para el guard (sin autenticación)
    ApiSecurity({}), // Para Swagger (sin candado)
  );
}
