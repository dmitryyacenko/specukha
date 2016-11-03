import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
    if(Meteor.users.find().count()==0){
        var id=Accounts.createUser({
            'username':'admin',
            'password':'password'
        });
        Roles.addUserToRoles(id, 'admin');
    }
});
