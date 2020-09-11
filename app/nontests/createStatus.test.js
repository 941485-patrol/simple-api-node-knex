var app = require('../testServer');
const request = require('supertest');
const agent = request.agent(app);
const Status = require('../models/status');

describe('Create Status', function(){
    it('Login first', function(done){
        agent
        .post('/api/user/login')
        .send({username:'username', password:'Password123'})
        .expect(200)
        .expect({"message": "You are now logged in."}, done);
    });

    it('Create a Status', function(done){
        agent
        .post('/api/status')
        .send({name:'status13', description:'description13'})
        .expect(200)
        .expect({'message': 'Status created.'}, done);
    });

    it('Error on double entry', function(done){
        agent
        .post('/api/status')
        .send({name:'status9', description:'description9'})
        .expect(400)
        .expect(function(res){
            if (res.body.includes('Status name already exists.')==false) throw new Error('Test case failed.');
            if (res.body.includes('Status description already exists.')==false) throw new Error('Test case failed.');
        }).end(done);
    });

    it('Empty fields validation', function(done){
        agent
        .post('/api/status')
        .send({name:'', description:''})
        .expect(400)
        .expect((res, err)=>{
            if (err) throw err;
            if (res.body.includes('Status name is required.')===false) throw new Error('Test case failed.');
            if (res.body.includes('Status description is required.')===false) throw new Error('Test case failed.');
        }).end(done);
    });

    it('Incomplete fields validation', function(done){
        agent
        .post('/api/status')
        .send({name:'a', description:'abcd'})
        .expect(400)
        .expect((res, err)=>{
            if (err) throw err;
            if (res.body.includes('No status has one letter...')===false) throw new Error('Test case failed.');
            if (res.body.includes('Status description is too short...')===false) throw new Error('Test case failed.');
        }).end(done);
    });

    it('Refresh database', async function(){
        var status = await Status.findOne({name:'status13'});
        await agent
        .delete(`/api/status/${status._id}`)
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