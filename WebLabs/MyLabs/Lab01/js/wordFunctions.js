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
     wordCount = word_list.length;
     letterCount = letters.length;
     for(i = 0; i < wordCount; i++){
    	 	word = word_list[i];
    	 	if (word.length > letterCount){
    	 		continue;
    	 	}    	 	
    	 	if(isAGoodWord(word_tally, word)){
    	 		returnWords.push(word);
    	 		console.log(word);
    	 	}
     }
     return "Program done";
}

function isAGoodWord(word_tally, word){
	let temp_tally = Object.assign({}, word_tally);
 	for(x = 0; x < word.length; x++){
 		var chCount = temp_tally[word[x]];
 		if ( chCount == undefined || chCount == 0){
 			return false;
 		}
 		temp_tally[word[x]] = chCount - 1;
 	}
	
 	return true
}

console.log(getWords("emily".toLowerCase()));


// getWords();

// module.exports= {};

// module.exports['readTextFile'] = readFile;

//console.log(allText)