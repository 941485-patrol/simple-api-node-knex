var app = require('../testServer');
const request = require('supertest');
const agent = request.agent(app);
const Type = require('../models/type');

describe('Create Type', function(done){
    it('Login first', function(done){
        agent
        .post('/api/user/login')
        .send({username:'username', password:'Password123'})
        .expect(200)
        .expect({"message": "You are now logged in."}, done);
    });

    it('Create a Type',  function(done){
        agent
        .post('/api/type')
        .send({name:'type13', environment:'environment13'})
        .expect(200)
        .expect({"message": "Type created"}, done);
    });

    it('Error on double entry', function(done){
        agent
        .post('/api/type')
        .send({name:'type1', environment:'environment12'})
        .expect(400)
        .expect(function(res){
            if (res.body.includes('Type name already exists.')==false) throw new Error('Test case failed.');
            if (res.body.includes('Type environment already exists.')==false) throw new Error('Test case failed.');
        }).end(done);
    });

    it('Empty fields validation',  function(done){
        agent
        .post('/api/type')
        .send({name:'', environment:''})
        .expect(400)
        .expect(function(res){
            if (res.body.includes('Type name is required.')===false) throw new Error('Test case failed.');
            if (res.body.includes('Environment of animal is required.')===false) throw new Error('Test case failed.');
        }).end(done);
    })

    it('Incomplete fields validation',  function(done){
        agent
        .post('/api/type')
        .send({name:'a', environment:'abcd'})
        .expect(400)
        .expect(function(res){
            
            if (res.body.includes('No type has one letter...')===false) throw new Error('Test case failed.');
            if (res.body.includes('No environment has one letter...')===false) throw new Error('Test case failed.');
        }).end(done);
    });

    it('Refresh database', async function(){
        var type = await Type.findOne({name:'type13'});
        await agent
        .delete(`/api/type/${type._id}`)
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