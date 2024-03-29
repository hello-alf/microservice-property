import AmenityEnum from '../model/amenities.enum';
import PropertyTypeEnum from '../model/type.enum';
import { Address } from '../model/address.model';
import { Host } from '../model/host.model';

export interface iProperty {
  createProperty(
    id: string,
    name: string,
    description: string,
    propertyType: PropertyTypeEnum,
    amenities: AmenityEnum[],
    address: Address,
    capacity: number,
    rooms: number,
    beds: number,
    bathrooms: number,
    pricePerNight: number,
    host: Host,
  );
}
