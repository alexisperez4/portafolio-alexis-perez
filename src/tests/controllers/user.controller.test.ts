import test from 'ava';
import request from 'supertest';
import app from '../../app';
import { db } from '../../database/database-config';
import { verify } from 'jsonwebtoken';

const testUser = {
    user_email: 'test@usercontroller.com',
    user_password: 'testPassword',
    first_name: 'Test First Name',
    last_name: 'Test Last Name',
    role: "admin",
};

test.before(async t => {
    try {
        await db.query('DELETE FROM users WHERE user_email = $1', [testUser.user_email]);
    } catch (err) {
        console.error('Error while preparing the test: ', err);
        throw err;
    }
});

test.after.always(async t => {
    try {
        await db.query('DELETE FROM users WHERE user_email = $1', [testUser.user_email]);
    } catch (err) {
        console.error('Error while cleaning up after the test: ', err);
        throw err;
    }
});


test.serial('signUp', async t => {
    const res = await request(app).post('/user/signup').send(testUser);
    t.is(res.status, 302);
    t.is(res.headers.location, '/');
});

test.serial('signIn', async t => {
    const res = await request(app).post('/user/signin').send({
        user_email: testUser.user_email,
        user_password: testUser.user_password,
    });

    t.is(res.status, 302);
    t.is(res.headers.location, '/');
});

test.serial('signOut', async t => {
    const res = await request(app).post('/user/signout');

    t.is(res.status, 302);
    t.is(res.headers.location, '/');
});
