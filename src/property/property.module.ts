import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

import { PropertyController } from './api/property/property.controller';
import { Repositories } from './infrastructure/mongoose/repositories';

import {
  PropertyModelSchema,
  PropertySchema,
} from './infrastructure/mongoose/schemas/property.schema';
import { S3Service } from './infrastructure/cdn/s3.service';

import { Mapper } from './infrastructure/mongoose/mapper';
import { CommandHandlers } from './application/commands/handlers';
import { QueryHandlers } from './application/queries/handlers';
import { Factories } from './domain/factories';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: PropertyModelSchema.name,
        schema: PropertySchema,
      },
    ]),
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'demostracion',
          type: 'fanout',
        },
        {
          name: 'booking-service',
          type: 'fanout',
        },
      ],
      uri: 'amqp://3.135.210.254:5672',
      connectionInitOptions: { wait: true, reject: true, timeout: 3000 },
    }),
  ],
  controllers: [PropertyController],
  providers: [
    ...Repositories,
    ...CommandHandlers,
    ...QueryHandlers,
    ...Mapper,
    ...Factories,
    S3Service,
  ],
})
export class PropertyModule {}
