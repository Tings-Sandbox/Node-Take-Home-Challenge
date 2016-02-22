var util = require('util');
var parse = require('csv-parse');
var fs = require('fs');


//Prompt User For Number of Questions
var number;
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

//MAIN FUNCTION: returns an array of questionids according to specifications
function returnQuestionIds(number) {
  // console.log(number, "number of questions");
  var qIds = [];

  readCSV(__dirname+'/questions.csv', function(allQ){
    var groupedQ = groupQuestions(allQ);
    
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
    console.log(qIds);
    return qIds;
  });
};





/*****************************HELPER FUNCTIONS***********************************/
function readCSV(file, cb){
  var rs = fs.createReadStream(file);
  var parser = parse({columns: true}, function(err, output){
    cb(output)
  });
  rs.pipe(parser);
}

function groupQuestions(allQ){
  var groupedQ = [[],[]];
  
  allQ.forEach(function(question){
    var bucket = groupedQ[question.strand_id-1][question.standard_id-1];
    
    if (bucket !== undefined){
      bucket.push(question);
    } else {
      groupedQ[question.strand_id-1][question.standard_id-1] = [question];
    }
  })

  groupedQ[1] = cleanArray(groupedQ[1]);
  // console.log(util.inspect(groupedQ, false, null));
  return groupedQ;
}

function cleanArray(actual) {
  var newArray = new Array();
  for (var i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}


function done() {
  console.log('Bye!');
  process.exit();
}




