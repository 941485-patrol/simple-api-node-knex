const getUserService = require('../services/user/getUser');
const userNameExists =  function(value) {
    return getUserService(value);
    // try {
    //     var user = await getUserService(value);
    //     if (user != null) {
    //        throw new Error('Already exists.');
    //     } else {
    //         return undefined;
    //     }
    // } catch (error) {
    //     // 
    // }
};
module.exports = userNameExists;