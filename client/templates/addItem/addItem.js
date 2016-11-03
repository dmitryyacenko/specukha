Template.addItem.events({
    'submit .add-item-form':function(e){
        e.preventDefault();
        var title=e.currentTarget['item-title'].value,
            season= e.currentTarget['season'].value,
            sex= e.currentTarget['sex'].value,
            size= e.currentTarget['item-size'].value;
        if(title==''){
            sAlert.error('Необходимо ввести название');
            return false;
        }
        if(season=='' || sex==''){
            sAlert.error('Необходимо выбрать тип');
            return false;
        }
        if(size==0 || size==''){
            sAlert.error('Необходимо ввести размер');
            return false
        }
        var itemId=Items.insert({
            title:title.trim(),
            season:season,
            sex:sex,
            size:size,
            count:0
        });
        sAlert.success('Спецоборудование добавлено');
        Router.go('/items#items-'+itemId);
    }
})