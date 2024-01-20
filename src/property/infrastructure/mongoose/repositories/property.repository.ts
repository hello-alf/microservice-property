import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

import { PropertyModelSchema } from '../schemas/property.schema';
import { iPropertyRepository } from '../../../domain/repositories/iProperty';
import { Property } from '../../../domain/model/property.model';
import { PropertyMapper } from '../mapper/property.mapper';

@Injectable()
export class PropertyRepository implements iPropertyRepository {
  constructor(
    @InjectModel(PropertyModelSchema.name)
    private readonly propertyModel: Model<PropertyModelSchema>,
    private readonly propertyMapper: PropertyMapper,
  ) {}

  save = (property: Property): Property => {
    const newProperty = new this.propertyModel({
      _id: new ObjectId(),
      name: property.getName(),
      address: {
        street: property.getAddress().getStreet(),
        number: property.getAddress().getNumber(),
        city: property.getAddress().getCity(),
        countryCode: property.getAddress().getCountryCode(),
        latitude: property.getAddress().getLatitude(),
        longitude: property.getAddress().getLongitude(),
      },
      propertyType: property.getPropertyType(),
      amenities: property.getAmenities(),
      capacity: property.getCapacity().getValue(),
      rooms: property.getRooms().getValue(),
      beds: property.getBeds().getValue(),
      bathrooms: property.getBathrooms(),
      pricePerNight: property.getPricePerNight().getValue(),
    });

    newProperty.save();

    return this.propertyMapper.mapToDomain(newProperty);
  };

  findById = (id: string): Promise<PropertyModelSchema> => {
    const objectId = new ObjectId(id);
    return this.propertyModel.findById(objectId).exec();
  };

  findAll = (): Promise<PropertyModelSchema[]> => {
    return this.propertyModel.find().exec();
  };
}
