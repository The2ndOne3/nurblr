/**
 * Static requests.
 */

module.exports = {
  // Home page.
  index: function(req, res){
    res.render('index');
  },
  // Requests
  ajax: require('./ajax.js'),
  // 404.
  lost: function(req, res){
    res.render('lost');
  }
};