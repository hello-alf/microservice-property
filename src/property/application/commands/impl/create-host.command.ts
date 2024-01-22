import { CreateHostDto } from '../../dtos/host.dto';

export class CreateHostCommand {
  constructor(public readonly createHostRequest: CreateHostDto) {}
}
