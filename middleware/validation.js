const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('client', 'provider', 'admin')
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const availabilitySchema = Joi.object({
  slots: Joi.array().items(
    Joi.object({
      start: Joi.date().iso().required(),
      end: Joi.date().iso().greater(Joi.ref('start')).required()
    })
  ).min(1).required()
});

const bookingSchema = Joi.object({
  providerId: Joi.string().hex().length(24).required(),
  start: Joi.date().iso().required(),
  end: Joi.date().iso().greater(Joi.ref('start')).required()
});

module.exports = {
  registerSchema,
  loginSchema,
  availabilitySchema,
  bookingSchema
};