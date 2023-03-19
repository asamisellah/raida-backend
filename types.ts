export interface User {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface DriverRequest extends User {
  location: Location;
  carMake: string;
  carModel: string;
  carDescription: string;
  licenseNumber: string;
  licensePlate: string;
}

export enum Status {
  SUCCESS = "Success",
  FAILURE = "Failure",
}

export interface ResponseType {
  status: Status;
  message: string;
  [key: string]: any;
}

interface Location {
  address: string;
  longitude: string;
  latitude: string;
}
