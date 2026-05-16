import { IsOptional, IsString } from 'class-validator';
import { EmailField } from 'src/common/decorators/email-field.decorator';

export class CreateUserDto {
  @IsString()
  password: string;

  @EmailField()
  email: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  numberPhone?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  direction?: string;
}
