import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

import { PropertyModelSchema } from '../schemas/property.schema';
import { iPropertyRepository } from '../../../domain/repositories/iProperty';
import { Property } from '../../../domain/model/property.model';
import { PropertyMapper } from '../mapper/property.mapper';
import { Host } from '../../../domain/model/host.model';
import { HostModelSchema } from '../schemas/host.schema';

@Injectable()
export class PropertyRepository implements iPropertyRepository {
  constructor(
    @InjectModel(PropertyModelSchema.name)
    private readonly propertyModel: Model<PropertyModelSchema>,
    private readonly propertyMapper: PropertyMapper,
    @InjectModel(HostModelSchema.name)
    private readonly hostModel: Model<HostModelSchema>,
  ) {}

  save = (property: Property, host: Host): Property => {
    const newHost = new this.hostModel({
      _id: new ObjectId(host.getId()),
      name: host.getName(),
      lastname: host.getLastname(),
      city: host.getCity(),
      country: host.getCountry(),
      email: host.getEmail(),
    });

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
      host: newHost,
    });

    newProperty.save();

    return this.propertyMapper.mapToDomain(newProperty, newHost);
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

    const objectHostId = new ObjectId(property.host._id);
    const host = await this.hostModel.findById(objectHostId).exec();

    return this.propertyMapper.mapToDomain(property, host);
  };

  findById = (id: string): Promise<PropertyModelSchema> => {
    const objectId = new ObjectId(id);
    return this.propertyModel.findById(objectId).populate('host').exec();
  };

  findAll = (criteria?: any): Promise<PropertyModelSchema[]> => {
    let filter = {};

    if (criteria !== undefined) {
      const query = new RegExp(criteria, 'i');
      filter = {
        $or: [
          { name: query },
          { description: query },
          { 'address.street': query },
          { 'address.city': query },
        ],
      };
    }

    return this.propertyModel
      .find(filter)
      .populate('host')
      .select({
        _id: 1,
        name: 1,
        description: 1,
        pricePerNight: 1,
        urls: 1,
        'address.street': 1,
        'address.number': 1,
        'address.city': 1,
        'address.countryCode': 1,
      })
      .exec();
  };

  findOneAndUpdate = async (id: string, payload: any): Promise<Property> => {
    const objectId = new ObjectId(id);

    console.log('objectId', objectId);
    console.log('payload', payload);

    const property = await this.propertyModel
      .findOneAndUpdate({ _id: objectId }, { $set: payload }, { new: true })
      .exec();

    const objectHostId = new ObjectId(property.host._id);
    const host = await this.hostModel.findById(objectHostId).exec();

    return this.propertyMapper.mapToDomain(property, host);
  };
}
