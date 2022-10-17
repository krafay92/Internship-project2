import Joi from "joi";

const schema = {
  add: {
    body: Joi.object().keys({
      user_id: Joi.string().required(),
      episode_id: Joi.string().required(),
      time: Joi.number().required()
    }),
  },

  update: {
    body: Joi.object().keys({
      time: Joi.number().required(),
      user_id: Joi.string().required()
    })
  }
};

export default schema;
