import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from './prisma/prisma.module';
import { CacheModule } from '@nestjs/cache-manager';
import { ClsModule } from 'nestjs-cls/dist/src/lib/cls-module/cls.module';
import { ClsPluginTransactional } from '@nestjs-cls/transactional/dist/src/lib/plugin-transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma/dist/src/lib/transactional-adapter-prisma';
import { PrismaService } from './prisma/prisma.service';
import { CardModule } from './card/card.module';
import { PaymentModule } from './payment/payment.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CacheModule.register({ isGlobal: true }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 1000,
        },
      ],
    }),
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
      plugins: [
        new ClsPluginTransactional({
          imports: [PrismaModule],
          adapter: new TransactionalAdapterPrisma({
            // prismaInjectionToken: CUSTOM_PRISMA_CLIENT_TOKEN,
            prismaInjectionToken: PrismaService,
            sqlFlavor: 'postgresql',
            defaultTxOptions: {
              timeout: 30000, // 30 segundos (ajusta según necesites)
            },
          }),
        }),
      ],
    }),
    CardModule,
    PaymentModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
