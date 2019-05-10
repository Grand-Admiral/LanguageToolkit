//need array for data entered
$currentmssg = "";

function myFunction($value) {
//converter to symbol from alpha value
if ($value == "u" || $value == "i"){
  $currentmssg += '<img class="voweli" src=images/'+$value+'.png>';
}

else if ($value == " ") {
  $currentmssg += '<img src=images/space.png>';
}

else if ($value == "ly") {
  $currentmssg += '<img src=images/lamd.png>';
}
else if ($value == "lya") {
  $currentmssg += '<img src=images/lamda.png>';
}

else {
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

$numbers = ["1","2","3","4","5","6","7","8","9","0"];
$numberSubmit = 0;
$txt = $txt.toLowerCase();
$txt = $txt.split(" ");
//first [] finds the word second [] is a character.
// use for loops to then pair the chars and append them to the loop.
//return $txt[0][0]; //loop through this split. word by word and char by char

  for($i = 0; $i < $txt.length;$i++){
    $wordPairs.push($txt[$i]);
    for($j = 0; $j < $wordPairs[$i].length;$j++){

//if $numbers
      if ($numbers.includes($wordPairs[$i][$j])) {
        $x = $j;
        //find how many chars are numbers in this instance
        while ($numbers.includes($wordPairs[$i][$x])) {
          $x++;
        }
        //console.log($x);
        for ($h = 0; $h < $x; $h++) {
          $numberSubmit += $wordPairs[$i][$j+$h];
        }
        //!!!!!!!!!!!!!must break this found number into its smaller components !!!!!!!!!!!!!!!!!!!!!!!
        console.log(Number($numberSubmit));
        if ($numberSubmit == 0) { // if 0 return 0
          $charPairs.push("0");
        } else {
          $numberSubmit = Math.ceil($numberSubmit);
          for ($selectNum = 624; $selectNum >= 1; $selectNum -=156) {
            if ($numberSubmit >= $selectNum) {
              $times = $numberSubmit / $selectNum; //number of times this number can fit inside the select num
              while ($times >= 1) {
                $charPairs.push(String($selectNum));
                $times --
              }
              $numberSubmit = $times * $selectNum; //whatever is left over is magnified and moved on to the next smallest number
              if ($numberSubmit >= 0.9999999999999991 && $numberSubmit < 1) { //catch stupid calculation error
                $numberSubmit = 1;
              }
              console.log("Large: "+$numberSubmit);
            }
          }


          //groups of 144
          // no idea what the picture will be yet

          //groups of 12
          // numbers 12 - 144. This is because there are 3 pillars so 48*3 |||
          $numberSubmit = Math.ceil($numberSubmit);
          for ($selectNum = 48; $selectNum >= 1; $selectNum -=12) {
            if ($numberSubmit >= $selectNum) {
              $times = $numberSubmit / $selectNum; //number of times this number can fit inside the select num
              while ($times >= 1) {
                $charPairs.push(String($selectNum));
                $times --
              }
              $numberSubmit = $times * $selectNum; //whatever is left over is magnified and moved on to the next smallest number
              if ($numberSubmit >= 0.9 && $numberSubmit < 1) { //catch stupid calculation error
                $numberSubmit = 1;
              }
              console.log("Med: "+ $numberSubmit);
            }
          }

          //individual numbers 1-11
          $numberSubmit = Math.ceil($numberSubmit);
          for ($selectNum = 11; $selectNum >= 1; $selectNum --) {
            if ($numberSubmit >= $selectNum) {
              $times = $numberSubmit / $selectNum; //number of times this number can fit inside the select num
              while ($times >= 1) {
                $charPairs.push(String($selectNum));
                $times --
              }
              $numberSubmit = $times * $selectNum; //whatever is left over is magnified and moved on to the next smallest number
              console.log("Small: "+ Math.ceil($numberSubmit));
            }
          }
        }

        //$charPairs.push($numberSubmit);
        $j+=$x-1 //once found all numbers for this set go to the last char of this set so the loop can start at the next set
        //console.log($charPairs); //check that logs the number to convert
      }
//find out if eth is cv or c. no need for th find or t and h yet as e is never used except for this instance.
      else if ($wordPairs[$i][$j] == "e" && $wordPairs[$i][$j+1] == "t" && $wordPairs[$i][$j+2] == "h"){
        if (($consonants.includes($wordPairs[$i][$j-1]) && $vowels.includes($wordPairs[$i][$j+3])) || ($wordPairs[$i][$j-1] == null &&  $vowels.includes($wordPairs[$i][$j+3]))) { //consonant befor or null it is cv
          $charPairs.push($wordPairs[$i][$j] + $wordPairs[$i][$j+1] + $wordPairs[$i][$j+2] + $wordPairs[$i][$j+3]);
          $j+=3;
        } else { //it is just a normal c
          $charPairs.push($wordPairs[$i][$j] + $wordPairs[$i][$j+1] + $wordPairs[$i][$j+2]);
          $j+=2;
        }
      }

  // ny pairs
    else if ($wordPairs[$i][$j] == "n" && $wordPairs[$i][$j+1] == "y"){ // must find out if the s could be a sh
    //if vowel before, then consonant after (anyta), write th
      if (($vowels.includes($wordPairs[$i][$j-1]) && $vowels.includes($wordPairs[$i][$j+3])) || ($consonants.includes($wordPairs[$i][$j+2])) || $wordPairs[$i][$j+2] == null ) {
        $charPairs.push($wordPairs[$i][$j] + $wordPairs[$i][$j+1]);
        $j++;
      }
    // if vowel after th and consonant before write tha
      else if (($vowels.includes($wordPairs[$i][$j+2]) && $consonants.includes($wordPairs[$i][$j-1])) ||  ($vowels.includes($wordPairs[$i][$j+2]) && $wordPairs[$i][$j-1] == null) ){
        $charPairs.push($wordPairs[$i][$j] + $wordPairs[$i][$j+1] + $wordPairs[$i][$j+2]);
        $j+=2;
      } else {
        $charPairs.push($wordPairs[$i][$j]);
      }

    }

  // ly pairs
    else if ($wordPairs[$i][$j] == "l" && $wordPairs[$i][$j+1] == "y"){ // must find out if the s could be a sh
    //if vowel before, then consonant after (ashta), write th
      if (($vowels.includes($wordPairs[$i][$j-1]) && $vowels.includes($wordPairs[$i][$j+3])) || ($consonants.includes($wordPairs[$i][$j+2])) || $wordPairs[$i][$j+2] == null ) {
        $charPairs.push($wordPairs[$i][$j] + $wordPairs[$i][$j+1]);
        $j++;

      }
    // if vowel after th and consonant before write tha
      else if (($vowels.includes($wordPairs[$i][$j+2]) && $consonants.includes($wordPairs[$i][$j-1])) ||  ($vowels.includes($wordPairs[$i][$j+2]) && $wordPairs[$i][$j-1] == null) ){
        $charPairs.push($wordPairs[$i][$j] + $wordPairs[$i][$j+1] + $wordPairs[$i][$j+2]);
        $j+=2;
      } else {
        $charPairs.push($wordPairs[$i][$j]);
      }

    }

// find th pairs
      else if ($wordPairs[$i][$j] == "t" && $wordPairs[$i][$j+1] == "h"){ // must find out if the s could be a sh
      //if vowel before, then consonant after (ashta), write th
        if (($vowels.includes($wordPairs[$i][$j-1]) && $vowels.includes($wordPairs[$i][$j+3])) || ($consonants.includes($wordPairs[$i][$j+2])) || $wordPairs[$i][$j+2] == null ) {
          $charPairs.push($wordPairs[$i][$j] + $wordPairs[$i][$j+1]);
          $j++;

        }
      // if vowel after th and consonant before write tha
        else if (($vowels.includes($wordPairs[$i][$j+2]) && $consonants.includes($wordPairs[$i][$j-1])) ||  ($vowels.includes($wordPairs[$i][$j+2]) && $wordPairs[$i][$j-1] == null) ){
          $charPairs.push($wordPairs[$i][$j] + $wordPairs[$i][$j+1] + $wordPairs[$i][$j+2]);
          $j+=2;
        } else {
          $charPairs.push($wordPairs[$i][$j]);
        }

      }

      else if ($wordPairs[$i][$j] == "s" && $wordPairs[$i][$j+1] == "h"){ // must find out if the s could be a sh
//if vowel before, then consonant after (ashta), write sh
        if (($vowels.includes($wordPairs[$i][$j-1]) && $vowels.includes($wordPairs[$i][$j+3])) || ($consonants.includes($wordPairs[$i][$j+2])) || $wordPairs[$i][$j+2] == null ) {
          $charPairs.push($wordPairs[$i][$j] + $wordPairs[$i][$j+1]);
          $j++;

        }
// if vowel after sh and consonant before write sha
        else if (($vowels.includes($wordPairs[$i][$j+2]) && $consonants.includes($wordPairs[$i][$j-1])) ||  ($vowels.includes($wordPairs[$i][$j+2]) && $wordPairs[$i][$j-1] == null) ){
          $charPairs.push($wordPairs[$i][$j] + $wordPairs[$i][$j+1] + $wordPairs[$i][$j+2]);
          $j+=2;
        } else {
          $charPairs.push($wordPairs[$i][$j]);
        }

      }
// if normal cv pair and dosn't mach above statements push it
      else if ($consonants.includes($wordPairs[$i][$j]) && $vowels.includes($wordPairs[$i][$j+1])){
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
//console.log($charPairs);
translateTxt($charPairs);
}

// convert the symbal pairs into the image names and then display them using myFunction()
function translateTxt($pairs) {
// everything originally will translate to a ca then have the u||i placed on after

//find if the cv is a,i,u
//break down the pair and extract the vowelreplacing it with the a
// create an array and place the vowel in the correct spot according to the c. drop if an a.

//run through myFunction($value) and it will append the correct image.
console.log($pairs);
  $word = ""; //builds the word until hits a vowel
  for (i = 0; i < $pairs.length; i++){
    if ($pairs[i].includes("a") || $pairs[i].includes("i") || $pairs[i].includes("u")){
      for (j = 0; j <= $pairs[i].length; j++){
        if ($pairs[i][j] == "a") {
          $pairs[i] = $word + "a";
          myFunction($pairs[i]);
        } else if ($pairs[i][j] == "i") {
          $pairs[i] = $word+"a";
          myFunction("i");
          myFunction($pairs[i]);
        } else if ($pairs[i][j] == "u") {
          $pairs[i] = $word + "a";
          myFunction($pairs[i]);
          myFunction("u");
        } else {
          $word += $pairs[i][j];
        }
      }
      $word = "";
    } else {
      myFunction($pairs[i]);
    }

    console.log($pairs);
  }
}
