Template.addArea.events({
    'submit .add-area-form':function(e) {
        e.preventDefault();
        var areaTitle = e.currentTarget['area-title'].value;
        if(areaTitle==''){
            sAlert.error('Необходимо ввести название участка');
            return false;
        }
        if (Areas.find({title: areaTitle}).count() == 0){
            Areas.insert({title: areaTitle.trim()}, function(err){
                if(err) {
                    sAlert.error(err.reason);
                }
            });
        }
        else{
            sAlert.error('Такой участок уже есть');
        }
        e.currentTarget.reset();
    },
    'keyup .area-title-input':function(e){
        var title= e.currentTarget.value;
        var c=Areas.findOne({title:title});
        if(c){
            $(e.currentTarget).parent().addClass('has-error');
            $('.area-add-help').text('Такой участок уже есть');
            $('.btn').prop('disabled', true);
        }
        else{
            $(e.currentTarget).parent().removeClass('has-error');
            $('.area-add-help').text('');
            $('.btn').prop('disabled', false);
        }
    },
    'click .remove-area':function(e){
        e.preventDefault();
        var areaId=$(e.currentTarget).data('areaid');
        Areas.remove({_id:areaId}, function(err){
            sAlert.error(err.reason);
        });
    }
});

Template.addArea.helpers({
    'area':function(){
        return Areas.find();
    }

})