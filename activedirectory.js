var ActiveDirectory = require('activedirectory');
var config = {
    url: 'ldap://172.16.67.119',
    baseDN: 'dc=BRILLIOLAB,dc=LOCAL',
    username: 'mahesh.alavala@BRILLIOLAB.LOCAL',
    password: 'hello@123456'
}

var ad = new ActiveDirectory(config);
//var sAMAccountName = 'mahesh.alavala@BRILLIOLAB.LOCAL';
var userPrincipalName = 'aishwarya.p';


ad.findUser(userPrincipalName, function(err, user) {
    if (err) {
        console.log('ERROR: ' + JSON.stringify(err));
        return;
    }

    if (!user) {
        console.log('User: ' + userPrincipalName + ' not found.');
        

    } else {
        console.log("User details are " + JSON.stringify(user));
    }
});