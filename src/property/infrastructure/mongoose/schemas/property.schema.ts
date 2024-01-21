import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IdentifiableEntitySchema } from '../../database/identifiable-entity.schema';
import { AddressModelSchema } from './address.schema';

@Schema({ collection: 'properties' })
export class PropertyModelSchema extends IdentifiableEntitySchema {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  propertyType: string;

  @Prop({ required: true })
  amenities: string[];

  @Prop({ required: true })
  address: AddressModelSchema;

  @Prop({ required: true })
  capacity: number;

  @Prop({ required: true })
  rooms: number;

  @Prop({ required: true })
  beds: number;

  @Prop({ required: true })
  bathrooms: number;

  @Prop({ required: true })
  pricePerNight: number;
}

export const PropertySchema = SchemaFactory.createForClass(PropertyModelSchema);
