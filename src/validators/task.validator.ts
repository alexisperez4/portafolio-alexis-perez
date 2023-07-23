import Joi from 'joi';

export const createtaskSchema = Joi.object({
  task_title: Joi.string().min(2).max(45).required(),
  task_description: Joi.string().max(500).required(),
  task_status: Joi.string().valid('to_do', 'in_progress', 'done').required(),
});

export const updateTaskSchema = Joi.object({
  task_title: Joi.string().min(2).max(45).required(),
  task_description: Joi.string().max(500).required(),
  task_status: Joi.string().valid('to_do', 'in_progress', 'done').required(),
});

export const taskIdSchema = Joi.object({
  task_id: Joi.number().required(),
});
