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
      description: property.getDescription(),
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

  addPhoto = (id: string): Promise<PropertyModelSchema> => {
    const objectId = new ObjectId(id);
    const actualPoperty = this.propertyModel.findById(objectId).exec();

    console.log('actualPoperty', actualPoperty);

    console.log('adicionar foto al id: ', id);

    return actualPoperty;
  };

  findByIdModel = async (id: string): Promise<Property> => {
    const objectId = new ObjectId(id);
    const property = await this.propertyModel.findById(objectId).exec();

    return this.propertyMapper.mapToDomain(property);
  };

  findById = (id: string): Promise<PropertyModelSchema> => {
    const objectId = new ObjectId(id);
    return this.propertyModel.findById(objectId).exec();
  };

  findAll = (): Promise<PropertyModelSchema[]> => {
    return this.propertyModel
      .find()
      .select({
        _id: 1,
        name: 1,
        description: 1,
        pricePerNight: 1,
        'address.street': 1,
        'address.number': 1,
        'address.city': 1,
        'address.countryCode': 1,
      })
      .exec();
  };
}
