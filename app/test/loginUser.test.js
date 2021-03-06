var app = require('../server');
const request = require('supertest');
const agent = request.agent(app);

describe('Login user', function(){
    it('Login first', function(done){
        agent
        .post('/api/user/login')
        .send({username:'username', password:'Password1234'})
        .expect(200)
        .expect({"message": "You are now logged in."}, done);
    });
    
    it('Logout then', function(done){
        agent
        .get('/api/user/logout')
        .expect({"message":"You are now logged out."}, done);
    });

    it('Login validation (wrong username account)', function(done){
        agent
        .post('/api/user/login')
        .send({username:'usernamee', password:'password1234'})
        .expect(400)
        .expect(['Wrong credentials.'], done);
    });

    it('Login validation (wrong password account)', function(done){
        agent
        .post('/api/user/login')
        .send({username:'username', password:'1234password'})
        .expect(400)
        .expect(['Wrong credentials.'], done);
    });

    it('Login validation (empty string)', function(done){
        agent
        .post('/api/user/login')
        .send({username:'', password:''})
        .expect(400)
        .expect(['Wrong credentials.'], done);
    });

    it('Login validation (null)', function(done){
        agent
        .post('/api/user/login')
        .send({username:null, password:null})
        .expect(400)
        .expect(['Wrong credentials.'], done);
    });
});