var app = require('../testServer');
const request = require('supertest');
const agent = request.agent(app);
const Type = require('../models/type');
const Animal = require('../models/animal');
const Status = require('../models/status');

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
        .send({username:'username', password:'Password123'})
        .expect(200)
        .expect({"message": "You are now logged in."}, done);
    });

    it('Create an animal', async function(){
        var type = await Type.findOne({name:'type5'});
        var status = await Status.findOne({name:'status5'});
        await agent
        .post('/api/animal')
        .send({name:'myname', description: 'mydescription', type_id: type._id, status_id: status._id})
        .expect(200)
        .expect({"message": "Animal created"});
    });

    it('Error if type/status id does not exist', function(done){
        agent
        .post('/api/animal')
        .send({name:'myname', description:'mydescription', type_id:'0123456789ab', status_id:'0123456789ab'})
        .expect(400)
        .expect(function(res){
            if (res.body.includes('Type ID does not exist.')===false) throw new Error('Test case has failed.');
            if (res.body.includes('Status ID does not exist.')===false) throw new Error('Test case has failed.');
        })
        .end(done);
    });

    it('Error if type_id is null', function(done){
        agent
        .post('/api/animal')
        .send({name:'myname', description:'mydescription', type_id:null, status_id:'0123456789ab'})
        .expect(400)
        .expect(function(res){
            if (res.body.includes('Type ID does not exist.')===false) throw new Error('Test case has failed.');
            if (res.body.includes('Status ID does not exist.')===false) throw new Error('Test case has failed.');
        })
        .end(done);
    });
    
    it('Error if status_id is null', function(done){
        agent
        .post('/api/animal')
        .send({name:'myname', description:'mydescription', type_id:'0123456789ab', status_id:null})
        .expect(400)
        .expect(function(res){
            if (res.body.includes('Type ID does not exist.')===false) throw new Error('Test case has failed.');
            if (res.body.includes('Status ID does not exist.')===false) throw new Error('Test case has failed.');
        })
        .end(done);
    });

    it('Error if type_id is empty string', function(done){
        agent
        .post('/api/animal')
        .send({name:'myname', description:'mydescription', type_id:'', status_id:'0123456789ab'})
        .expect(400)
        .expect(["Invalid Type ID."], done);
    });

    it('Error if status_id is empty string', function(done){
        agent
        .post('/api/animal')
        .send({name:'myname', description:'mydescription', type_id:'0123456789ab', status_id:''})
        .expect(400)
        .expect(["Invalid Status ID."], done);
    });

    it('Error if type_id is invalid', function(done){
        agent
        .post('/api/animal')
        .send({name:'myname', description:'mydescription', type_id:'invalid_mongoose_object_id' , status_id:'0123456789ab'})
        .expect(400)
        .expect(["Invalid Type ID."], done);
    });

    it('Error if status_id is invalid', function(done){
        agent
        .post('/api/animal')
        .send({name:'myname', description:'mydescription', type_id:'0123456789ab' , status_id:'invalid_mongoose_object_id'})
        .expect(400)
        .expect(["Invalid Status ID."], done);
    });

    it('Error if min/max length is not inputted', function(done){
        agent
        .post('/api/animal')
        .send({name:'m', description:'abcd', type_id:'0123456789ab', status_id:'0123456789ab'})
        .expect(400)
        .expect(function(res){
            if (res.body.includes('No animal has one letter...')===false) throw new Error('Test case has failed.');
            if (res.body.includes('Description is too short...')===false) throw new Error('Test case has failed.');
        })
        .end(done);
    });

    it('Error if null or empty string input on text fields',  function(done){
        agent
        .post('/api/animal')
        .send({name:null, description:'', type_id:'0123456789ab', status_id:'0123456789ab'})
        .expect(400)
        .expect(function(res){
            if (res.body.includes('Animal name is required.')===false) throw new Error('Test case has failed.');
            if (res.body.includes('Animal description is required.')===false) throw new Error('Test case has failed.');
        }).end(done);
    });

    it('Avoid duplicate entry', async function(){
        var type = await Type.findOne({name:'type5'});
        var status = await Status.findOne({name:'status5'});
        await agent
        .post('/api/animal')
        .send({name:'myname', description:'mydescription', type_id: type._id, status_id: status._id})
        .expect(400)
        .expect(function(res){
            if (res.body.includes('Animal name already exists.')==false) throw new Error('Test case failed.');
            if (res.body.includes('Animal description already exists.')==false) throw new Error('Test case failed.');
        });
    });

    it('Refresh database', async function(){
        var newAnimal = await Animal.findOne({name:'myname'});
        await agent
        .delete(`/api/animal/${newAnimal._id}`)
        .expect(200)
        .expect({'message': 'Animal deleted.'});
    });

    it('Logout then', function(done){
        agent
        .get('/api/user/logout')
        .expect({"message":"You are now logged out."}, done);
    });

    it('Error on creating animal if unauthenticated', async function(){
        var type = await Type.findOne({name:'type5'});
        var status = await Status.findOne({name:'status5'});
        await agent
        .post('/api/animal')
        .send({name:'myname', description:'mydescription', type_id: type._id, status_id: status._id})
        .expect(401);
    });
})