const AD = require('ad');
const ad = new AD({
    url: "ldap://172.16.67.122:389",
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

        var exists = await ad.user('ravi.pandey').exists();
       await console.log("User is present in the system " + exists);


        if (!exists) {
            console.log("user not present in the AD hence creating the Record");
            // creating new user due to not found in AD
            var createduser = await ad.user().add({
                userName: 'ravi.pandey',
                firstName: 'ravi',
                lastName: 'pandey',
                location: 'India/BLR/sapphire/Users',
                title: 'Engineer',
                //commonName:'Aishwarya p',
                password: 'Brillio@123!@#$%^&&*',
                email: 'ravi.pandey@BRILLIOLAB.LOCAL'

            })
           await console.log("new user created in AD " + JSON.stringify(createduser));
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
