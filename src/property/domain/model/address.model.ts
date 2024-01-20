export class Address {
  private street: string;
  private number: number;
  private city: string;
  private countryCode: string;
  private latitude: number;
  private longitude: number;

  constructor(
    street: string,
    number: number,
    city: string,
    countryCode: string,
    latitude: number,
    longitude: number,
  ) {
    this.street = street;
    this.number = number;
    this.city = city;
    this.countryCode = countryCode;
    this.latitude = latitude;
    this.longitude = longitude;
  }

  public getStreet(): string {
    return this.street;
  }

  public setStreet(value: string) {
    this.street = value;
  }

  public getNumber(): number {
    return this.number;
  }

  public setNumber(value: number) {
    this.number = value;
  }

  public getCity(): string {
    return this.city;
  }

  public setCity(value: string) {
    this.city = value;
  }

  public getCountryCode(): string {
    return this.countryCode;
  }

  public setCountryCode(value: string) {
    this.countryCode = value;
  }

  public getLatitude(): number {
    return this.latitude;
  }

  public setLatitude(value: number) {
    this.latitude = value;
  }

  public getLongitude(): number {
    return this.longitude;
  }

  public setLongitude(value: number) {
    this.longitude = value;
  }
}
