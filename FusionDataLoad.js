var request = require('request');
var uname = 'Integrations';
var pword = 'Brillio@123';
var http = require('https');
var moment = require('moment');




pathUri = 'https://hcgt.hcm.us1.oraclecloud.com/hcmRestApi/resources/11.13.18.02/emps?q=HireDate='+moment().format('YYYY-MM-DD')

// var result =request.get(https://hcgt.hcm.us1.oraclecloud.com/hcmRestApi/resources/11.13.18.02/emps?q=HireDate='+moment().format('YYYY-MM-DD')').auth(uname, pword, false);

// console.log("result having "+result);

//  Using the http request method
pathUri = '/hcmRestApi/resources/11.13.18.02/emps?q=HireDate='+moment().format('YYYY-MM-DD')

//console.log("PATH URI "+pathUri);

// Generate Request Options
var options = {
    //ca: fs.readFileSync('HCM Cert'), //get HCM Cloud certificate - either through openssl or export from web browser
    host: 'hcgt.hcm.us1.oraclecloud.com',
    port: 443,
    //path: pathUri,
    path: pathUri,
    "rejectUnauthorized" : false,
    headers: {
    'Authorization': 'Basic ' + new Buffer(uname + ':' + pword).toString('base64')
    }};

    http.get(options, function(res) {
        var body = '';
        res.on('data', function(chunk) {
          body += chunk;
        });
        res.on('end', function() {
          console.log("Body is having"+body);
        });
      }).on('error', function(e) {
        console.log("Got error: " + e.message);
      }); 
    