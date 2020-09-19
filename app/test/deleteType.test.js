var app = require('../server');
const request = require('supertest');
const knex = require('../../knex/knex');
const agent = request.agent(app);

describe('Delete Type', function(){
    it('Login first', function(done){
        agent
        .post('/api/user/login')
        .send({username:'username', password:'Password1234'})
        .expect(200)
        .expect({"message": "You are now logged in."}, done);
    });

    it('Create a Type for deletion', function(done){
        agent
        .post('/api/type')
        .send({name:'type99', environment:'environment99'})
        .expect(200)
        .expect({'message': 'Type created'}, done);
    });

    it('Delete a Type', async function(){
        var type = await knex('types').select('*').where({name: 'type99'}).first();
        await agent
        .delete(`/api/type/${type.id}`)
        .expect(200)
        .expect({'message': 'Type deleted.'})
    });

    it('Error on invalid type id url', function(done){
        agent
        .delete(`/api/type/invalid_url`)
        .expect(400)
        .expect(['Invalid Url.'], done);
    });

    it('Error if type id not found', function(done){
        agent
        .delete(`/api/type/88`)
        .expect(400)
        .expect(['Type ID does not exist.'], done);
    });

    it('Error if empty type id', function(done){
        agent
        .delete(`/api/type/`)
        .expect(404, done);
    });

    it('Logout then', function(done){
        agent
        .get('/api/user/logout')
        .expect({"message":"You are now logged out."}, done);
    });

    it('Error deleting a type if unauthenticated', async function(){
        var type = await knex('types').select('*').where({name: 'type4'}).first();
        await agent
        .delete(`/api/type/${type.id}`)
        .expect(401);
    });
});