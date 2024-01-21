import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPropertyQuery } from '../impl/get-property.query';
import { PropertyRepository } from '../../../infrastructure/mongoose/repositories/property.repository';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetPropertyQuery)
export class GetPropertyHandler implements IQueryHandler<GetPropertyQuery> {
  constructor(private readonly repository: PropertyRepository) {}

  async execute(query: GetPropertyQuery) {
    try {
      return this.repository.findById(query.id);
    } catch (error) {
      throw new NotFoundException(`Hotel with ID ${query.id} not found`);
    }
  }
}
