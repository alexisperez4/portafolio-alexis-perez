import test from 'ava';
import request from 'supertest';
import app from '../../app';
import { db } from '../../database/database-config';
import { verify } from 'jsonwebtoken';

const test_user = {
    user_email: 'test@usercontroller.com',
    user_password: 'testPassword',
    first_name: 'Test First Name',
    last_name: 'Test Last Name',
    role: "admin",
};

test.before(async t => {
    await db.query('DELETE FROM users WHERE user_email = $1', [test_user.user_email]);
});

test.after.always(async t => {
    await db.query('DELETE FROM users WHERE user_email = $1', [test_user.user_email]);
});

test.serial('signUp', async t => {
    const res = await request(app).post('/user/signup').send(test_user);
    t.is(res.status, 200);
    t.is(res.body.message, 'User registred successfully');
});

test.serial('signIn', async t => {
    const res = await request(app).post('/user/signin').send({
        user_email: test_user.user_email,
        user_password: test_user.user_password,
    });

    t.is(res.status, 200);
    t.is(res.body.message, 'Logged in successfully');

    const token = res.body.token;
    const decoded_token: any = verify(token, process.env.JWT_SECRET as string);

    t.is(decoded_token.user_email, test_user.user_email);
    t.is(decoded_token.first_name, test_user.first_name);
    t.is(decoded_token.last_name, test_user.last_name);
    t.is(decoded_token.role, test_user.role);

});

test.serial('signOut', async t => {
    const res = await request(app).post('/user/signout');

    t.is(res.status, 200);
    t.is(res.body.message, 'User signed out successfully');
});
