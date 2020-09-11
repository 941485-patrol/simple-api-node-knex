const user = require('./models/user');
const animal = require('./models/animal');
const status = require('./models/status');
const type = require('./models/type');
var mongoose = require('./testDatabase');
// Connect database
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log(`Test Database ${process.env.TEST_DB_NAME} connected.`);
    seedTables();
});

const seedTables = async ()=> {
    try {
        await user.create({username:'username', password:'Password123'});
        console.log('User seeded.');
        await type.insertMany([
            {name:'type1', environment:'environment1'},
            {name:'type2', environment:'environment2'},
            {name:'type3', environment:'environment3'},
            {name:'type4', environment:'environment4'},
            {name:'type5', environment:'environment5'},
            {name:'type6', environment:'environment6'},
            {name:'type7', environment:'environment7'},
            {name:'type8', environment:'environment8'},
            {name:'type9', environment:'environment9'},
            {name:'type10', environment:'environment10'},
            {name:'type11', environment:'environment11'},
            {name:'type12', environment:'environment12'},
        ]);
        console.log('Type seeded.');
        await status.insertMany([
            {name:'status1', description:'description1'},
            {name:'status2', description:'description2'},
            {name:'status3', description:'description3'},
            {name:'status4', description:'description4'},
            {name:'status5', description:'description5'},
            {name:'status6', description:'description6'},
            {name:'status7', description:'description7'},
            {name:'status8', description:'description8'},
            {name:'status9', description:'description9'},
            {name:'status10', description:'description10'},
            {name:'status11', description:'description11'},
            {name:'status12', description:'description12'},
        ]);
        console.log('Status seeded.');
        var status1 = await status.findOne({name:'status1'});
        var status2 = await status.findOne({name:'status3'});
        var status3 = await status.findOne({name:'status5'});
        var status4 = await status.findOne({name:'status7'});
        var status5 = await status.findOne({name:'status9'});
        var status6 = await status.findOne({name:'status11'});
        var type1 = await type.findOne({name:'type2'});
        var type2 = await type.findOne({name:'type4'});
        var type3 = await type.findOne({name:'type6'});
        var type4 = await type.findOne({name:'type8'});
        var type5 = await type.findOne({name:'type10'});
        var type6 = await type.findOne({name:'type12'});
        await animal.insertMany([
            {name:'animal1', description:'description1', status_id:status1._id, type_id:type1._id},
            {name:'animal2', description:'description2', status_id:status2._id, type_id:type2._id},
            {name:'animal3', description:'description3', status_id:status3._id, type_id:type3._id},
            {name:'animal4', description:'description4', status_id:status4._id, type_id:type4._id},
            {name:'animal5', description:'description5', status_id:status5._id, type_id:type5._id},
            {name:'animal6', description:'description6', status_id:status6._id, type_id:type6._id},
            {name:'animal7', description:'description7', status_id:status6._id, type_id:type6._id},
            {name:'animal8', description:'description8', status_id:status5._id, type_id:type5._id},
            {name:'animal9', description:'description9', status_id:status4._id, type_id:type4._id},
            {name:'animal10', description:'description10', status_id:status3._id, type_id:type3._id},
            {name:'animal11', description:'description11', status_id:status2._id, type_id:type2._id},
            {name:'animal12', description:'description12', status_id:status1._id, type_id:type1._id},
        ]);
        console.log('Animal seeded.');
        var animal1 = await animal.findOne({name:'animal1'});
        var animal2 = await animal.findOne({name:'animal2'});
        var animal3 = await animal.findOne({name:'animal3'});
        var animal4 = await animal.findOne({name:'animal4'});
        var animal5 = await animal.findOne({name:'animal5'});
        var animal6 = await animal.findOne({name:'animal6'});
        var animal7 = await animal.findOne({name:'animal7'});
        var animal8 = await animal.findOne({name:'animal8'});
        var animal9 = await animal.findOne({name:'animal9'});
        var animal10 = await animal.findOne({name:'animal10'});
        var animal11 = await animal.findOne({name:'animal11'});
        var animal12 = await animal.findOne({name:'animal12'});
        await status.findOneAndUpdate({name:'status1'}, {$push: {animal_ids: animal1._id}});
        await status.findOneAndUpdate({name:'status1'}, {$push: {animal_ids: animal12._id}});
        await status.findOneAndUpdate({name:'status3'}, {$push: {animal_ids: animal2._id}});
        await status.findOneAndUpdate({name:'status3'}, {$push: {animal_ids: animal11._id}});
        await status.findOneAndUpdate({name:'status5'}, {$push: {animal_ids: animal3._id}});
        await status.findOneAndUpdate({name:'status5'}, {$push: {animal_ids: animal10._id}});
        await status.findOneAndUpdate({name:'status7'}, {$push: {animal_ids: animal4._id}});
        await status.findOneAndUpdate({name:'status7'}, {$push: {animal_ids: animal9._id}});
        await status.findOneAndUpdate({name:'status9'}, {$push: {animal_ids: animal5._id}});
        await status.findOneAndUpdate({name:'status9'}, {$push: {animal_ids: animal8._id}});
        await status.findOneAndUpdate({name:'status11'}, {$push: {animal_ids: animal6._id}});
        await status.findOneAndUpdate({name:'status11'}, {$push: {animal_ids: animal7._id}});
        await type.findOneAndUpdate({name:'type2'}, {$push: {animal_ids: animal1._id}});
        await type.findOneAndUpdate({name:'type2'}, {$push: {animal_ids: animal12._id}});
        await type.findOneAndUpdate({name:'type4'}, {$push: {animal_ids: animal2._id}});
        await type.findOneAndUpdate({name:'type4'}, {$push: {animal_ids: animal11._id}});
        await type.findOneAndUpdate({name:'type6'}, {$push: {animal_ids: animal3._id}});
        await type.findOneAndUpdate({name:'type6'}, {$push: {animal_ids: animal10._id}});
        await type.findOneAndUpdate({name:'type8'}, {$push: {animal_ids: animal4._id}});
        await type.findOneAndUpdate({name:'type8'}, {$push: {animal_ids: animal9._id}});
        await type.findOneAndUpdate({name:'type10'}, {$push: {animal_ids: animal5._id}});        
        await type.findOneAndUpdate({name:'type10'}, {$push: {animal_ids: animal8._id}});
        await type.findOneAndUpdate({name:'type12'}, {$push: {animal_ids: animal6._id}});
        await type.findOneAndUpdate({name:'type12'}, {$push: {animal_ids: animal7._id}});
        console.log('Finished seeding.')
    } catch (error) {
        console.log(error);
    }

}