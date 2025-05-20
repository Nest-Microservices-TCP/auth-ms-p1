import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const logger = new Logger('Auth-MS');

  const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '',
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
