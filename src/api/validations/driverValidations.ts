import * as yup from "yup";
import { KENYAN_PHONE_NUMBER_REGEX } from "../../api/utils/constants";
import { locationSchema } from "./rideValidations";

const driverSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  username: yup.string().required(),
  phoneNumber: yup
    .string()
    .matches(
      KENYAN_PHONE_NUMBER_REGEX,
      "Please enter a valid Kenyan phone number"
    )
    .required(),
  location: locationSchema,
  carMake: yup.string().required(),
  carModel: yup.string().required(),
  carDescription: yup.string(),
  licensePlate: yup.string().required(),
});

export default driverSchema;
