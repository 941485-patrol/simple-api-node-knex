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
  unseedTables();
});

const unseedTables = async () => {
    try {
        await user.deleteMany();
        await animal.deleteMany();
        await status.deleteMany();
        await type.deleteMany();
        console.log('Tables deleted')
    } catch (error) {
        console.log(error);
    }
}