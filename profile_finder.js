const readline = require('readline');
const Json2csvParser = require('json2csv').Parser;
const fs = require('fs')
const v3 =require('watson-developer-cloud/personality-insights/v3');
const auth = new v3({
    username: "1b66c6a1-a6e6-4c68-8c35-d7babfca283a",
    password: "HaBx2QdzxoGu",
    version_date: "2017-10-13"
});

const read = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

read.question('Please enter a short paragraph for Watson to analyze...', (text) => {

  let params = {
    content: text,
    content_type: 'text/plain',
    accept: 'text/csv',
    raw_scores: true,
    consumption_preferences: true
  };
  
  auth.profile(params, function(error, response) {
  if (error)
    console.log('Error:', error);
  else{
    console.log(JSON.stringify(response, null, 2));
    const parser = new Json2csvParser(response);
    const outp = parser.parse(response);

    fs.writeFile("output.txt", (JSON.stringify(response, null, 2)), function(err) {
        if(err) {
            return console.log(err);
        }})
  
    }
  }
);

  read.close();
});