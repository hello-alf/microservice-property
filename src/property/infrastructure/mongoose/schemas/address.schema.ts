import { Prop } from '@nestjs/mongoose';

export class AddressModelSchema {
  @Prop({ required: true })
  street: string;

  @Prop({ required: true })
  number: number;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  countryCode: string;

  @Prop({ required: true })
  latitude: number;

  @Prop({ required: true })
  longitude: number;
}
