import Yup from "yup";
import { MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH } from "./constant";

export default function getValidationSchema(values) {
  return Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email!")
      .required("E-mail is required!"),
    password: Yup.string()
      .min(
        MIN_PASSWORD_LENGTH,
        `Password has to be longer than ${MIN_PASSWORD_LENGTH} characters!`
      )
      .max(
        MAX_PASSWORD_LENGTH,
        `Password should not exceed ${MAX_PASSWORD_LENGTH} characters!`
      )
      .required("Password is required!"),
    passwordConfirmation: Yup.string()
      .oneOf([values.password], "Please make sure the passwords match")
      .required("Password confirmation is required!"),
    consent: Yup.bool()
      .test(
        "consent",
        "You have to agree with our Terms and Conditions!",
        value => value === true
      )
      .required("You have to agree with our Terms and Conditions!")
  });
}
