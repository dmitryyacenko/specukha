Areas.allow({
    'insert':(id, doc)=>Meteor.userId()&&(!Roles.userHasRole(id, 'head')),
    'remove':(id, doc)=>Meteor.userId()&&(!Roles.userHasRole(id, 'head')),
    'update':(id, doc)=>Meteor.userId()&&(!Roles.userHasRole(id, 'head'))
});

Items.allow({
    'insert':(id, doc)=>Meteor.userId()&&(!Roles.userHasRole(id, 'head')),
    'remove':(id, doc)=>Meteor.userId()&&(!Roles.userHasRole(id, 'head')),
    'update':(id, doc)=>Meteor.userId()&&(!Roles.userHasRole(id, 'head'))
});

Employers.allow({
    'insert':(id)=>Meteor.userId(),
    'remove':(id)=>Meteor.userId(),
    'update':(id)=>Meteor.userId()
});

Gives.allow({
    'insert':(id, doc)=>Meteor.userId()&&(!Roles.userHasRole(id, 'head')),
    'remove':(id, doc)=>Meteor.userId()&&(!Roles.userHasRole(id, 'head')),
    'update':(id, doc)=>Meteor.userId()&&(!Roles.userHasRole(id, 'head'))
});

Positions.allow({
    'insert':(id, doc)=>Meteor.userId()&&(!Roles.userHasRole(id, 'head')),
    'remove':(id, doc)=>Meteor.userId()&&(!Roles.userHasRole(id, 'head')),
    'update':(id, doc)=>Meteor.userId()&&(!Roles.userHasRole(id, 'head'))
})