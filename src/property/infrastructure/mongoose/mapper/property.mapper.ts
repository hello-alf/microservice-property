import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Property } from '../../../domain/model/property.model';
import { Address } from '../../../domain/model/address.model';
import { PropertyModelSchema } from '../schemas/property.schema';
import AmenityEnum from 'src/property/domain/model/amenities.enum';
import { HostModelSchema } from '../schemas/host.schema';
import { Host } from 'src/property/domain/model/host.model';

@Injectable()
export class PropertyMapper {
  constructor(
    @InjectModel(PropertyModelSchema.name)
    private bookingModel: Model<PropertyModelSchema>,
    @InjectModel(HostModelSchema.name)
    private hostModel: Model<HostModelSchema>,
  ) {}

  public mapToDomain(
    propertyDocumentSchema: PropertyModelSchema,
    hostDocumentSchema: HostModelSchema,
  ): Property {
    const newAddress = new Address(
      propertyDocumentSchema.address.street,
      propertyDocumentSchema.address.number,
      propertyDocumentSchema.address.city,
      propertyDocumentSchema.address.countryCode,
      propertyDocumentSchema.address.latitude,
      propertyDocumentSchema.address.longitude,
    );

    const amenities: AmenityEnum[] = propertyDocumentSchema.amenities.map(
      (amenity: string) => AmenityEnum[amenity],
    );

    const actualHost = new Host(
      hostDocumentSchema._id.toString(),
      hostDocumentSchema.name,
      hostDocumentSchema.lastname,
      hostDocumentSchema.city,
      hostDocumentSchema.country,
      hostDocumentSchema.email,
    );

    return new Property(
      propertyDocumentSchema._id.toString(),
      propertyDocumentSchema.name,
      propertyDocumentSchema.description,
      propertyDocumentSchema.propertyType,
      amenities,
      newAddress,
      propertyDocumentSchema.capacity,
      propertyDocumentSchema.rooms,
      propertyDocumentSchema.beds,
      propertyDocumentSchema.bathrooms,
      propertyDocumentSchema.pricePerNight,
      actualHost,
    );
  }

  public mapToEntity(propertyEntity: Property): PropertyModelSchema {
    const propertySchema = new this.bookingModel({
      id: propertyEntity.getId(),
      name: propertyEntity.getName(),
      address: propertyEntity.getAddress(),
      propertyType: propertyEntity.getPropertyType(),
      // city: propertyEntity.getCity(),
      pricePerNight: propertyEntity.getPricePerNight(),
    });
    return propertySchema;
  }
}
