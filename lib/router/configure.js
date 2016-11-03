Router.configure({
    loadingTempalte:'loading',
    waitOn:function(){
        return [Meteor.subscribe('Areas'), Meteor.subscribe('Items'), Meteor.subscribe('Gives'), Meteor.subscribe('Employers'), Meteor.subscribe('Positions')];
    }
});
Router.onBeforeAction(function() {
    if (! Meteor.userId()) {
        this.layout('mainLayout')
        this.render('login');
    } else {
        this.next();
    }
});