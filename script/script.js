//need array for data entered
$currentmssg = "";

function myFunction($value) {
//converter to symbol from alpha value
if ($value == "u" || $value == "i"){
  $currentmssg += '<img class="voweli" src=images/'+$value+'.png>';
} else {
  $currentmssg += '<img src=images/'+$value+'.png>';
}
document.getElementById("output").innerHTML = $currentmssg;
}

function submitTxt() {
//a = $txt.split(" ")
// a[0] list through all chars find "a", "i", "u" and split after them.
//document.getElementById("converter").submit();
document.getElementById("toconverttxt").submit();
}

// name = name in input form that is in the url
function getURLParameter(name) {
//return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
$a = decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
return convertTxt($a);
}

//convert the pulled txt into the symbal pairs ready for conversion
function convertTxt($txt) {
//need a loop to check surrounding characters to see what the symbol will be.
$wordPairs = []; //list of words in the sentance
$charPairs = []; // final product of broken char pairs

$consonants = [
"s","d",
"f","g",
"h","j",
"k","l",
"m","n",
"b","v",
"c","x",
"z","q",
"w","r",
"t","y",
"p"];

$vowels = [
'a',
'i',
'u'];
$txt = $txt.split(" ");
//first [] finds the word second [] is a character.
// use for loops to then pair the chars and append them to the loop.
//return $txt[0][0]; //loop through this split. word by word and char by char

  for($i = 0; $i < $txt.length;$i++){
    $wordPairs.push($txt[$i]);
    for($j = 0; $j < $wordPairs[$i].length;$j++){
      if ($wordPairs[$i][$j] == "s" && $wordPairs[$i][$j+1] == "h"){ // must find out if the s could be a sh
//if vowel before, then consonant after (ashta), write sh
        if (($vowels.includes($wordPairs[$i][$j-1]) && $vowels.includes($wordPairs[$i][$j+3])) || ($vowels.includes($wordPairs[$i][$j+3]))) {
          $charPairs.push($wordPairs[$i][$j] + $wordPairs[$i][$j+1]);
          $j++;
// if vowel after sh and consonant before write sha
        } else if ($vowels.includes($wordPairs[$i][$j+2]) && $consonants.includes($wordPairs[$i][$j-1])) {
          $charPairs.push($wordPairs[$i][$j] + $wordPairs[$i][$j+1] + $wordPairs[$i][$j+2]);
          $j+=2;
        } else {
          $charPairs.push($wordPairs[$i][$j]);
        }
// if normal cv pair and dosn't mach above statements push it
      } else if ($consonants.includes($wordPairs[$i][$j]) && $vowels.includes($wordPairs[$i][$j+1])){
        $charPairs.push($wordPairs[$i][$j] + $wordPairs[$i][$j+1]);
        $j+=1;

// if do not match anything else it must be a singal char cv "(c)" cv
      } else {
        $charPairs.push($wordPairs[$i][$j]);
      }
    }
//when a word is finished push a space
    $charPairs.push(" ");
  }

//return an array with the final pairs in order of their final sets "shasfi" = [sha, s, fi]
console.log($charPairs);
}

// convert the symbal pairs into the image names and then display them using myFunction()
function translateTxt() {
// everything originally will translate to a ca then have the u||i placed on after

}
