Template.positions.events({
    'keyup .position-filter':function(e){
        position_filter.set(e.currentTarget.value);
    },
    'click .remove-position':function(e){
        var id=$(e.currentTarget).data('positionid');
        Positions.remove({_id:id});
    }
})