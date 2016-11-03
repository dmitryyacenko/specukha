Router.route('/addItem', function(){
    this.layout('mainLayout');
    this.render('addItem',{
        data:{
            addActive:'active'
        }
    });
})