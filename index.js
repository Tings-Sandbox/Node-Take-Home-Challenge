//Prompt User For Number of Questions
process.stdin.resume();
process.stdin.setEncoding('utf8');
var util = require('util');
var parse = require('csv-parse');
var fs = require('fs');


var number;

process.stdin.on('data', function (text) {
  console.log('How many questions:', util.inspect(text));
  if (text > 0) {
    number = text;
    pickQuestions(parseInt(number));
    done();
  }
});

function pickQuestions(number) {
  console.log(number, "number of questions");
  readCSV(__dirname+'/questions.csv');
};

function readCSV(file){
  console.log('file',file);
  var rs = fs.createReadStream(file);
  var parser = parse({columns: true}, function(err, output){
    console.log(output);
  });

  rs.pipe(parser);
}

function done() {
  console.log('Now that process.stdin is paused, there is nothing more to do.');
  // process.exit();
}




