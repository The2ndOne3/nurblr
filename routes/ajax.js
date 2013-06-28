/**
 * Ajax requests.
 */

var nurble = require('../lib/nurble.js');

var responder = function(req, res){
  res.send(nurble(req.body.q));
};

module.exports = responder;