import Joi from "joi";

const schema = {
  add: {
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required()
    }),
  },
};

export default schema;
