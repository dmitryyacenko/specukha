Router.route('/addEmployer', function(){
    this.layout('mainLayout');
    this.render('addEmployer',{
        data:{
            addActive:'active'
        }
    });
})