import * as yup from "yup";
import { KENYAN_PHONE_NUMBER_REGEX } from "../utils/constants";

const userSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  username: yup.string().required(),
  phoneNumber: yup
    .string()
    .matches(
      KENYAN_PHONE_NUMBER_REGEX,
      "Please enter a valid Kenyan phone number"
    )
    .required(),
});

export default userSchema;
