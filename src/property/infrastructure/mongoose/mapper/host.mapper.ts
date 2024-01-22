import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Host } from '../../../domain/model/host.model';
import { HostModelSchema } from '../schemas/host.schema';

@Injectable()
export class HostMapper {
  constructor(
    @InjectModel(HostModelSchema.name)
    private hostModel: Model<HostModelSchema>,
  ) {}

  public mapToDomain(hostDocumentSchema: HostModelSchema): Host {
    return new Host(
      hostDocumentSchema._id.toString(),
      hostDocumentSchema.name,
      hostDocumentSchema.lastname,
      hostDocumentSchema.city,
      hostDocumentSchema.country,
      hostDocumentSchema.email,
    );
  }
}
