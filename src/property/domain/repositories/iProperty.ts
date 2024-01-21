export interface iPropertyRepository {
  save: (property: any) => any;

  findById: (id: string) => Promise<any | null>;

  findAll: (criteria?: any) => Promise<any[]>;

  findOneAndUpdate: (id: string, payload: any) => Promise<any>;
}
