Router.route('/items', function(){
    if(typeof(item_filter)=='undefined'){
        item_filter=new ReactiveVar('');
    }
    var items=Items.find().fetch();
    console.log(item_filter.get().length);
    if(item_filter.get()!=''){
        items=items.filter((item)=>item.title.toLowerCase().includes(item_filter.get().toLowerCase()));
    }
    this.layout('mainLayout');
    this.render('items', {
        data:{
            items:items,
            itemsActive:'active'
        }
    });
});

