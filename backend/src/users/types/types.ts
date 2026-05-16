import { CreateUserDto } from '../dto/create-user.dto';

export interface CreateUserParams {
  createUserDto: CreateUserDto;
  confirmEmail: boolean;
  provider: 'local' | 'google' | 'email';
}
