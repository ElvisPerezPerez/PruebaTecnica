import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { PaymentResponseDto } from './dto/payment-response.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PaymentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly httpService: HttpService,
  ) {}

  async create(createPaymentDto: CreatePaymentDto) {
    return await this.prisma.$transaction(async (prisma) => {
      await this.usersService.findOne({ id: createPaymentDto.userId });
      const paymentResult = await this.processExternalPayment(createPaymentDto);
      await prisma.payment.create({
        data: {
          userId: createPaymentDto.userId,
          cardId: createPaymentDto.cardId,
          amount: createPaymentDto.amount,
          status: paymentResult.status,
        },
      });
      return {
        status: paymentResult.status,
      };
    });
  }

  async processExternalPayment(createPaymentDto: CreatePaymentDto) {
    const response = await firstValueFrom(
      this.httpService.post<PaymentResponseDto>(
        'http://localhost:8000/process-payment',
        createPaymentDto,
      ),
    );
    return response.data;
  }

  async findByUser(userId: number) {
    await this.usersService.findOne({ id: userId });
    return await this.prisma.payment.findMany({
      where: { userId },
    });
  }

  async findOne(id: number) {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
    });
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }
    return payment;
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.payment.delete({
      where: { id },
    });
  }
}
