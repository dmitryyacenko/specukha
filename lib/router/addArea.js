Router.route('/addArea', function(){
    this.layout('mainLayout');
    this.render('addArea',{
        data:{
            addActive:'active'
        }
    });
})