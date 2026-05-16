import {
  OnModuleInit,
  OnModuleDestroy,
  Injectable,
  Logger,
} from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma/client';
import {
  DELAY_IN_MILISECONDS,
  RETRIES_CONNECTIONS,
  TIMEOUT_TRANSACTIONS as TIMEOUT_TRANSACTIONS_IN_MILISECONDS,
} from './constants/prisma.constants';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL as string,
    });
    super({ adapter });
  }

  async executeTransaction() {
    const result = await this.$transaction(
      async (_) => {
        // Tu lógica de transacción aquí
      },
      {
        timeout: TIMEOUT_TRANSACTIONS_IN_MILISECONDS, // Tiempo de espera en milisegundos (100 segundos en este caso)
      },
    );

    return result;
  }

  async onModuleInit() {
    this.logger.log('Connecting to the database...');
    await this.tryConnectWithRetry();
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
      this.logger.log('Prisma disconnected on module destroy');
    } catch (err) {
      this.logger.error('Error disconnecting Prisma:', err);
    }
  }

  private async tryConnectWithRetry(
    retries = RETRIES_CONNECTIONS,
    delayMs = DELAY_IN_MILISECONDS,
  ): Promise<void> {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        this.logger.log(`Attempting ${attempt} database connection...`);
        await this.$connect();
        this.logger.log('Database connection established');
        return;
      } catch (error) {
        this.logger.error(
          `Database connection failed (attempt ${attempt}/${retries}): ${error}`,
        );
        if (attempt < retries) {
          await new Promise((res) => setTimeout(res, delayMs));
        } else {
          this.logger.error(
            'Could not connect to the database after several attempts.',
          );
          throw new Error('Could not connect to the database');
        }
      }
    }
  }

  async isConnected(): Promise<boolean> {
    try {
      await this.$queryRaw`SELECT 1`;
      return true;
    } catch (error) {
      this.logger.error('Database connection error:', error);
      return false;
    }
  }
}
