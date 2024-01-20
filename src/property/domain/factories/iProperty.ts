import AmenityEnum from '../model/amenities.enum';
import PropertyTypeEnum from '../model/type.enum';
import { Address } from '../model/address.model';

export interface iProperty {
  createProperty(
    id: number,
    name: string,
    propertyType: PropertyTypeEnum,
    amenities: AmenityEnum[],
    address: Address,
    capacity: number,
    rooms: number,
    beds: number,
    bathrooms: number,
    pricePerNight: number,
  );
}
