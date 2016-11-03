Meteor.publish('Employers', function(){
    return this.userId?Employers.find():Employers.find({_id:'fakeid'});
});

Meteor.publish('Areas', function(){
    return this.userId?Areas.find():Areas.find({_id:'fakeid'});
});

Meteor.publish('Items', function(){
    return this.userId?Items.find():Items.find({_id:'fakeid'});
});

Meteor.publish('Gives', function(){
    return this.userId?Gives.find():Gives.find({_id:'fakeid'});
});

Meteor.publish('Positions', function(){
    return this.userId?Positions.find():Positions.find({_id:'fakeid'});
});