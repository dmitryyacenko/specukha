Template.items.helpers({
    'item':function(){
        return Items.find();
    },
    'getType':function(){
        var seasonsMap={
            winter:'Зимняя',
            summer:'Летняя',
            none:'Межсезонная'
        };
        var sexMap={
            man:'мужская',
            woman:'женская',
            none:'общая'
        };

        return seasonsMap[this.season]+' '+sexMap[this.sex];
    }
})


Template.items.events({
    'keyup .item-filter':function(e){
        item_filter.set(e.currentTarget.value);
    },
    'click .show-add-positions-modal':function(e){
        e.preventDefault();
        $('.add-position-modal').mdoal('show');
    },
    'click .remove-item':function(e){
        var itemid=$(e.currentTarget).data('itemid');
        Items.remove({_id:itemid});
    },
    'click .add-count':function(e){
        $('.add-items-count').modal();
        $('.save-new-count').data('itemid', $(e.currentTarget).data('itemid'));
    },
    'click .save-new-count':function(e){
        var i=$(e.currentTarget).data('itemid');
        var c=$('#item-new-count');
        Items.update({_id:i}, {$inc:{count:parseInt(c.val())}});
        c.val(0);
        $('.add-items-count').modal('hide');
    }
})


