var app = require('../server');
const request = require('supertest');
const agent = request.agent(app);

describe('Register user', function(){
    it ('Register a user', function(done){
        agent
        .post('/api/user/register')
        .send({username:'username2', password:'Password123', repeat_password:'Password123'})
        .expect(200)
        .expect({"message": "User registered."}, done);
    });

    it ('Double entry', function(done){
        agent
        .post('/api/user/register')
        .send({username:'username2', password:'Password123', repeat_password:'Password123'})
        .expect(400)
        .expect(['Username already exists.'], done);
    });

    it ('Empty fields validation', function(done){
        agent
        .post('/api/user/register')
        .send({username:'', password:'', repeat_password:''})
        .expect(400)
        .expect(function(res){
            if (res.body.includes('Username is required.')===false) throw new Error('Test case has failed.');
            if (res.body.includes('Password is required.')===false) throw new Error('Test case has failed.');
        }).end(done);
    });

    it ('Incomplete fields validation', function(done){
        agent
        .post('/api/user/register')
        .send({username:'usernm', password:'Pas123', repeat_password:'Pas123'})
        .expect(400)
        .expect(function(res){
            if (res.body.includes('Username must be more than 8 characters.')===false) throw new Error('Test case has failed.');
            if (res.body.includes('Password must be more than 8 characters.')===false) throw new Error('Test case has failed.');
        }).end(done);
    });

    it ('Password validation', function(done){
        agent
        .post('/api/user/register')
        .send({username:'username3', password:'password123', repeat_password:'password123'})
        .expect(400)
        .expect(['Password must have a capital letter and a number.'], done);
    });

    it ('Password validation 2', function(done){
        agent
        .post('/api/user/register')
        .send({username:'username3', password:'passwordstrong', repeat_password:'passwordstrong'})
        .expect(400)
        .expect(['Password must have a capital letter and a number.'], done);
    });
});