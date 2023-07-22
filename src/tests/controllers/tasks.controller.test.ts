import test from 'ava';
import request from 'supertest';
import app from '../../app';
import { db } from '../../database/database-config';


test('getAllTasks', async t => {
    const response = await request(app).get('/task');
    
    t.is(response.status, 200);
    t.true(Array.isArray(response.body));
    
    // Check that each task has a task_id
    response.body.forEach((task: { task_id: number }) => {
        t.truthy(task.task_id);
    });
});

test('createTask', async t => {
    const newTask = {
        task_title: 'Test task',
        task_description: 'This is a test to create a task',
        status_id: 1
    };

    const response = await request(app).post('/task').send(newTask);

    t.is(response.status, 200);
    t.is(response.body.task_title, newTask.task_title);
    t.is(response.body.task_description, newTask.task_description);
    t.is(response.body.status_id, newTask.status_id);

    await db.query('DELETE FROM task WHERE task_id = $1', [response.body.task_id]);
});


test('getTaskByID', async t => {
    const response = await request(app).get('/task/1');
    t.is(response.status, 200);
    t.truthy(response.body.task_id);
});
