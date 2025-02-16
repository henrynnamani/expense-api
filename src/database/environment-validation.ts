import Joi from 'joi';

export const environmentValidator = Joi.object({
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_SYNC: Joi.boolean().required(),
  DB_ENTITIES: Joi.array().required(),
  DB_MIGRATIONS: Joi.array().required(),
  DB_SSL: Joi.boolean().required(),
});
