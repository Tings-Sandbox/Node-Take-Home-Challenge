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
  readCSV(__dirname+'/questions.csv', function(allQ){
    console.log("allQ", allQ);
    var groupedQ = groupQuestions(allQ);
    
  });
};

//HELPER FUNCTIONS
function readCSV(file, cb){
  console.log('file',file);
  var rs = fs.createReadStream(file);
  var parser = parse({columns: true}, function(err, output){
    console.log(output);
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




