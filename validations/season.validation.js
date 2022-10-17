import Joi from "joi";

const schema = {
    add: {
        body: Joi.object().keys({
            series_id: Joi.string().required(),
            name: Joi.string().required(),
            description: Joi.string().required()
        })
    },

    update: {
        body: Joi.object().keys({
            name: Joi.string().required()
        })
    }
};

export default schema;
