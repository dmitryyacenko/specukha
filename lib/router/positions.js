Router.route('/positions', function(){
    this.layout('mainLayout');
    if(typeof(position_filter)=='undefined'){
        position_filter=new ReactiveVar('');
    }
    var positions=Positions.find().fetch();
    if(position_filter.get()!=''){
        positions=positions.filter((i)=>i.title.includes(position_filter.get()))
    }
    this.render('positions',{
        data:{
            positions:positions
        }
    })
})