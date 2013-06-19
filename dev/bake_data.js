/**
 * Parse language data.
 */
// Dependencies.
var fs = require('fs');

// Read arguments.
var lang = process.argv[2] || 'eng';

// Read in file.
var pos = fs.readFileSync(__dirname + '/../data/lang/' + lang, {
  encoding: 'utf-8'
});

// Tokenise by newline.
var langData = pos.split('\n');

for(var i = 0;i < langData.length;i++){
  var word = langData[i];
  // Drop all non-nouns.
  if(word.substring(word.indexOf('×')).indexOf('N') == -1){
    langData.splice(i,1);
    i--;
  }
  // Clean up nouns.
  else{
    langData[i] = word.substring(0,word.indexOf('×')).toLowerCase();
  }
}

// Write file with non-nouns dropped.
fs.writeFileSync(__dirname + '/../data/lang/' + lang + '-parsed.json', JSON.stringify(langData));