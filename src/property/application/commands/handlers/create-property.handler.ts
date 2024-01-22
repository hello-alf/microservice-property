import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { BadRequestException } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

import { CreatePropertyCommand } from '../impl/create-property.command';
import { PropertyRepository } from '../../../infrastructure/mongoose/repositories/property.repository';
import { PropertyFactory } from '../../../domain/factories/property.factory';
import { Address } from '../../../domain/model/address.model';
import { HostRepository } from 'src/property/infrastructure/mongoose/repositories/host.repository';

@CommandHandler(CreatePropertyCommand)
export class CreatePropertyHandler
  implements ICommandHandler<CreatePropertyCommand>
{
  constructor(
    private readonly propertyRepository: PropertyRepository,
    private readonly hostRepository: HostRepository,
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

      const actualHost = await this.hostRepository.findById(
        createPropertyRequest.host,
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
        actualHost,
      );

      const property = this.publisher.mergeObjectContext(
        this.propertyRepository.save(propertyObject, actualHost),
      );

      property.commit();

      const brokerPayload = {
        id: property.getId(),
        name: property.getName(),
        description: property.getDescription(),
        address: property.getAddress(),
        propertyType: property.getPropertyType(),
        pricePerNight: property.getPricePerNight(),
      };

      await this.amqpConnection.publish(
        'property-service:property-created',
        '',
        brokerPayload,
      );

      return property;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
