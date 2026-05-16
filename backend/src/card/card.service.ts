import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CardService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly user: UsersService,
  ) {}

  async create(createCardDto: CreateCardDto) {
    const anotherCard = await this.prisma.card.findUnique({
      where: { cardNumber: createCardDto.cardNumber },
    });
    if (anotherCard) {
      throw new ConflictException('Card number already exists');
    }

    const user = await this.user.findOne({ id: createCardDto.userId });
    if (!user) {
      throw new NotFoundException(
        `User with id ${createCardDto.userId} not found`,
      );
    }

    return this.prisma.card.create({
      data: createCardDto,
    });
  }

  async findAll() {
    return await this.prisma.card.findMany();
  }

  async findOne(id: number) {
    const card = await this.prisma.card.findUnique({
      where: { id },
    });

    if (!card) {
      throw new NotFoundException(`Card with id ${id} not found`);
    }
    return card;
  }

  async findByUser(userId: number) {
    await this.user.findOne({ id: userId });
    return await this.prisma.card.findMany({
      where: { userId },
    });
  }

  async update(id: number, updateCardDto: UpdateCardDto) {
    const card = await this.findOne(id);
    if (!card) {
      throw new NotFoundException(`Card with id ${id} not found`);
    }

    if (updateCardDto.userId) {
      const user = await this.user.findOne({ id: updateCardDto.userId });
      if (!user) {
        throw new NotFoundException(
          `User with id ${updateCardDto.userId} not found`,
        );
      }
    }

    const anotherCardWithSameNumber = await this.prisma.card.findUnique({
      where: { cardNumber: updateCardDto.cardNumber },
    });

    if (anotherCardWithSameNumber && anotherCardWithSameNumber.id !== id) {
      throw new ConflictException('Card number already exists');
    }

    return this.prisma.card.update({
      where: { id },
      data: updateCardDto,
    });
  }

  async remove(id: number) {
    const card = await this.findOne(id);
    if (!card) {
      throw new NotFoundException(`Card with id ${id} not found`);
    }
    return this.prisma.card.delete({
      where: { id },
    });
  }
}
