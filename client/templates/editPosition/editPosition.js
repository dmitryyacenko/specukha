Template.editPosition.events({
    'click .associated-item-remove':function(e){
        var i=$(e.currentTarget).data('itemindex');
        var a=associated_items.get();
        a=a.slice(0,i).concat(a.slice(i+1));
        associated_items.set(a);
    },
    'click .associated-item-edit':function(e){
        var i=$(e.currentTarget).data('itemindex');
        var id=associated_items.get()[i];
        $('.edit-item-to-position').data('itemindex',i)
        $('.edit-modal-holder #itemTitle').val(id.title);
        $('.edit-modal-holder #years').val(parseInt(id.expiresIn.years));
        $('.edit-modal-holder #months').val(parseInt(id.expiresIn.months));
        $('.edit-modal-holder #days').val(parseInt(id.expiresIn.days));
        $('.edit-position-modal').modal();
    },
    'click .save-edited':function(){
        var form=document.getElementsByClassName('edit-item-to-position')[0],
            i=$(form).data('itemindex'),
            title=form.itemTitle.value,
            years=form.years.value,
            months=form.months.value,
            days=form.days.value,
            ob={
                title:title,
                expiresIn:{
                    years:years,
                    months:months,
                    days:days
                }
            },
            or=associated_items.get();
        or[i]=ob;
        associated_items.set(or);
        $('.edit-position-modal').modal('hide');
    },
    'click .show-add-positions-modal':function(){
        $('.add-position-modal').modal()
    },
    'click .save-new':function(){
        var form=document.getElementsByClassName('item-to-position')[0],
            ob= {
                title: form.itemTitle.value,
                expiresIn: {
                    years: form.years.value,
                    months: form.months.value,
                    days: form.days.value
                }
            },
            or=associated_items.get();
        or.push(ob);
        associated_items.set(or);
        form.reset();
        $('.add-position-modal').modal('hide')
    },
    'submit .position-form':function(e){
        e.preventDefault();
        var form=e.currentTarget;
        var title=form['position-title'].value;
        var items=associated_items.get();
        var id=$(form).data('posid');
        Positions.update({_id:id}, {
            title:title,
            items:items
        });
        Router.go('/positions')
    }
});

Template.editPosition.helpers({
    items:function(){
        return _.unique(Items.find().fetch().map((i)=>i.title))
    }
})