var app = require('../server');
const request = require('supertest');
const knex = require('../../knex/knex');
const agent = request.agent(app);

describe('Create Type', function(){
    it('Login first', function(done){
        agent
        .post('/api/user/login')
        .send({username:'username', password:'Password1234'})
        .expect(200)
        .expect({"message": "You are now logged in."}, done);
    });

    it('Create a Type',  function(done){
        agent
        .post('/api/type')
        .send({name:'type99', environment:'environment99'})
        .expect(200)
        .expect({"message": "Type created"}, done);
    });

    it('Error on double entry', function(done){
        agent
        .post('/api/type')
        .send({name:'type1', environment:'environment12'})
        .expect(400)
        .expect(function(res){
            if (res.body.includes('Name already exists.')==false) throw new Error('Test case failed.');
            if (res.body.includes('Environment already exists.')==false) throw new Error('Test case failed.');
        }).end(done);
    });

    it('Empty fields validation',  function(done){
        agent
        .post('/api/type')
        .send({name:'', environment:''})
        .expect(400)
        .expect(function(res){
            if (res.body.includes('Name is required.')===false) throw new Error('Test case failed.');
            if (res.body.includes('Environment is required.')===false) throw new Error('Test case failed.');
        }).end(done);
    })

    it('Incomplete fields validation',  function(done){
        agent
        .post('/api/type')
        .send({name:'a', environment:'abcd'})
        .expect(400)
        .expect(function(res){
            
            if (res.body.includes('Name is too short.')===false) throw new Error('Test case failed.');
            if (res.body.includes('Environment is too short.')===false) throw new Error('Test case failed.');
        }).end(done);
    });

    it('Missing fields validation',  function(done){
        agent
        .post('/api/type')
        .send({})
        .expect(400)
        .expect(function(res){
            if (res.body.includes('Name is required.')===false) throw new Error('Test case failed.');
            if (res.body.includes('Environment is required.')===false) throw new Error('Test case failed.');
        }).end(done);
    })

    it('Refresh database', async function(){
        var type = await knex('types').select('*').where({name: 'type99'}).first();
        await agent
        .delete(`/api/type/${type.id}`)
        .expect(200)
        .expect({'message': 'Type deleted.'});
    });

    it('Logout then', function(done){
        agent
        .get('/api/user/logout')
        .expect({"message":"You are now logged out."}, done);
    });

    it('Error on creating a type if unauthenticated',  function(done){
        agent
        .post('/api/type')
        .send({name:'type13', environment:'environment13'})
        .expect(401, done);
    });
});