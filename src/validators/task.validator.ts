import Joi from 'joi';

export const createtaskSchema = Joi.object({
  task_title: Joi.string().min(2).max(45).required(),
  task_description: Joi.string().max(500).required(),
  status_id: Joi.number().required(),
});

export const updateTaskSchema = Joi.object({
    task_id: Joi.number().required(),
    task_title: Joi.string().min(2).max(45).required(),
    task_description: Joi.string().max(500).required(),
    status_id: Joi.number().required(),
});

export const taskIdSchema = Joi.object({
    task_id: Joi.number().required(),
});
