import Joi from "joi";

export const signupSchema = Joi.object({
    user_email: Joi.string().email().required(),
    user_password: Joi.string().min(8).required(),
    first_name: Joi.string().min(1).required(),
    last_name: Joi.string().min(1).required(),
    role: Joi.string().optional(),
});
