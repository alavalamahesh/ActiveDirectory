var ldap = require('ldapjs');
var client = ldap.createClient({
  url: 'ldap://172.16.67.122:1389'
});