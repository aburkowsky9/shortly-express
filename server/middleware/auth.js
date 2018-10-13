const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  if (!Object.keys(req.cookies).length) {
    models.Sessions.create()
    .then(data => {
      console.log(data);
      models.Sessions.get({id: 1});
    })
    .then(data => {
      console.log(data);
    })
    next();
  }
  // find shortly id hash
  // query sessions db with this hash
  // if valid
    // get user id
    // add user id to session 
  // else
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

