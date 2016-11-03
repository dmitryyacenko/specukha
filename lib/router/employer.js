Router.route('/employer/:id', function(){
    this.layout('mainLayout');
    var e=Employers.findOne({_id:this.params.id});
    if(!e){
        this.render('notfound');
    }
    this.render('employer', {
        data:e
    })
});