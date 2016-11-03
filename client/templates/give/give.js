Template.give.helpers({
    'employer':function(){
        return Employers.find();
    }
});
Template.give.events({
    'submit .give-form':function(e){
        e.preventDefault();
        var form=e.currentTarget;
        var counts=document.getElementsByClassName('count');
        var cs=[];
        var indexes=[];
        [].forEach.call(counts, function(i,k){
            if(form['needToGive'+k].checked){
                cs.push(parseInt(i.innerHTML));
                indexes.push(k);
            }
        });
        cs=cs.map((i)=>isNaN(i)?0:i);
        if(cs.filter((i)=>i<=0).length>0){
            sAlert.error('Недостаточное колчисество одного или несколько спецсредств подлежащих выдаче.');
            return false;
        }
        var ids=[];
        indexes.forEach((i)=>{
            var title=$('tr[data-itemindex='+i+']').data('itemtitle');
            var size=form['size-item'+i].value;
            var sex=form['sex-item'+i].value;
            var season=form['season-item'+i].value;
            var id=Items.findOne({title:{$regex:new RegExp(title, 'i')}, size:size, sex:sex, season:season});
            if(!id){
                sAlert.error('Оборудование не найдено');
                return false;
            }
            ids.push(id._id);
        });
        if(indexes.length!=ids.length){
            return false;
        }
        ids.forEach((i)=>{

            var d=new Date();
            Gives.insert({
                employerid:form['employerid'].value,
                positionId:Employers.findOne(form['employerid'].value).position,
                areaId:Employers.findOne(form['employerid'].value).areaid,
                itemid:i,
                giveTimestamp:parseInt(d.getTime()/1000),
                nextTimestamp:parseInt(d.getTime()/1000)+getNextDate(form['employerid'].value, i)
            }, function(e, id){
                if(e){
                    sAlert.error(e.reason);
                }
                else{
                    Items.update({_id:i}, {$inc:{count:-1}});
                }
            })

        });
        $('.give-form').html('<input type="hidden" name="employerid" value="">');
        $('.give-title').html('');
        $('.find-employer').val('');
        sAlert.success('Выдача произведена успешно');
    }
})
var getNextDate=function(employerid, itemid){
    var itemTitle=Items.findOne(itemid).title;
    var employer=Employers.findOne(employerid);
    var expIn=Positions.findOne(employer.position).items.filter((i)=>{
        console.log(i.title.toLowerCase(), itemTitle.toLowerCase(), i.title.toLowerCase().trim()==itemTitle.toLowerCase().trim());
        return i.title.toLowerCase()==itemTitle.toLowerCase()
    })[0].expiresIn;
    var d=expIn.years*31536000+expIn.months*2592000+expIn.days*86400;
    return d;
}
var getEmployerSize=function(employer, itemTitle){
    return employer.sizes.filter((i)=>i.itemTitle==itemTitle)[0].size
};
var getStartItemsCount=function(itemTitle, size, season, sex){
    var i=Items.findOne({title:itemTitle, size:size, season:season, sex:sex});
    var c=i?i.count:0;
    if(c==0){
        return '<span class="text-danger">0</span>';
    }
    return c;
};
var getStartItemsCount=function(itemTitle, size, season, sex){
    var i=Items.findOne({title:{$regex:new RegExp(itemTitle,'i')}, size:size, season:season, sex:sex});
    var c=i?i.count:0;
    if(c==0){
        return '<span class="text-danger">0</span>';
    }
    return c;
};
Template.give.
    rendered=function(){
    var e=Employers.find().fetch().map((i)=>'Табельный #'+i.number+'   '+i.lastname+' '+i.firstname+' '+i.givenname);
    $('.find-employer').autocomplete({
        source:e
    }).on("autocompleteselect", function(e, ui){
        $('.give-form').html('<input type="hidden" name="employerid" value="'+ui.value+'">');
        ui=ui.item;
        var n=ui.value.substring(ui.value.indexOf('#')+1, ui.value.indexOf(' ', ui.value.indexOf('#')));
        var employer=Employers.findOne({'number':n});
        document.getElementsByClassName('give-form')[0]['employerid'].value=employer._id;
        var area=Areas.findOne(employer.areaid).title;
        var position=Positions.findOne(employer.position);
        $('.give-title').text('Сотрудник: '+employer.lastname+' '+employer.firstname+' ('+position.title+', '+area+')');
        var neededItem=position.items.map((i)=>{i.employerSize=getEmployerSize(employer, i.title); i.itemCount=getStartItemsCount(i.title, getEmployerSize(employer, i.title), 'winter', 'man'); return i});
        Blaze.renderWithData(Template.giveTable, {neededItem:neededItem}, document.getElementsByClassName('give-form')[0]);
    });
}

