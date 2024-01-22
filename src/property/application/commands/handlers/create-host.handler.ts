import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { BadRequestException } from '@nestjs/common';

import { CreateHostCommand } from '../impl/create-host.command';
import { HostRepository } from '../../../infrastructure/mongoose/repositories/host.repository';
import { HostFactory } from '../../../domain/factories/host.factory';

@CommandHandler(CreateHostCommand)
export class CreateHostHandler implements ICommandHandler<CreateHostCommand> {
  constructor(
    private readonly hostRepository: HostRepository,
    private readonly publisher: EventPublisher,
    private readonly hostFactory: HostFactory,
  ) {}

  async execute(command: CreateHostCommand) {
    try {
      const { createHostRequest } = command;
      const hostObject = this.hostFactory.createHost(
        createHostRequest._id,
        createHostRequest.name,
        createHostRequest.lastname,
        createHostRequest.city,
        createHostRequest.country,
        createHostRequest.email,
      );

      const host = this.publisher.mergeObjectContext(
        this.hostRepository.save(hostObject),
      );

      host.commit();

      return host;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
