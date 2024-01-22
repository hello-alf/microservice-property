import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

import { HostModelSchema } from '../schemas/host.schema';
import { iHostRepository } from '../../../domain/repositories/iHost';
import { HostMapper } from '../mapper/host.mapper';
import { Host } from '../../../domain/model/host.model';

@Injectable()
export class HostRepository implements iHostRepository {
  constructor(
    @InjectModel(HostModelSchema.name)
    private readonly hostModel: Model<HostModelSchema>,
    private readonly hostMapper: HostMapper,
  ) {}

  save = (host: Host): Host => {
    const newHost = new this.hostModel({
      _id: new ObjectId(host.getId()),
      name: host.getName(),
      lastname: host.getLastname(),
      city: host.getCity(),
      country: host.getCountry(),
      email: host.getEmail(),
    });

    newHost.save();

    return this.hostMapper.mapToDomain(newHost);
  };

  findById = async (id: string): Promise<Host> => {
    const objectId = new ObjectId(id);
    const actualHost = await this.hostModel.findById(objectId).exec();

    return this.hostMapper.mapToDomain(actualHost);
  };
}
