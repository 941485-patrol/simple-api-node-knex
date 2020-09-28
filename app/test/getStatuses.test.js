var app = require('../server');
const request = require('supertest');
const agent = request.agent(app);

describe('Get Statuses', function(){
    it('Login first', function(done){
        agent
        .post('/api/user/login')
        .send({username:'username', password:'Password1234'})
        .expect(200)
        .expect({"message": "You are now logged in."}, done);
    });

    it('Get all status no pagination', function(done){
        agent
        .get('/api/status/all')
        .expect(200)
        .expect(function(res){
            if (res.body.items_this_page != 12) throw new Error('Items must be 12');
            if (res.body.results.length != 12) throw new Error('Results must be 12');
        }).end(done);
    })

    it('Get all status page 1', function(done){
        agent
        .get(`/api/status`)
        .expect(200)
        .expect(function(res){
            if (res.body.hasPrev != false) throw new Error('Page 1 must be hasPrev false');
            if (res.body.hasNext != true) throw new Error('Page 1 must be hasNext true');
            if (res.body.results.length != 5) throw new Error('Results must be five');
        }).end(done);
    });

    it('Get all status page 2', function(done){
        agent
        .get(`/api/status/?page=2`)
        .expect(200)
        .expect(function(res){
            if (res.body.hasPrev != true) throw new Error('Page 2 must be hasPrev true');
            if (res.body.hasNext != true) throw new Error('Page 2 must be hasNext true');
            if (res.body.results.length != 5) throw new Error('Results must be five');
        }).end(done);
    });

    it('Get all status page 3', function(done){
        agent
        .get(`/api/status/?page=3`)
        .expect(200)
        .expect(function(res){
            if (res.body.hasPrev != true) throw new Error('Page 3 must be hasPrev true');
            if (res.body.hasNext != false) throw new Error('Page 3 must be hasNext false');
            if (res.body.results.length != 2) throw new Error('Results must be two');
        }).end(done);
    });

    it('Get all status page 4', function(done){
        agent
        .get(`/api/status/?page=4`)
        .expect(200)
        .expect(function(res){
            if (res.body.message != 'No data.') throw new Error ('Should be "No data."');
        }).end(done);
    });

    it('Sort status (name desc page 1)', function(done){
        agent
        .get(`/api/status/?sort=-name`)
        .expect(200)
        .expect(function(res){
            if (res.body.results[0].name!='status9') throw new Error('Must be status9.');
            if (res.body.hasPrev != false) throw new Error('Page 1 must be hasPrev false');
            if (res.body.hasNext != true) throw new Error('Page 1 must be hasNext true');
            if (res.body.results.length != 5) throw new Error('Results must be five');
        }).end(done);
    });

    it('Sort status (by description desc page 2)', function(done){
        agent
        .get(`/api/status/?page=2&sort=-description`)
        .expect(200)
        .expect(function(res){
            if (res.body.results[4].name!='status11') throw new Error('Must be status11.');
            if (res.body.hasPrev != true) throw new Error('Page 2 must be hasPrev true');
            if (res.body.hasNext != true) throw new Error('Page 1 must be hasNext true');
            if (res.body.results.length != 5) throw new Error('Results must be five');
        }).end(done);
    });

    it('Sort status (name asc page 3)', function(done){
        agent
        .get(`/api/status/?sort=name&page=3`)
        .expect(200)
        .expect(function(res){
            if (res.body.results[1].name !='status9') throw new Error('Must be status9');
            if (res.body.hasPrev != true) throw new Error('Page 3 must be hasPrev true');
            if (res.body.hasNext != false) throw new Error('Page 3 must be hasNext true');
            if (res.body.results.length != 2) throw new Error('Results must be five');
        }).end(done);
    });

    it('Sort status (no data)', function(done){
        agent
        .get(`/api/status/?sort=-name&page=4`)
        .expect(200)
        .expect(function(res){
            if (res.body.message != 'No data.') throw new Error ('Should be "No data."');
        }).end(done);
    });

    it('Search statuses (case sensitive)', function(done){
        agent
        .get(`/api/status/?s=status5`)
        .expect(200)
        .expect(function(res){
            if (res.body.results[0].name !='status5') throw new Error('Must be status5');
        }).end(done);
    });

    it('Search statuses (case insensitive)', function(done){
        agent
        .get(`/api/status/?s=sTaTuS5`)
        .expect(200)
        .expect(function(res){
            if (res.body.results[0].name !='status5') throw new Error('Must be status5');
        }).end(done);
    });

    it('Search statuses with sort and pagination',  function(done){
        agent
        .get(`/api/status/?sort=-name&s=stat&page=2`)
        .expect(200)
        .expect(function(res){
            if (res.body.results[0].name !='status4') throw new Error('Must be status4');
        }).end(done);
    });

    it('Search statuses with sort and pagination case insensitive',  function(done){
        agent
        .get(`/api/status/?s=sTaTu&page=3&sort=name`)
        .expect(200)
        .expect(function(res){
            if (res.body.results[0].name !='status8') throw new Error('Must be status8');
        }).end(done);
    });

    // // it('No data message if there is no status inserted',  function(){
    // //     await Status.deleteMany();
    // //     agent
    // //     .get(`/api/status`)
    // //     .expect(200)
    // //     .expect(function(res){
    // //         if (res.body.results.message != 'No data.') throw new Error ('Should be "No data."');
    // //     }).end(done);
    // // });

    it('Paging error (page must be a digit)', function(done){
        agent
        .get(`/api/status/?page=two`)
        .expect(400)
        .expect(['Page must be a number.'], done);
    });

    it('Paging error (page must be not zero)', function(done){
        agent
        .get(`/api/status/?page=0`)
        .expect(400)
        .expect(['Page must be not less than 1.'], done);
    });

    it('Paging error (page must be not negative number)', function(done){
        agent
        .get(`/api/status/?page=-2340`)
        .expect(400)
        .expect(['Page must be not less than 1.'], done);
    });

    it('Sorting error 1',  function(done){
        agent
        .get(`/api/status/?sort=namek`)
        .expect(400)
        .expect(['Invalid sort field.'], done);
    });

    it('Sorting error 2',  function(done){
        agent
        .get(`/api/status/?sort=-descriptor`)
        .expect(400)
        .expect(['Invalid sort field.'], done);
    });

    it('Sorting error 3',  function(done){
        agent
        .get(`/api/status/?sort=__id`)
        .expect(400)
        .expect(['Invalid sort field.'], done);
    });

    it('Sorting and paging error (wrong sortkey)',  function(done){
        agent
        .get(`/api/status/?sort=namek&page=2`)
        .expect(400)
        .expect(function(res){
            if (res.body.includes('Invalid sort field.')==false) throw new Error ('Must have sorting error msg');
        }).end(done);
    });

    it('Sorting and paging error (wrong sortkey and page not a digit)',  function(done){
        agent
        .get(`/api/status/?sort=-descriptore&page=negativeOne`)
        .expect(400)
        .expect(function(res){
            if (res.body.includes('Page must be a number.')==false) throw new Error ('Must have paging error msg');
        }).end(done);
    });

    it('Sorting and paging error (wrong sortkey and page)',  function(done){
        agent
        .get(`/api/status/?page=0&sort=__id`)
        .expect(400)
        .expect(function(res){
            if (res.body.includes('Page must be not less than 1.')==false) throw new Error ('Must have paging error msg');
        }).end(done);
    });

    it('Logout then', function(done){
        agent
        .get('/api/user/logout')
        .expect({"message":"You are now logged out."}, done);
    });

    it('Get all status error if unauthenticated', function(done){
        agent
        .get(`/api/status/?page=3`)
        .expect(401, done);
    });
});