var app = require('../server');
const request = require('supertest');
const knex = require('../../knex/knex');
const agent = request.agent(app);

describe('Create Status', function(){
    it('Login first', function(done){
        agent
        .post('/api/user/login')
        .send({username:'username', password:'Password1234'})
        .expect(200)
        .expect({"message": "You are now logged in."}, done);
    });

    it('Create a Status', function(done){
        agent
        .post('/api/status')
        .send({name:'status99', description:'description99'})
        .expect(200)
        .expect({'message': 'Status created.'}, done);
    });

    it('Error on double entry', function(done){
        agent
        .post('/api/status')
        .send({name:'status99', description:'description99'})
        .expect(400)
        .expect(function(res){
            if (res.body.includes('Name already exists.')==false) throw new Error('Test case failed.');
            if (res.body.includes('Description already exists.')==false) throw new Error('Test case failed.');
        }).end(done);
    });

    it('Empty fields validation', function(done){
        agent
        .post('/api/status')
        .send({name:'', description:''})
        .expect(400)
        .expect((res, err)=>{
            if (err) throw err;
            if (res.body.includes('Name is required.')===false) throw new Error('Test case failed.');
            if (res.body.includes('Description is required.')===false) throw new Error('Test case failed.');
        }).end(done);
    });

    it('Missing fields validation', function(done){
        agent
        .post('/api/status')
        .send({})
        .expect(400)
        .expect((res, err)=>{
            if (err) throw err;
            if (res.body.includes('Name is required.')===false) throw new Error('Test case failed.');
            if (res.body.includes('Description is required.')===false) throw new Error('Test case failed.');
        }).end(done);
    });

    it('Incomplete fields validation', function(done){
        agent
        .post('/api/status')
        .send({name:'a', description:'abcd'})
        .expect(400)
        .expect((res, err)=>{
            if (err) throw err;
            if (res.body.includes('Name is too short.')===false) throw new Error('Test case failed.');
            if (res.body.includes('Description is too short.')===false) throw new Error('Test case failed.');
        }).end(done);
    });

    it('Refresh database', async function(){
        var status = await knex('status').select('*').where({name: 'status99'}).first();
        await agent
        .delete(`/api/status/${status.id}`)
        .expect(200)
        .expect({'message': 'Status deleted.'});
    });

    it('Logout then', function(done){
        agent
        .get('/api/user/logout')
        .expect({"message":"You are now logged out."}, done);
    });

    it('Error on creating a status if unauthenticated', async function(){
        agent
        .post('/api/status')
        .send({name:'status13', description:'description13'})
        .expect(401);
    });
    
});