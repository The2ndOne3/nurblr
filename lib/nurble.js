/**
 * Implementation of speech nurbler.
 */
// Dependencies.
var pos = require('../data/lang/eng-parsed.json');

// Nurbling function.
var nurble = function(input){
  // Tokenise.
  var text = input.split(' ');
  // Check for nounity.
  for(var i = 0;i < text.length;i++){
    var word = text[i].replace(/[\'";:,.!\/?\\-]/g, '');
    // Check if in noun list.
    var noun = pos.indexOf(word);
    // Plural.
    if(noun < 0){
      noun = pos.indexOf(word + 's');
    }
    // Unplural.
    if(noun < 0 && word.substr(-1).indexOf('s') != -1){
      noun = pos.indexOf(word.substr(0, word.length - 1));
    }
    if(noun < 0 && word.substr(-2).indexOf('es') != -1){
      noun = pos.indexOf(word.substr(0, word.length - 2));
    }
    // Uppercasify if a noun.
    if(noun > 0){
      text[i] = text[i].toUpperCase();
    }
    // Nurble if not a noun.
    else{
      var punctuation = text[i].split(word);
      text[i] = punctuation[0] + 'nurble' + punctuation[1];
    }
  }
  // Detokenise.
  return text.join(' ');
};

module.exports = {
  nurble: nurble
};