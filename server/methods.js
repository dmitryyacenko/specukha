Meteor.methods({
    'createFallUser':function(username, password, role){
        var id=Accounts.createUser({
            username:username,
            password:password
        });
        Roles.addUserToRoles(id, role);
    }
})