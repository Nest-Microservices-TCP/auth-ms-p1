import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { envs } from './config';

async function bootstrap() {
  const logger = new Logger('Auth-MS');

  const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: `${envs.host}:${envs.port}`,
        package: [],
        protoPath: [],
        loader: {
          includeDirs: [],
          keepCase: true,
          enums: String,
          arrays: true,
        },
      },
    },
  );
}
bootstrap();
