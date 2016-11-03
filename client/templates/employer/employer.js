Template.employer.helpers({
    'getArea':function(){
        return Areas.findOne({_id:this.areaid}).title;
    },
    'getPosition':function(){
        return Positions.findOne({_id:this.position}).title;
    },
    givenItem:function(){
        return Gives.find({'employerid':this._id});
    },
    'getTitle':function(){
        return Items.findOne(this.itemid).title
    },
    'getDate':function(){
        var d=new Date(this.giveTimestamp*1000);
        return d.getDate()+'.'+(d.getMonth()+1)+'.'+d.getFullYear();
    },
    'getNextDate':function(){
        var d=new Date(this.nextTimestamp*1000);
        return d.getDate()+'.'+(d.getMonth()+1)+'.'+d.getFullYear();
    }
});

Template.employer.events({
    'click .remove-employer':function(e){
        if(confirm('Действительно удалить сотрудника?')){
            Employers.remove({_id:$(e.currentTarget).data('employerid')});

        }
    },
    'click .hidden-list-title':function(e){
        var title=$(e.currentTarget);
        var list=title.parent().parent().children('.hidden-list-container');
        console.log(list);
        if(!list.is(':visible')){
            title.text('Скрыть размеры');
            list.slideDown(300);
        }
        else{
            title.text('Показать размеры');
            list.slideUp(300);
        }

    }
})
