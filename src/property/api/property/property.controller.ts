import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  UseInterceptors,
  UploadedFiles,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { CreatePropertyDto } from '../../application/dtos/property.dto';
import { CreatePropertyCommand } from '../../application/commands/impl/create-property.command';
import { UploadPhotoCommand } from '../../application/commands/impl/upload-property.command';
import { GetPropertiesQuery } from '../../application/queries/impl/get-properties.query';
import { GetPropertyQuery } from '../../application/queries/impl/get-property.query';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@ApiTags('property')
@Controller('property')
export class PropertyController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('/')
  findAll(@Query() query) {
    return this.queryBus.execute(new GetPropertiesQuery(query?.filter));
  }

  @Post('/')
  create(@Body() payload: CreatePropertyDto) {
    return this.commandBus.execute(new CreatePropertyCommand(payload));
  }

  @Post('/upload-photo/:id')
  @UseInterceptors(AnyFilesInterceptor())
  addPhoto(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('id') id: string,
  ) {
    return this.commandBus.execute(new UploadPhotoCommand(files, id));
  }

  @Get('/:id')
  findOne(@Param('id') id: string): Promise<GetPropertyQuery> {
    return this.queryBus.execute(new GetPropertyQuery(id));
  }
}
