import { Injectable } from '@nestjs/common';
import { iProperty } from './iProperty';
import { Property } from '../model/property.model';
import AmenityEnum from '../model/amenities.enum';
import { Address } from '../model/address.model';

@Injectable()
export class PropertyFactory implements iProperty {
  createProperty(
    id: number,
    name: string,
    propertyType: string,
    amenities: AmenityEnum[],
    address: Address,
    capacity: number,
    rooms: number,
    beds: number,
    bathrooms: number,
    pricePerNight: number,
  ) {
    return new Property(
      id,
      name,
      propertyType,
      amenities,
      address,
      capacity,
      rooms,
      beds,
      bathrooms,
      pricePerNight,
    );
  }
}