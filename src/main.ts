import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import {
  HttpExceptionsFilter,
  TypeORMExceptionsFilter,
} from './common/exceptions/filters';

import { join } from 'path';
import { envs } from './config';

import { AUTH_USERS_PACKAGE_NAME } from './grpc/auth/users.pb';

async function bootstrap() {
  const logger = new Logger('Auth-MS');

  const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: `${envs.host}:${envs.port}`,
        package: [AUTH_USERS_PACKAGE_NAME],
        protoPath: [join(__dirname, '../proto-files/auth/users.proto')],
        loader: {
          includeDirs: [join(__dirname, '../proto-files')],
          keepCase: true,
          enums: String,
          arrays: true,
        },
      },
    },
  );

  grpcApp.useGlobalFilters(
    new HttpExceptionsFilter(),
    new TypeORMExceptionsFilter(),
  );

  await grpcApp.listen();

  logger.log(
    `Auth Microservice running with gRPC on ${envs.host}:${envs.port}`,
  );
}
bootstrap();
