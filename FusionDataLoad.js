

var request = require('request');
var uname = 'Integrations';
var pword = 'Brillio@123';
var http = require('https');
var moment = require('moment');

var addUserObj = {};


//pathUri = 'https://hcgt.hcm.us1.oraclecloud.com/hcmRestApi/resources/11.13.18.02/emps?q=HireDate='+moment().format('YYYY-MM-DD')

// var result =request.get(https://hcgt.hcm.us1.oraclecloud.com/hcmRestApi/resources/11.13.18.02/emps?q=HireDate='+moment().format('YYYY-MM-DD')').auth(uname, pword, false);

// console.log("result having "+result);

//  Using the http request method
//pathUri = '/hcmRestApi/resources/11.13.18.02/emps?q=HireDate='+moment().format('YYYY-MM-DD')
pathUri = '/hcmRestApi/resources/11.13.18.02/emps?q=HireDate="2019-05-23"'
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

          var FirstName =JSON.parse(body).items[0].FirstName
          console.log("First name: "+FirstName);
          addUserObj.firstName=FirstName;
          var LastName=JSON.parse(body).items[0].LastName
          console.log("Last name: "+LastName);
          addUserObj.lastName =LastName;
          
          var MiddleName=JSON.parse(body).items[0].MiddleName
          console.log("Middle name: "+MiddleName);

          var DisplayName=JSON.parse(body).items[0].DisplayName
          console.log("Display name: "+DisplayName);
          addUserObj.commonName =DisplayName;          
          var PersonNumber=JSON.parse(body).items[0].PersonNumber
          console.log("Employee Number: "+PersonNumber);
          
          var HomePhoneNumber=JSON.parse(body).items[0].HomePhoneNumber
          console.log("Home phone number "+HomePhoneNumber);
          
          var Email=JSON.parse(body).items[0].UserName
          console.log("Username and Mail ID "+Email);
          addUserObj.email=Email;
          var userName = Email.substring(0, Email.indexOf('@'));
          console.log("Username of employee  "+userName);
          addUserObj.userName=userName;
          var Assignmentlinks=JSON.parse(body).items[0].links[17].href
          console.log("links For Assignment "+Assignmentlinks);

          // var Assignmentlinks=JSON.parse(body).items[0].links[17].href
          // console.log("links For Assignment "+Assignmentlinks);

          // var Assignmentlinks=JSON.parse(body).items[0].links[17].href
          // console.log("links For Assignment "+Assignmentlinks);
          var LinkAuth = {  
            url: Assignmentlinks,
            auth: {
                username: uname,
                password: pword
            }
        };

        request.get(LinkAuth,function (error, response, body) {
          console.error('error:', error); // Print the error if one occurred
          console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
          console.log('Assignment Number of employee : ', JSON.parse(body).items[0].AssignmentNumber); 
          console.log('Designation of Employee : ', JSON.parse(body).items[0].AssignmentName);
          addUserObj.title=JSON.parse(body).items[0].AssignmentName;
          var ManagerLinks = JSON.parse(body).items[0].links[7].href;
          console.log('link for Manager ID  : ', JSON.parse(body).items[0].links[7].href);
          console.log('ManagerLink having  : ', ManagerLinks);
          
          var ManagerLink = {  
            url: ManagerLinks,
            auth: {
                username: uname,
                password: pword
            }
        };          
        var PersonIdMan;
          request.get(ManagerLink,function (error, response, body) {
            console.error('error for accessing manager link :', error); // Print the error if one occurred
            console.log('statusCode of manager link :', response && response.statusCode); // Print the response status code if a response was received
            PersonIdMan = JSON.parse(body).items[0].PersonId
            console.log(' Person ID of manager  : ', PersonIdMan); 
            console.log('Manager Person ID : ', JSON.parse(body).items[0].PersonId); 

            ManagerMailClickLink = "https://hcgt.hcm.us1.oraclecloud.com:443/hcmRestApi/resources/11.13.18.02/emps?q=PersonId="+PersonIdMan;
          
            console.log("Manager rest service is : ",ManagerMailClickLink)
            var ManagermailClickOpt = {  
              url: ManagerMailClickLink,
              auth: {
                  username: uname,
                  password: pword
              }
          };          
  
            request.get(ManagermailClickOpt,function (error, response, body) {
              console.error('error for accessing manager link  rest API:', error); // Print the error if one occurred
              console.log('statusCode of manager link rest API:', response && response.statusCode); // Print the response status code if a response was received
              console.log('Manager Email ID : ', JSON.parse(body).items[0].WorkEmail); 
              console.log("Object having values "+JSON.stringify(addUserObj))                      
            });
      
          });
          
        });
        });
      }).on('error', function(e) {
        console.log("Got error: " + e.message);
      }); 

      module.exports = addUserObj;