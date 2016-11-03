Router.route('/editPosition/:id', function(){
    this.layout('mainLayout');
    var p=Positions.findOne({_id:this.params.id});
    if(!p){
        this.render('nfound');
        return false;
    }
    if(typeof(associated_items)=='undefined'){
        associated_items=new ReactiveVar(p.items);
    }
    p.associatedItems=associated_items.get();
    this.render('editPosition', {
        data:p
    })
})