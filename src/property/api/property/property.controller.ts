import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { CreatePropertyDto } from '../../application/dtos/property.dto';
import { CreatePropertyCommand } from '../../application/commands/impl/create-property.command';
import { GetPropertiesQuery } from '../../application/queries/impl/get-properties.query';
import { GetPropertyQuery } from '../../application/queries/impl/get-property.query';

@ApiTags('property')
@Controller('property')
export class PropertyController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('/')
  findAll() {
    return this.queryBus.execute(new GetPropertiesQuery());
  }

  @Get('/:id')
  findOne(@Param('id') id: string): Promise<GetPropertyQuery> {
    return this.queryBus.execute(new GetPropertyQuery(id));
  }

  @Post()
  create(@Body() payload: CreatePropertyDto) {
    return this.commandBus.execute(new CreatePropertyCommand(payload));
  }
}
