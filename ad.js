const AD = require('ad');
var generator = require('generate-password');

var password = generator.generate({
    length: 10,
    numbers:true,
    symbols:true,
    uppercase:true,
    strict:true
});
 
console.log(password);

const ad = new AD({
    url: "ldaps://172.16.67.122",
    //url:'ldap://BRL2016-AD',
    user: "mahesh.alavala@BRILLIOLAB.LOCAL",
    pass: "brillio@2019"
});

// console.log(JSON.stringify(ad.addUser()));

// // Getting all users from AD
// ad.user().get().then(users => {
//     console.log('Your users:', users);
// }).catch(err => {
//     console.log('Error getting users:', err);
// });

(async () => {
    try {
        userName="sridhar.v3"

        var exists = await ad.user(userName).exists();
       await console.log("User is present in the system " + exists);


        if (!exists) {
            console.log("user not present in the AD hence creating the Record");
            // creating new user due to not found in AD
            var createduser = await ad.user().add({
                userName: userName,
                firstName: 'sridhar',
                lastName: 'v3',
                location: 'India/BLR/sapphire/Users',
                title: 'Engineer',
                //commonName:'Aishwarya p',
                password: password,
                email: 'sridhar.v3@BRILLIOLAB.LOCAL'

            })
           await console.log("new user created in AD " + JSON.stringify(createduser));
           var enbleuser = await ad.user(userName).enable()
           console.log ("User enabled"+JSON.stringify(enbleuser));
            // var details = await ad.user('ravi.pandey').get();
            // console.log("created User details "+JSON.stringify(details));

            // // to get all users details
            // await ad.user().get().then(users => {
            // console.log('Your users:', users);
            // }).catch(err => {
            //     console.log('Error getting users:', err);
            // });

        }


    } catch (err) {
        console.log(err.message)
    }
})();
