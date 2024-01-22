import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { BadRequestException } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

import { CreatePropertyCommand } from '../impl/create-property.command';
import { PropertyRepository } from '../../../infrastructure/mongoose/repositories/property.repository';
import { PropertyFactory } from '../../../domain/factories/property.factory';
import { Address } from '../../../domain/model/address.model';

@CommandHandler(CreatePropertyCommand)
export class CreatePropertyHandler
  implements ICommandHandler<CreatePropertyCommand>
{
  constructor(
    private readonly propertyRepository: PropertyRepository,
    private readonly publisher: EventPublisher,
    private readonly propertyFactory: PropertyFactory,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  async execute(command: CreatePropertyCommand) {
    try {
      const { createPropertyRequest } = command;

      const customAddress = new Address(
        createPropertyRequest.address.street,
        createPropertyRequest.address.number,
        createPropertyRequest.address.city,
        createPropertyRequest.address.countryCode,
        createPropertyRequest.address.latitude,
        createPropertyRequest.address.longitude,
      );

      const propertyObject = this.propertyFactory.createProperty(
        '',
        createPropertyRequest.name,
        createPropertyRequest.description,
        createPropertyRequest.propertyType,
        createPropertyRequest.amenities,
        customAddress,
        createPropertyRequest.capacity,
        createPropertyRequest.rooms,
        createPropertyRequest.beds,
        createPropertyRequest.bathrooms,
        createPropertyRequest.pricePerNight,
      );

      const property = this.publisher.mergeObjectContext(
        this.propertyRepository.save(propertyObject),
      );

      property.commit();

      await this.amqpConnection.publish(
        'property-service:property-created',
        '',
        property,
      );

      return property;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
