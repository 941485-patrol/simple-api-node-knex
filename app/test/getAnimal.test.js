var app = require('../server');
const request = require('supertest');
const knex = require('../../knex/knex');
const agent = request.agent(app);


describe('Get Animal', function(){
    it('Login first', function(done){
        agent
        .post('/api/user/login')
        .send({username:'username', password:'Password1234'})
        .expect(200)
        .expect({"message": "You are now logged in."}, done);
    });

    it('Get one animal', async function(){
        var getAnimal = await knex('animals').select('*').where('id',2).first();
        await agent
        .get(`/api/animal/${getAnimal.id}`)
        .expect(200)
        .expect(function(res){
            if (res.body.id!=getAnimal.id) throw new Error('Id not equal to url id');
            if (res.body.name!=getAnimal.name) throw new Error('Name not equal to queried name.');
        });
    });

    it('Error on invalid url', function(done){
        agent
        .get(`/api/animal/mambonumber5`)
        .expect(400)
        .expect(['Invalid Url.'], done);
    });

    it('Error if animal id does not exist', function(done){
        agent
        .get(`/api/animal/55`)
        .expect(400)
        .expect(['Cannot find animal.'], done);
    });

    it('Logout then', function(done){
        agent
        .get('/api/user/logout')
        .expect({"message":"You are now logged out."}, done);
    });

    it('Error on getting one animal if unauthenticated', async function(){
        var getAnimal = await knex('animals').select('*').where('id',2).first();
        await agent
        .get(`/api/animal/${getAnimal.id}`)
        .expect(401)
    });
});