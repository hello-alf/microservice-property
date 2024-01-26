import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetSelectedPropertiesQuery } from '../impl/get-selected-properties.query';
import { PropertyRepository } from '../../../infrastructure/mongoose/repositories/property.repository';

@QueryHandler(GetSelectedPropertiesQuery)
export class GetSelectedPropertiesHandler
  implements IQueryHandler<GetSelectedPropertiesQuery>
{
  constructor(private readonly repository: PropertyRepository) {}

  async execute(query: GetSelectedPropertiesQuery) {
    return this.repository.findAllSelected(query.ids);
  }
}
