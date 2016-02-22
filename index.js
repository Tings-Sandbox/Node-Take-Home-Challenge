process.stdin.resume();
process.stdin.setEncoding('utf8');
var util = require('util');
var parse = require('csv-parse');
var fs = require('fs');


var number;

//Prompt User For Number of Questions
process.stdin.on('data', function (text) {
  console.log('How many questions:', util.inspect(text));
  if (text > 0) {
    number = text;
    returnQuestionIds(parseInt(number));
    done();
  }
});

//returns an array of questionids according to specifications
function returnQuestionIds(number) {
  console.log(number, "number of questions");
  var qIds = [];

  readCSV(__dirname+'/questions.csv', function(allQ){
    var groupedQ = groupQuestions(allQ);
    
    //dive into each layer of arrays, calculating number of questions to pass along to the next layer. it will push the respective number of questions into the qIds
    function recurse (set, numberOfQs){
      if (Array.isArray(set[0])){
        //does not yet account for unevenly divisible numbers
        var newNumberOfQs = parseInt(numberOfQs/set.length);
        
        console.log(parseInt(newNumberOfQs), "newNumberOfQs");
        
        set.forEach(function(subset){
          recurse(subset,newNumberOfQs);
        })
      } else {
        var counter = 0;
        var index = counter % set.length;
        while (counter < numberOfQs){
          qIds.push(set[index].question_id);
          counter++;
          index = counter % set.length;
          console.log(set);  
        }
      }
    }

    recurse(groupedQ, number);
    console.log(qIds);
    return qIds;
  });
};





//HELPER FUNCTIONS
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
  console.log(util.inspect(groupedQ, false, null));
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
  console.log('Now that process.stdin is paused, there is nothing more to do.');
  // process.exit();
}




