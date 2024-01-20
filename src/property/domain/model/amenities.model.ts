import AmenityEnum from './amenities.enum';

export class Amenity {
  private amenity: [AmenityEnum];

  constructor(amenity: [AmenityEnum]) {
    this.amenity = amenity;
  }
}
