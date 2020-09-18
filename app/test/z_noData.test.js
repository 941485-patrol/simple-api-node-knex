var app = require('../server');
const request = require('supertest');
const knex = require('../../knex/knex');
const agent = request.agent(app);

describe('No data', function(){
    before(async function () {
        await knex('status').del()
        await knex('types').del()
        await knex('animals').del()
    });
    
    it('Login first', function(done){
        agent
        .post('/api/user/login')
        .send({username:'username', password:'Password1234'})
        .expect(200)
        .expect({"message": "You are now logged in."}, done);
    });

    it('Get animals no data', function(done){
        agent
        .get(`/api/animal/?page=2`)
        .expect(200)
        .expect(function(res){
            if (res.body.message != 'No data.') throw new Error ('Should be "No data."');
        }).end(done);
    });

    // it('Get types no data', function(done){
    //     agent
    //     .get(`/api/type/?page=1`)
    //     .expect(200)
    //     .expect(function(res){
    //         if (res.body.message != 'No data.') throw new Error ('Should be "No data."');
    //     }).end(done);
    // });

    it('Get status no data', function(done){
        agent
        .get(`/api/status/?page=2`)
        .expect(200)
        .expect(function(res){
            if (res.body.message != 'No data.') throw new Error ('Should be "No data."');
        }).end(done);
    });
    
    it('Logout then', function(done){
        agent
        .get('/api/user/logout')
        .expect({"message":"You are now logged out."}, done);
    });
});