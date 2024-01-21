import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { BadRequestException } from '@nestjs/common';

import { UploadPhotoCommand } from '../impl/upload-property.command';
import { PropertyRepository } from '../../../infrastructure/mongoose/repositories/property.repository';
import { S3Service } from '../../../infrastructure/cdn/s3.service';

@CommandHandler(UploadPhotoCommand)
export class UploadPhotoHandler implements ICommandHandler<UploadPhotoCommand> {
  constructor(
    private readonly propertyRepository: PropertyRepository,
    private readonly cdnService: S3Service,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: UploadPhotoCommand) {
    try {
      console.log('command', command);
      const { file, id } = command;

      const property = this.publisher.mergeObjectContext(
        await this.propertyRepository.findByIdModel(id),
      );

      const url = await this.cdnService.uploadFile(file);

      await this.propertyRepository.findOneAndUpdate(id, {
        urls: url['Location'],
      });

      property.commit();

      return property;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
