const AD = require('ad');
const ad = new AD({
    url: "ldap://172.16.67.119",
    user: "mahesh.alavala@BRILLIOLAB.LOCAL",
    pass: "hello@123456"
});


(async () => {
    try {
        console.log("Entered into try block");
        var exists=await ad.user('aishwarya.p').exists();
        console.log("User existed in the system "+exists)

        if(exists){
            console.log("Entered into if condition block");
            var details = await ad.user('Aishwarya.p').get();
            console.log("User details "+JSON.stringify(details))
            // Removing the user fro AD 
            var isDeleted = await ad.user("Aishwarya.p").remove()
            console.log("Removed user "+JSON.stringify(isDeleted.success))
        }
 
    } catch(err) {
        // ...
    }
})();