import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Property } from '../../../domain/model/property.model';
import { Address } from '../../../domain/model/address.model';
import { PropertyModelSchema } from '../schemas/property.schema';
import AmenityEnum from 'src/property/domain/model/amenities.enum';

@Injectable()
export class PropertyMapper {
  constructor(
    @InjectModel(PropertyModelSchema.name)
    private bookingModel: Model<PropertyModelSchema>,
  ) {}

  public mapToDomain(propertyDocumentSchema: PropertyModelSchema): Property {
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

    return new Property(
      propertyDocumentSchema._id.toString(),
      propertyDocumentSchema.name,
      propertyDocumentSchema.propertyType,
      amenities,
      newAddress,
      propertyDocumentSchema.capacity,
      propertyDocumentSchema.rooms,
      propertyDocumentSchema.beds,
      propertyDocumentSchema.bathrooms,
      propertyDocumentSchema.pricePerNight,
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
