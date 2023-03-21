import * as yup from "yup";
import { KENYAN_PHONE_NUMBER_REGEX } from "../../api/utils/constants";

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
  location: yup.object().shape({
    longitude: yup.string().required(),
    latitude: yup.string().required(),
  }),
  carMake: yup.string().required(),
  carModel: yup.string().required(),
  carDescription: yup.string(),
  licenseNumber: yup.string().required(),
  licensePlate: yup.string().required(),
});

export default driverSchema;
