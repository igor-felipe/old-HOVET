import { z } from "zod";

const passwordValidation = z
  .string()
  .regex(/^\S+$/, { message: "Password must not contain Whitespaces." })
  .regex(/^.{8,10}$/, { message: "Password must be 8-10 Characters Long." })
  .regex(/^(?=.*[A-Z])/, {
    message: "Password must have at least one Uppercase Character.",
  })
  .regex(/^(?=.*[a-z])/, {
    message: "Password must have at least one Lowercase Character.",
  })
  .regex(/^(?=.*[0-9])/, {
    message: "Password must contain at least one Digit.",
  })
  .regex(/^(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹])/, {
    message: "Password must contain at least one Special Symbol.",
  });

export default passwordValidation;
