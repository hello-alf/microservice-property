import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPropertyQuery } from '../impl/get-property.query';
import { PropertyRepository } from '../../../infrastructure/mongoose/repositories/property.repository';

@QueryHandler(GetPropertyQuery)
export class GetPropertyHandler implements IQueryHandler<GetPropertyQuery> {
  constructor(private readonly repository: PropertyRepository) {}

  async execute(query: GetPropertyQuery) {
    console.log('query', query);
    return this.repository.findById(query.id);
  }
}
