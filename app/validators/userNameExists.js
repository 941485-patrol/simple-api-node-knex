const getUserService = require('../services/user/getUser');
const userNameExists = async function(value) {
    try {
        var user = await getUserService(value);
        if (user != null) {
           throw new Error('Already exists.');
        } else {
            return undefined;
        }
    } catch (error) {
        throw error;
    }
};
module.exports = userNameExists;