const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  if (!req.cookies) {
    req.cookies = {};
    req.cookies.shortlyid = '';
  }
  
  Promise.resolve(req.cookies.shortlyid)
    .then(cookie => {
      if (cookie) {
        return models.Sessions.get({hash: cookie});
      } else {
        throw cookie;
      } 
    })
    .then(session => {
      if (session) {
        return models.Users.get({id: session.userId});
      } else {
        throw session;
      }
    })
    .then(user => {
      req.session = {hash: req.cookies.shortlyid, userId: user.id, user: { username: user.username }};
      next();
    })
    .catch(() => {
      models.Sessions.create()
        .then(result => {
          return models.Sessions.get({id: result.insertId});
        })
        .then (session => {
          res.cookie("shortlyid", session.hash); //maybe need to overwrite
          req.session = {hash: session.hash, userId: null, user: { username: null }};
          next();
        })
    })
  
  
  
  // if (!Object.keys(req.cookies).length) {
  //   models.Sessions.create()
  //   .then(data => {
  //     models.Sessions.get({id: data.insertId})
  //     .then(data => {
  //       res.cookie("shortlyid", data.hash);
  //       req.session = {hash: data.hash, userId: null, user: { username: null }};
  //       next();
  //     })
  //   })
  // } else {
  //   models.Sessions.get({hash: req.cookies.shortlyid})
  //   .then(data => {
  //     if (!data) {
  //       models.Sessions.create()
  //         .then(data => {
  //           models.Sessions.get({id: data.insertId})
  //           .then(data => {
  //             res.cookie("shortlyid", data.hash); //maybe need to overwrite
  //             req.session = {hash: data.hash, userId: null, user: { username: null }};
  //             next();
  //           })
  //         })
  //     } else if (data.userId === null) {
  //       req.session = {hash: data.hash, userId: null, user: { username: null }};
  //       next();
  //     } else {
  //       models.Users.get({id: data.userId})
  //       .then(data => {
  //         req.session = {hash: data.hash, userId: data.id, user: { username: data.username }};
  //         next();
  //       })
        
  //     }
  //   })
  // }
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

