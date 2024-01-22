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
import {
  HostSchema,
  HostModelSchema,
} from './infrastructure/mongoose/schemas/host.schema';
import { S3Service } from './infrastructure/cdn/s3.service';
import { Mapper } from './infrastructure/mongoose/mapper';
import { CommandHandlers } from './application/commands/handlers';
import { QueryHandlers } from './application/queries/handlers';
import { Factories } from './domain/factories';
import { HostService } from './api/host-event/host.service';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: PropertyModelSchema.name,
        schema: PropertySchema,
      },
      {
        name: HostModelSchema.name,
        schema: HostSchema,
      },
    ]),
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'user-service:host-created',
          type: 'fanout',
        },
        {
          name: 'property-service:property-created',
          type: 'fanout',
        },
      ],
      uri: 'amqp://3.131.89.227:5672',
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
    HostService,
  ],
})
export class PropertyModule {}
