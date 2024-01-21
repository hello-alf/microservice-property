export class GetPropertiesQuery {
  filter: Record<string, any>;
  constructor(filter?: Record<string, any>) {
    this.filter = filter;
  }
}
