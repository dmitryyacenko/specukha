Template.header.events({
    'submit .form-inline':function(e){
        e.preventDefault();
        var ed=Employers.findOne({number:e.currentTarget.tabnum.value});
        if(!ed){
            sAlert.error('Работник с таким табельным номером не найден');
            return false;
        }
        var id=ed._id;
        Router.go('/employer/'+id);

    }
})