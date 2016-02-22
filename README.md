## Node Coding Challenge 
Below are my notes on Things I learned while doing this challenge.

### How to listen for input using node
[x] listens for 'quit' and exits out
[x] convert the text to integers

```
process.stdin.resume();
process.stdin.setEncoding('utf8');
console.log('Hi, enter a number for your questtion Ids or type quit.');
process.stdin.on('data', function (text) {
  if (text > 0) {
    number = text;
    returnQuestionIds(parseInt(number));
  } if (text === 'quit\r\n' || text === 'quit\n'){
    done();
  }
});

function done() {
  console.log('Bye!');
  process.exit();
}

```

### How to convert a Comma Separated Value (.csv) File with a header to an array/object

```
var parse = require('csv-parse');
var fs = require('fs');

function readCSV(file, cb){
  var rs = fs.createReadStream(file);
  var parser = parse({columns: true}, function(err, output){
    cb(output)
  });
  rs.pipe(parser);
}

readCSV(__dirname+'/questions.csv', function(allQ){
  //your array here
}

```

### How to clean an array polluted with undefined values
```
function cleanArray(actual) {
  var newArray = new Array();
  for (var i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}
```

### Basic Approach to the Problem
I have attached the prompt after the solutions. Feel free to scroll down and take a look at the problem I'm trying to solve.  

My approach to the problem involved organizing the questions into arrays, and then using the array lengths to determine how many questions we need to grab from the subarrays. 
 
My main array has two arrays -- one for strand1, the other for strand 2. each strand is represented by an array itself, and contains 'standard' arrays. The standard arrays then hold the Questions themselves, which are represented by objects. 

For eg. if I am looking for 6 questions, my algorithm would determine that since there are two strands (array.length =2), I will need to retrieve 3 questions from each strand. Then the number of questions will be split once again based on how many standards are in that strand.

### Modified Approach that Handles Numbers that are not Evenly Divisible

groupedQ is our questions organized into its proper array and number is the number of questions we requested. 
We need to determine what's the remainingNumOfQs at each level, and spread that number out evenly amongst all the questions in that group. 

```
function recurse (set, numberOfQs){
  if (Array.isArray(set[0])){

    var newNumberOfQs = parseInt(numberOfQs/set.length);
    var remainingNumOfQs = parseInt(numberOfQs%set.length);

    // console.log(parseInt(newNumberOfQs), "newNumberOfQs");
    
    set.forEach(function(subset){
      if (remainingNumOfQs > 0) {
        recurse(subset,newNumberOfQs+1);
        remainingNumOfQs--;
      } else {
        recurse(subset,newNumberOfQs);
      }
    })

  } else {
    var counter = 0;
    var index = counter % set.length;
    while (counter < numberOfQs){
      qIds.push(set[index].question_id);
      counter++;
      index = counter % set.length;
      // console.log(set);  
    }
  }
}

recurse(groupedQ, number);
``` 





## The Prompt

An educational software company is deciding performantly how to show students the right mix of content.  By choosing the right cross-section of content we can ensure that:
  1.  Students achieve content mastery in the least amount of time, and
  2.  Students don't get bored with the same questions.

We base our decision on a number of factors:
  * Student ability
  * Questions students have already seen
  * Pedagogical hierarchy
    ...and more

## Node Challenge (2 hours)

We are providing you with two csv files:

`questions.csv` and `usage.csv`

The `questions.csv` file contains a mini-taxonomy.  This taxonomy consists of __Strands__, __Standards__, and __Questions__.  Strands have many Standards, and Standards have many Questions. Questions have a difficulty rating between 0 and 1, where 1 means everyone always gets the question correct, and 0 means no one ever does.

The `usage.csv` file contains the relevant student usage.  Each row describes a single student seeing and possibly answering a single question. Questions are first assigned to the student, and then at a later time, the student may answer the question.

We would like you to write a program in node to select questions for a quiz. Please feel free to use any libraries you choose.

### Basic Requirements
[x] The program should prompt the user for the number of questions to put in the quiz. Any integer value greater than 0 is acceptable.
[x] The expected output is to display a list of question_ids
[x] Use each strand as close as possible to an equal number of times. (e.g. There are two strands, so if the user asks for a 3 question quiz, it's okay to choose one strand twice and the other once.)
[x] Use each standard as close as possible to an equal number of times.
[x] Duplicating questions in the quiz is OKAY!
[x] Not completing the basic requirements IS NOT FAILURE.  We'd rather see a beautiful attempt than a complete attempt.
[x] Please use git to track progress. E.g. progressively commit changes so we can track your thought process.

### Bonus Requirements
Choose any or all of the following, time permitting:
[] Order the questions in the quiz from easiest to hardest
[] Prefer questions that students have not answered.
[] Prefer questions that students have not been assigned.
[] Group the questions by standard, and then order the questions within each standard by difficulty (easiest to hardest)

### General Guidelines
* This is not an assessment of your front-end prowess. Function over form.
* You only have two hours. Take shortcuts, but leave real solution in comments. If you have enough time at the end, you can go back and make your solution less ugly.
* You will be assessed on both how well your function works, and how well your code reads.

##### Finally:  a tip (or, maybe a challenge!):
[] If you're about to begin, and you think to yourself: "I think I should use rails!" then you should know that nobody who has ever gone down that rabbit hole has ever succeeded. THERE BE DHHRAGONS!

-[Good luck!](https://s3-us-west-2.amazonaws.com/static.noredink.com/stan-carey-doge-meme-wow-such-win-because-grammar-so-amaze-much-usage-very-language.jpg)

