var app = require('../server');
const request = require('supertest');
const knex = require('../../knex/knex');
const agent = request.agent(app);

// describe('Create Animal', function(done){
//     it('Login first', function(done){
//         agent
//         .post('/api/user/login')
//         .send({username:'username', password:'Password123'})
//         .expect(200)
//         .expect({"message": "You are now logged in."}, done);
//     });

//     it('Testing', function(done){
//         agent
//         .get('/api/animal')
//         .expect(200, done);
//     });

//     it('Logout then', function(done){
//         agent
//         .get('/api/user/logout')
//         .expect({"message":"You are now logged out."}, done);
//     });

//     it('Testing againn', function(done){
//         agent
//         .get('/api/animal')
//         .expect(401, done);
//     });
// })

describe('Create Animal', function(){
    it('Login first', function(done){
        agent
        .post('/api/user/login')
        .send({username:'username', password:'Password1234'})
        .expect({"message": "You are now logged in."}, done);
    });

    it('Create an animal', async function(){
        var type = await knex('types').select('*').where('id',2).first();
        var status = await knex('status').select('*').where('id',1).first();
        await agent
        .post('/api/animal')
        .send({name:'animal99', description: 'description99', type_id: type.id, status_id: status.id})
        .expect({"message": "Animal created"});
        
    });

    it('Error if status id does not exist', function(done){
        agent
        .post('/api/animal')
        .send({name:'myname', description:'mydescription', type_id:2, status_id:44})
        .expect(400)
        .expect(['Status ID does not exist.'], done);
    });

    it('Error if type id does not exist', function(done){
        agent
        .post('/api/animal')
        .send({name:'myname', description:'mydescription', type_id:'55', status_id:'2'})
        .expect(400)
        .expect(['Type ID does not exist.'], done);
    });

    it('Error if type_id / status_id is null', function(done){
        agent
        .post('/api/animal')
        .send({name:'myname', description:'mydescription', type_id:null, status_id:null})
        .expect(400)
        .expect(function(res){
            if (res.body.includes('Invalid Status ID.')===false) throw new Error('Test case has failed.');
            if (res.body.includes('Invalid Type ID.')===false) throw new Error('Test case has failed.');
        }).end(done);
    });
    
    it('Error if type_id / status_id is empty string', function(done){
        agent
        .post('/api/animal')
        .send({name:'myname', description:'mydescription', type_id:'', status_id:''})
        .expect(400)
        .expect(function(res){
            if (res.body.includes('Invalid Status ID.')===false) throw new Error('Test case has failed.');
            if (res.body.includes('Invalid Type ID.')===false) throw new Error('Test case has failed.');
        }).end(done);
    });

    it('Error if type_id / status_id is invalid', function(done){
        agent
        .post('/api/animal')
        .send({name:'myname', description:'mydescription', type_id:'1.50' , status_id:'someLetter'})
        .expect(400)
        .expect(function(res){
            if (res.body.includes('Invalid Status ID.')===false) throw new Error('Test case has failed.');
            if (res.body.includes('Invalid Type ID.')===false) throw new Error('Test case has failed.');
        }).end(done);
    });

    it('Incomplete fields validation', function(done){
        agent
        .post('/api/animal')
        .send({name:'m', description:'abcd', type_id:'2', status_id:'5'})
        .expect(400)
        .expect(function(res){
            if (res.body.includes('Name is too short.')===false) throw new Error('Test case has failed.');
            if (res.body.includes('Description is too short.')===false) throw new Error('Test case has failed.');
        }).end(done);
    });

    it('Empty fields validation',  function(done){
        agent
        .post('/api/animal')
        .send({name:null, description:'', type_id:'3', status_id:'5'})
        .expect(400)
        .expect(function(res){
            if (res.body.includes('Name is required.')===false) throw new Error('Test case has failed.');
            if (res.body.includes('Description is required.')===false) throw new Error('Test case has failed.');
        }).end(done);
    });

    it('Avoid duplicate entry', async function(){
        var type = await knex('types').select('*').where('id',2).first();
        var status = await knex('status').select('*').where('id',1).first();
        await agent
        .post('/api/animal')
        .send({name:'animal1', description:'description8', type_id: type.id, status_id: status.id})
        .expect(400)
        .expect([])
        .expect(function(res){
            if (res.body.includes('Name already exists.')==false) throw new Error('Test case failed.');
            if (res.body.includes('Description already exists.')==false) throw new Error('Test case failed.');
        });
    });

    it('Refresh database', async function(){
        // var newAnimal = await knex('animals').select('*').where('name', 'animal99').first();
        // await agent
        // .delete(`/api/animal/${newAnimal._id}`)
        // .expect(200)
        // .expect({'message': 'Animal deleted.'});
        await knex('animals').where('name','animal99').del();
    });

    it('Logout then', function(done){
        agent
        .get('/api/user/logout')
        .expect({"message":"You are now logged out."}, done);
    });

    it('Error on creating animal if unauthenticated', async function(){
        var type = await knex('types').select('*').where('id',2).first();
        var status = await knex('status').select('*').where('id',1).first();
        await agent
        .post('/api/animal')
        .send({name:'myname', description:'mydescription', type_id: type.id, status_id: status.id})
        .expect(401);
    });
})