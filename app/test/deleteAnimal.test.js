var app = require('../server');
const request = require('supertest');
const knex = require('../../knex/knex');
const agent = request.agent(app);

describe('Delete Animal', function(){
    it('Login first', function(done){
        agent
        .post('/api/user/login')
        .send({username:'username', password:'Password1234'})
        .expect(200)
        .expect({"message": "You are now logged in."}, done);
    });

    it('Create an animal for deletion', async function(){
        var type = await knex('types').select('*').where('id',5).first();
        var status = await knex('status').select('*').where('id',6).first();
        await agent
        .post('/api/animal')
        .send({name:'animal99', description: 'description99', type_id: type.id, status_id: status.id})
        .expect({"message": "Animal created"});
    });

    it('Delete an animal', async function(){
        var newAnimal = await knex('animals').select('*').where('name', 'animal99').first();
        await agent
        .delete(`/api/animal/${newAnimal.id}`)
        .expect(200)
        .expect({'message': 'Animal deleted.'});
    });

    it('Deleted animal is not present on type listing', async function(){
        var type = await knex('types').select('*').where('id',5).first();
        await agent
            .get(`/api/type/${type.id}`)
            .expect(200)
            .expect(function(res){
                var animals = res.body.animals;
                if (animals.length != 0) throw new Error('Animal id must be pulled.');
            });
    });

    it('Deleted animal is not present on status listing', async function(){
        var status = await knex('status').select('*').where('id',6).first();
        await agent
            .get(`/api/status/${status.id}`)
            .expect(200)
            .expect(function(res){
                var animals = res.body.animals;
                if (animals.length != 0) throw new Error('Animal id must be pulled.');
            });
    });

    it('Error if wrong type id in url', function(done){
        agent
        .delete(`/api/animal/77`)
        .expect(400)
        .expect(['Animal ID does not exist.'], done);
    });

    it('Error if empty string type id on url', function(done){
        agent
        .delete('/api/animal/')
        .expect(404, done);
    });

    it('Error if whitespace type id on url', function(done){
        agent
        .delete('/api/animal/    ')
        .expect(404, done);
    });

    it('Error if invalid url', function(done){
        agent
        .delete('/api/animal/seventy8')
        .expect(['Invalid Url.'], done);
    })

    it('Logout then', function(done){
        agent
        .get('/api/user/logout')
        .expect({"message":"You are now logged out."}, done);
    });

    it('Error on deleting an animal if authenticated', async function(){
        var newAnimal = await knex('animals').select('*').where('name', 'animal7').first();
        await agent
        .delete(`/api/animal/${newAnimal.id}`)
        .expect(401)
    });
    
});