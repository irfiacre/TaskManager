import { signupValidateSchema } from '../helpers/validateSchema';

// validate signup
export const validateSignupData = (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  const { error } = signupValidateSchema.validate({
    firstName,
    lastName,
    email,
    password
  });

  if (error) {
    res.status(400).json({
      status: res.statusCode,
      error: error.message
    });
  } else next();
};
