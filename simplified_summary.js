const readline = require('readline');
const v3 =require('watson-developer-cloud/personality-insights/v3');
const auth = new v3({
    username: "1b66c6a1-a6e6-4c68-8c35-d7babfca283a",
    password: "HaBx2QdzxoGu",
    version_date: "2017-10-13"
});

const summaries = require('personality-text-summary');
const from_resp = new summaries({
  locale: 'en',
  version: 'v3'
});


const read = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

read.question('Paste here for a summary analysis:   ', (text) => {

  let parameters = {
    content: text,
    content_type: 'text/plain',
    raw_scores: true,
    consumption_preferences: true
  };

  auth.profile(parameters, function (error, response) {
    if (error)
      console.log('Error:', error);
    else
      console.log('\n');
      console.log(from_resp.getSummary(response));
  });

  read.close();
});
