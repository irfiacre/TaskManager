import { signupValidateSchema, signinValidateSchema, createTaskValidateSchema } from '../helpers/validateSchema';

// validate signup
export const validateSignupData = (req, res, next) => {
  const {
    firstName, lastName, email, password,
  } = req.body;
  const { error } = signupValidateSchema.validate({
    firstName,
    lastName,
    email,
    password,
  });

  if (error) {
    res.status(400).json({
      status: res.statusCode,
      error: error.message,
    });
  } else next();
};


export const validateSignin = (req, res, next) => {
  const { email, password } = req.body;
  const { error } = signinValidateSchema.validate({
    email,
    password,
  });

  if (error) {
    if (error.message.includes('email')) {
      return res.status(400).json({
        status: 400,
        error: `${error.message.replace('/', '').replace(/"/g, '')},` + ' example: xxx@yyy.zzz ',
        path: error.details[0].path[0],
      });
    }
    res.status(400).json({
      status: res.statusCode,
      error: error.message.replace('/', '').replace(/"/g, ''),
      path: error.details[0].path[0],
    });
  } else next();
};

export const validateCreateTask = (req, res, next) => {
  const { title, description } = req.body;
  const { error } = createTaskValidateSchema.validate({
    title,
    description,
  });

  if (error) {
    res.status(400).json({
      status: res.statusCode,
      error: error.message,
    });
  } else next();
};
