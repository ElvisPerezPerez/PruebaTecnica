import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SearchUserDto } from './dto/search-user.dto';
import { User } from 'generated/prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    await this._confligCreateUser(createUserDto);
    const email = createUserDto.email.toLowerCase();
    const result = await this.prisma.user.create({
      data: {
        ...createUserDto,
        email: email,
        roleId: 1,
      },
    });

    return result;
  }

  async findAll(searchUser: SearchUserDto) {
    const result = await this.prisma.user.findMany({
      where: {
        ...searchUser,
        email: {
          contains: searchUser.email,
        },
      },
      omit: {
        password: true,
        createdAt: true,
        updatedAt: true,
      },
      take: searchUser.skip,
      skip: searchUser.take,
    });
    return result;
  }

  async findOne(searchUserDto: SearchUserDto) {
    if (searchUserDto.id) {
      await this._confirmExistence(searchUserDto.id);
    }
    return await this.prisma.user.findFirst({
      where: { ...searchUserDto },
      omit: {
        password: false,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this._confirmExistence(id);
    const result = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: updateUserDto,
    });
    return result;
  }

  async remove(id: number) {
    await this._confirmExistence(id);

    const result = await this.prisma.user.delete({
      where: {
        id: id,
      },
    });

    return result;
  }

  async updatePassword(userId: number, newPassword: string) {
    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: newPassword,
      },
    });
  }

  private async _confligCreateUser(createUserDto: CreateUserDto) {
    const existUser = await this.prisma.user.findFirst({
      where: {
        email: createUserDto.email,
      },
    });

    if (existUser) {
      throw new ConflictException('Existe otro usaurio con el mismo email');
    }
  }

  private async _confirmExistence(
    id: number,
  ): Promise<User | NotFoundException> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: id,
      },
    });
    if (!user) {
      return new NotFoundException(`Not found user with id: ${id}`);
    }
    return user;
  }
}
