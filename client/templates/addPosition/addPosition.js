Template.addPosition.rendered=function(){
};

Template.addPosition.helpers({

    items:function(){
       return _.uniq(Items.find().fetch().map((i)=>i.title.trim()))
    }
});

Template.addPosition.events({
    'click .show-add-positions-modal':function(){
        $('.add-position-modal').modal()
    },
    'keyup #position-title':function(e){
        var el=e.currentTarget;
        var jel=$(el);
        var title=el.value;
        var p=Positions.findOne({title:title});
        if(p){
            jel.addClass('form-control-danger').parent().addClass('has-danger').find('.helper').html('Такая должность уже существует');
            jel.parent().parent().find('.btn-success').prop('disabled', true);
        }
        else{
            jel.removeClass('form-control-danger').parent().removeClass('has-danger').find('.helper').html('');
            jel.parent().parent().find('.btn-success').prop('disabled', false);
        }
    },
    'cahnge #position-title':function(e){
        var el=e.currentTarget;
        var jel=$(el);
        var title=el.value;
        var p=Positions.findOne({title:title});
        if(p){
            jel.addClass('form-control-danger').parent().addClass('form-control-danger').find('.helper').html('Такая должность уже существует');
            jel.removeClass('form-control-danger').parent().parent().find('.btn-success').prop('disabled', true);
        }
        else{
            jel.addClass('form-control-danger').parent().removeClass('has-danger').find('.helper').html('');
            jel.removeClass('form-control-danger').parent().parent().find('.btn-success').prop('disabled', false);
        }
    },
    'click  .btn-cancel':function(){
        document.getElementsByClassName('item-to-position')[0].reset()
    },
    'submit .item-to-position-form':function(e){
        console.log(e);
        e.preventDefault();
        var form=e.currentTarget;
        var title=form.itemTitle.value.trim();
        var expiresIn={
            days:form.days.value,
            months:form.months.value,
            years:form.years.value
        };
        var d=associated_items.get();
        d.push({
            title:title,
            expiresIn:expiresIn
        });
        associated_items.set(d);
        form.reset();
        $('.add-position-modal').modal('hide');
    },
    'submit .position-form':function(e){
        e.preventDefault();
        var form=document.getElementsByClassName('position-form')[0],
            title=form['position-title'].value.trim();
        if(Positions.find({title:{$regex:new RegExp(title, 'i')}}).count()>0){
            sAlert.error('Такая должность уже существует');
            return false;
        }
        Positions.insert({
            title:title,
            items:associated_items.get()
        }, function(e, i){
            if(e){
                sAlert.error(e.reason);
            }
            else{
                sAlert.success('Должность успешно создана');
                Router.go('/positions');
                associated_items.set([]);
            }
        })

    }
})