export interface User {
  name: string;
  email: string;
  password: string;
  username: string;
  phoneNumber: string;
}

export interface Driver extends User {
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
  longitude: number;
  latitude: number;
}

export interface Ride {
  pickup: Location;
  destination: Location;
  passangerId: string;
}
