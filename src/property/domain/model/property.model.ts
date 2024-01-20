import { AggregateRoot } from '@nestjs/cqrs';
import { PositiveValue } from '../../../shared-kernel/valueObjects/positiveValue';
import { Amenity } from './amenities.model';
import AmenityEnum from './amenities.enum';
import PropertyTypeEnum from './type.enum';
import { Address } from './address.model';

export class Property extends AggregateRoot {
  private id: PositiveValue;
  private name: string;
  private address: Address;
  private propertyType: string;
  private pricePerNight: PositiveValue;
  private amenities: AmenityEnum[];
  private capacity: PositiveValue;
  private rooms: PositiveValue;
  private beds: PositiveValue;
  private bathrooms: number;

  constructor(
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
    super();
    this.id = new PositiveValue(id);
    this.name = name;
    this.address = address;
    this.propertyType = propertyType;
    this.amenities = amenities;
    this.capacity = new PositiveValue(capacity);
    this.rooms = new PositiveValue(rooms);
    this.beds = new PositiveValue(beds);
    this.bathrooms = bathrooms;
    this.pricePerNight = new PositiveValue(pricePerNight);
  }

  public getId(): PositiveValue {
    return this.id;
  }

  public setId(value: PositiveValue) {
    this.id = value;
  }

  public getName(): string {
    return this.name;
  }

  public setName(value: string) {
    this.name = value;
  }

  public getPropertyType(): string {
    return this.propertyType;
  }

  public setAmennities(value: AmenityEnum[]) {
    this.amenities = value;
  }

  public getAmenities(): AmenityEnum[] {
    return this.amenities;
  }

  public getPricePerNight(): PositiveValue {
    return this.pricePerNight;
  }

  public getAddress(): Address {
    return this.address;
  }

  public setAddress(value: Address) {
    this.address = value;
  }

  public getCapacity(): PositiveValue {
    return this.capacity;
  }

  public setCapacity(value: PositiveValue) {
    this.capacity = value;
  }

  public getRooms(): PositiveValue {
    return this.rooms;
  }

  public setRooms(value: PositiveValue) {
    this.rooms = value;
  }

  public getBeds(): PositiveValue {
    return this.beds;
  }

  public setBeds(value: PositiveValue) {
    this.beds = value;
  }

  public getBathrooms(): number {
    return this.bathrooms;
  }

  public setBathrooms(value: number) {
    this.bathrooms = value;
  }

  public setPricePerNight(value: PositiveValue) {
    this.pricePerNight = value;
  }
}
