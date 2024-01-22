import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateHostCommand } from '../../application/commands/impl/create-host.command';
import { CreateHostDto } from '../../application/dtos/host.dto';

@Injectable()
export class HostService {
  constructor(private readonly commandBus: CommandBus) {}

  @RabbitSubscribe({
    exchange: 'user-service:host-created',
    routingKey: '',
    queue: 'properties:host',
  })
  public async pubSubHandler(msg: any) {
    console.log(msg);
    console.log(msg.id);

    const createPropertyDto: CreateHostDto = {
      _id: msg._id,
      name: msg.name,
      lastname: msg.lastname,
      country: msg.country,
      city: msg.city,
      email: msg.email,
    };

    await this.commandBus.execute(new CreateHostCommand(createPropertyDto));
  }
}
