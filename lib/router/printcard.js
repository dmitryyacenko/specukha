Router.route('/printcard/:id', function(){
    var id=this.params.id;
    var e=Employers.find({number:id}).fetch();
    if(e.length==0){
        this.render('notfound');
    }
    this.render('printcard',{
        data:e[0]
    });
})