var fs = require('fs');

var data = fs.readFileSync("/Users/hxiong/Documents/Emily/Web/WebLabs/MyLabs/Lab01/js/dictionary.txt").toString();

word_list = data.split("\n");

function getWords(letters){
     word_tally = {};
     letter_list = [];
     for(i = 0; i < letters.length; i++){
         if(word_tally[letters[i]] == null){
            word_tally[letters[i]] = 1;
            letter_list.push(letters[i]);
         }
         else{
            word_tally[letters[i]] += 1;
         }
     }
     returnWords = [];
     for(i = 0; i < word_list.length; i++){
         word = word_list[i];
         for(x = 0; x < word.length; x++){
             if(letter_list.indexOf(word[x]) != -1){
                 if(word.split(word[x]).length-1 <= word_tally[word[x]]){
                     returnWords.push(word)
                     console.log(word)
                 }
             }
         }
     }
     return "Program done";
}

console.log(getWords("aa"));
// getWords();

// module.exports= {};

// module.exports['readTextFile'] = readFile;

//console.log(allText)