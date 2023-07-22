import test from 'ava';
import request from 'supertest';
import app from '../../app';
import { db } from '../../database/database-config';


test('getAllTasks', async t => {

    const task_to_generate = {
        task_title: 'New task',
        task_description: 'New task description used for test',
        status_id: 1
    };
    const task_generated_1 = await request(app).post('/task').send(task_to_generate);
    const task_generated_2 = await request(app).post('/task').send(task_to_generate);

    const allTasks = await request(app).get('/task');

    t.is(allTasks.status, 200);
    t.truthy(allTasks.body.length >= 2);
    
    // Check all tasks have id 
    allTasks.body.forEach((task: { task_id: number }) => {
        t.truthy(task.task_id);
    });

    await db.query('DELETE FROM task WHERE task_id = $1', [task_generated_1.body.task_id]);
    await db.query('DELETE FROM task WHERE task_id = $1', [task_generated_2.body.task_id]);

});


test('createTask', async t => {
    const task_to_create = {
        task_title: 'New task',
        task_description: 'New task description used for test',
        status_id: 1
    };
    const task_created = await request(app).post('/task').send(task_to_create);

    t.is(task_created.status, 200);
    t.is(task_created.body.task_title, task_to_create.task_title);
    t.is(task_created.body.task_description, task_to_create.task_description);
    t.is(task_created.body.status_id, task_to_create.status_id);

    await db.query('DELETE FROM task WHERE task_id = $1', [task_created.body.task_id]);
});


test('getTaskById', async t => {
    const task_to_generate = {
        task_title: 'New task',
        task_description: 'New task description used for test',
        status_id: 1
    };
    const task_generated = await request(app).post('/task').send(task_to_generate);

    const task = await request(app).get(`/task/${task_generated.body.task_id}`);
    t.is(task.status, 200);
    t.is(task.body.task_id, task_generated.body.task_id);
    t.is(task.body.task_title, task_generated.body.task_title);
    t.is(task.body.task_description, task_generated.body.task_description);
    t.is(task.body.status_id, task_generated.body.status_id);

    await db.query('DELETE FROM task WHERE task_id = $1', [task_generated.body.task_id]);

});


test('updateTask', async t => {
    const task_to_generate = {
        task_title: 'New task',
        task_description: 'New task description used for test',
        status_id: 1
    };
    const task_generated = await request(app).post('/task').send(task_to_generate);


    const task_to_update = {
        task_id: task_generated.body.task_id,
        task_title: 'Updated task',
        task_description: 'Updated task description used for test',
        status_id: 1
    }

    const updated_task = await request(app).put(`/task`).send(task_to_update);

    t.is(updated_task.status, 200);
    t.is(updated_task.body.task_id, task_to_update.task_id);
    t.is(updated_task.body.task_title, task_to_update.task_title);
    t.is(updated_task.body.task_description, task_to_update.task_description);
    t.is(updated_task.body.status_id, task_to_update.status_id);

    await db.query('DELETE FROM task WHERE task_id = $1', [task_to_update.task_id]);

});



test('deleteTaskByID', async t => {
    const task_to_generate = {
        task_title: 'New task',
        task_description: 'New task description used for test',
        status_id: 1
    };
    const task_generated = await request(app).post('/task').send(task_to_generate);


    const task_to_delete = {
        task_id: task_generated.body.task_id
    }

    const deleted_task = await request(app).delete(`/task`).send({ task_id: task_to_delete.task_id });

    t.is(deleted_task.status, 200);
    t.is(deleted_task.body.task_id, task_to_delete.task_id);

});
