/**
 * Parse language data.
 */
// Dependencies.
var fs = require('fs');

// Read arguments.
var lang = 'eng';
if(process.argv.length > 2 && process.argv[2].indexOf('-') == -1){
  lang = process.argv[2];
}
var verbose = process.argv.splice(0,3).indexOf('-v') != -1;

// Read in file.
var pos = fs.readFileSync(__dirname + '/../data/lang/' + lang, {
  encoding: 'utf-8'
});
if(verbose){
  console.log('Reading complete.');
}

// Tokenise.
var langData = pos.split('\n');
var delimiter = '\t'; //'×' for Moby.

// Nouns.
var nouns = ['N', 'h', 'r', 'p'];
var output = [];

for(var i = 0;i < langData.length;i++){
  var word = langData[i];
  // Drop all non-nouns.
  for(var j = 0;j < nouns.length + 1;j++){
    if(
      word.substring(word.indexOf('|' + delimiter)).indexOf(nouns[j]) === 2 ||
      word.substring(word.indexOf(delimiter)).indexOf(nouns[j]) === 1
      ){
      // Clean up nouns.
      output.push(word.substring(0,word.indexOf(delimiter)));
      break;
    }
  }
  if(verbose && i % 10000 === 0){
    console.log(i + '/' + langData.length + ' complete.');
  }
}

output = output.sort(function(a, b){
  if(a < b){
    return -1;
  }
  return 1;
});

// Write file with non-nouns dropped.
fs.writeFileSync(__dirname + '/../data/lang/' + lang + '-parsed.json', JSON.stringify(output, null, '  '));
if(verbose){
  console.log('Sorting and writing complete.');
}
