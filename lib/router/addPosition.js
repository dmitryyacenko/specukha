Router.route('/addPosition', function(){
    if(typeof(associated_items)=='undefined'){
        associated_items=new ReactiveVar([]);
    }
    this.layout('mainLayout');
    this.render('addPosition',{
        data:{
            associatedItems:associated_items.get(),
            addActive:'active'
        }
    });
})