import Joi from '@hapi/joi';

// validating signup
export const signupValidateSchema = Joi.object({
  firstName: Joi.string()
    .min(2)
    .max(40)
    .required(),

  lastName: Joi.string()
    .min(2)
    .max(40)
    .required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2
    })
    .required()
    .error(new Error('Invalid Email')),

  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required()
});

export const signinValidateSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required()
    .error(new Error('Invalid Email')),

  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
});

export const createTaskValidateSchema = Joi.object({
  title: Joi.string()
    .min(2)
    .max(100)
    .required()
    .error(new Error('the title is required')),

  description: Joi.string()
    .min(2)
    .required()
    .error(new Error('the description is required')),
});
