var app = require('../testServer');
const request = require('supertest');
const Type = require('../models/type');
const Animal = require('../models/animal');
const Status = require('../models/status');
const agent = request.agent(app);

describe('No data', function(){
    before(async function () {
        await Animal.deleteMany();
        await Type.deleteMany();
        await Status.deleteMany();
    });
    
    it('Login first', function(done){
        agent
        .post('/api/user/login')
        .send({username:'username', password:'Password123'})
        .expect(200)
        .expect({"message": "You are now logged in."}, done);
    });

    it('Get animals no data', function(done){
        agent
        .get(`/api/animal/?page=2`)
        .expect(200)
        .expect(function(res){
            if (res.body.results.message != 'No data.') throw new Error ('Should be "No data."');
        }).end(done);
    });

    it('Get types no data', function(done){
        agent
        .get(`/api/type/?page=1`)
        .expect(200)
        .expect(function(res){
            if (res.body.results.message != 'No data.') throw new Error ('Should be "No data."');
        }).end(done);
    });

    it('Get status no data', function(done){
        agent
        .get(`/api/status/?page=2`)
        .expect(200)
        .expect(function(res){
            if (res.body.results.message != 'No data.') throw new Error ('Should be "No data."');
        }).end(done);
    });
    
    it('Logout then', function(done){
        agent
        .get('/api/user/logout')
        .expect({"message":"You are now logged out."}, done);
    });
});