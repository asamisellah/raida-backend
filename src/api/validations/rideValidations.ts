import * as yup from "yup";

const locationSchema = yup.object().shape({
  longitude: yup.number().required(),
  latitude: yup.number().required(),
});

const rideSchema = yup.object().shape({
  userId: yup.string().required(),
  pickup: locationSchema.required(),
  destination: locationSchema.required(),
});

export default rideSchema;
