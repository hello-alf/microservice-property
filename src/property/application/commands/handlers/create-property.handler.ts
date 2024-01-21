import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { BadRequestException } from '@nestjs/common';

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
  ) {}

  async execute(command: CreatePropertyCommand) {
    try {
      const { createPropertyRequest } = command;

      console.log('createPropertyRequest', createPropertyRequest);

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

      return property;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
