import test from 'ava';
import request, { SuperTest, Test } from 'supertest';
import app from '../../app';
import { db } from '../../database/database-config';

const testUser = {
    user_email: 'test@taskscontroller.com',
    user_password: 'testPassword',
    first_name: 'Test First Name',
    last_name: 'Test Last Name',
    role: "admin",
};


let agent: SuperTest<Test>;

test.before(async t => {
    agent = request.agent(app);

    await agent.post('/user/signup').send(testUser);
    
    await agent.post('/user/signin').send({
        user_email: testUser.user_email,
        user_password: testUser.user_password,
    });

});

test.after.always(async t => {
    await db.query('DELETE FROM users WHERE user_email = $1', [testUser.user_email]);
    await agent.post('/user/signout');
});

test('getAllTasks', async t => {
    const taskToGenerate = {
        task_title: 'New task',
        task_description: 'Task description used for test',
        task_status: "done"
    };

    const task_generated_1 = await agent.post('/task').send(taskToGenerate);
    const task_generated_2 = await agent.post('/task').send(taskToGenerate);

    const allTasks = await agent.get('/task');

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
        task_status: 'to_do'
    };
    const task_created = await agent.post('/task').send(task_to_create);

    t.is(task_created.status, 200);
    t.is(task_created.body.task_title, task_to_create.task_title);
    t.is(task_created.body.task_description, task_to_create.task_description);
    t.is(task_created.body.task_status, task_to_create.task_status);

    await db.query('DELETE FROM task WHERE task_id = $1', [task_created.body.task_id]);
});


test('getTaskById', async t => {
    const taskToGenerate = {
        task_title: 'New task',
        task_description: 'New task description used for test',
        task_status: 'to_do'
    };
    const task_generated = await agent.post('/task').send(taskToGenerate);

    const task = await agent.get(`/task/${task_generated.body.task_id}`);
    t.is(task.status, 200);
    t.is(task.body.task_id, task_generated.body.task_id);
    t.is(task.body.task_title, task_generated.body.task_title);
    t.is(task.body.task_description, task_generated.body.task_description);
    t.is(task.body.task_status, task_generated.body.task_status);

    await db.query('DELETE FROM task WHERE task_id = $1', [task_generated.body.task_id]);

});


test('updateTask', async t => {
    const taskToGenerate = {
        task_title: 'New task',
        task_description: 'New task description used for test',
        task_status: 'to_do'
    };
    const task_generated = await agent.post('/task').send(taskToGenerate);


    const task_to_update = {
        task_title: 'Updated task',
        task_description: 'Updated task description used for test',
        task_status: 'to_do'
    }

    const updated_task = await agent.put(`/task/${task_generated.body.task_id}`).send(task_to_update);

    t.is(updated_task.status, 200);
    t.is(updated_task.body.task_id, task_generated.body.task_id);
    t.is(updated_task.body.task_title, task_to_update.task_title);
    t.is(updated_task.body.task_description, task_to_update.task_description);
    t.is(updated_task.body.task_status, task_to_update.task_status);

    await db.query('DELETE FROM task WHERE task_id = $1', [task_generated.body.task_id]);

});



test('deleteTaskByID', async t => {
    const taskToGenerate = {
        task_title: 'New task',
        task_description: 'New task description used for test',
        task_status: 'to_do'
    };
    const task_generated = await agent.post('/task').send(taskToGenerate);

    const task_to_delete = {
        task_id: task_generated.body.task_id
    }

    const deleted_task = await agent.delete(`/task/${task_to_delete.task_id}`);

    t.is(deleted_task.status, 200);
    t.is(deleted_task.body.task_id, task_to_delete.task_id);

});
