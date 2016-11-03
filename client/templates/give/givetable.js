var getStartItemsCount=function(itemTitle, size, season, sex){
    var i=Items.findOne({title:{$regex:new RegExp(itemTitle,'i')}, size:size, season:season, sex:sex});
    var c=i?i.count:0;
    if(c==0){
        return '<span class="text-danger">0</span>';
    }
    return c;
};
Template.giveTable.events({
    'change .season-input':function(e){
        var el=$(e.currentTarget).parent().parent().parent().parent();
        var title=el.data('itemtitle');
        var index=el.data('itemindex');
        var form=document.getElementsByClassName('give-form')[0];
        var size=form['size-item'+index].value;
        var season=form['season-item'+index].value;
        var sex=form['sex-item'+index].value;
        $('.'+index+'-count').html(getStartItemsCount(title, size, season, sex));
    },
    'change .sex-input':function(e){
        var el=$(e.currentTarget).parent().parent().parent().parent();
        var title=el.data('itemtitle');
        var index=el.data('itemindex');
        var form=document.getElementsByClassName('give-form')[0];
        var size=form['size-item'+index].value;
        var season=form['season-item'+index].value;
        var sex=form['sex-item'+index].value;
        $('.'+index+'-count').html(getStartItemsCount(title, size, season, sex));
    },
    'change .item-size':function(e){
        var el=$(e.currentTarget).parent().parent().parent();
        var title=el.data('itemtitle');
        var index=el.data('itemindex');
        var form=document.getElementsByClassName('give-form')[0];
        var size=form['size-item'+index].value;
        var season=form['season-item'+index].value;
        var sex=form['sex-item'+index].value;
        $('.'+index+'-count').html(getStartItemsCount(title, size, season, sex));
    },
    'keyup .item-size':function(e){
        var el=$(e.currentTarget).parent().parent().parent();
        var title=el.data('itemtitle');
        var index=el.data('itemindex');
        var form=document.getElementsByClassName('give-form')[0];
        var size=form['size-item'+index].value;
        var season=form['season-item'+index].value;
        var sex=form['sex-item'+index].value;
        $('.'+index+'-count').html(getStartItemsCount(title, size, season, sex));
    }
})