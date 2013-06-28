/**
 * Implementation of speech nurbler.
 */
// Dependencies.
var pos = require('../data/lang/eng-parsed.json')
  , bs = require('binary-search');

// Set up binary search.
var find_in_POS_data = function(target){
  return bs(pos, target, function(a, b){
    if(a < b){
      return -1;
    }
    if(a > b){
      return 1;
    }
    return 0;
  });
};

// Nurbling function.
var nurble = function(input){
  // Tokenise.
  var text = input.toLowerCase().split(/\s/);
  // Check for nounity.
  for(var i = 0;i < text.length;i++){
    if(text[i].length > 0){
      // Nurble if malformed punctuation.
      if(text[i].search(/[";:,\.!\/?\)\\]+[\w]+/g) > 0){
        text[i] = 'nurble';
      }
      else{
        // Strip punctuation.
        var word = text[i].replace(/[";:,\.!\/?\(\)\\]/g, '');
        // Check if in noun list.
        var noun = find_in_POS_data(word);
        /*// Plural.
        if(noun < 0){
          noun = find_in_POS_data(word + 's');
        }
        // Unplural.
        if(noun < 0 && word.substr(-1).indexOf('s') != -1){
          noun = find_in_POS_data(word.substr(0, word.length - 1));
        }
        if(noun < 0 && word.substr(-2).indexOf('es') != -1){
          noun = find_in_POS_data(word.substr(0, word.length - 2));
        }*/
        // Uppercasify if a noun. All numbers are nouns.
        if(noun > -1 || !isNaN(Number(word))){
          text[i] = text[i].toUpperCase();
        }
        // Nurble if not a noun.
        else{
          var punctuation = text[i].split(word);
          text[i] = punctuation[0] + 'nurble' + punctuation[1];
        }
      }
    }
    else{
      // Remove empty elements.
      text.splice(i, 1);
      i--;
    }
  }
  // Detokenise.
  return text.join(' ');
};

module.exports = nurble;