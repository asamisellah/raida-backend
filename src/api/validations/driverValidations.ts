import * as yup from "yup";
import {
  KENYAN_LICENSE_PLATE_REGEX,
  KENYAN_PHONE_NUMBER_REGEX,
} from "../../api/utils/constants";
import { locationSchema } from "./rideValidations";

const driverSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  username: yup.string().required(),
  phoneNumber: yup
    .string()
    .matches(KENYAN_PHONE_NUMBER_REGEX, "Ivalid Kenyan phone number")
    .required(),
  location: locationSchema,
  carMake: yup.string().required(),
  carModel: yup.string().required(),
  carDescription: yup.string(),
  licensePlate: yup
    .string()
    .matches(KENYAN_LICENSE_PLATE_REGEX, "Invalid Kenyan license plate")
    .required(),
});

export default driverSchema;
