import { Injectable } from '@nestjs/common';
import { iHost } from './iHost';
import { Host } from '../model/host.model';

@Injectable()
export class HostFactory implements iHost {
  createHost(
    _id: string,
    name: string,
    lastname: string,
    city: string,
    country: string,
    email: string,
  ) {
    return new Host(_id, name, lastname, city, country, email);
  }
}
