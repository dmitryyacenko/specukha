Template.printcard.helpers({
    'getPosition':function(){
        var posid=this.position;
        var areaid=this.areaid;
        var pos=Positions.findOne(posid).title;
        var area=Areas.findOne(areaid).title;
        return pos+' '+area;
    },
    'getSex':function(){
        return {man:'муж', woman:'жен', none:'б/пола'}[this.sex];
    },
    'getExpires':function(){
        var posid=this.position,
            pos=Positions.findOne(posid),
            res=[];
        pos.items.forEach((i)=>{
            var t=i.title,
                expT=i.expiresIn.years+ '   ('+(+i.expiresIn.months+i.expiresIn.years*12)+'мес)';
            res.push({
                title:t,
                expires:expT
            })
        });
        return res;
    },
    'giving':function(){
        return Gives.find({'employerid':this._id});
    },
    'getItemTitle':function(){
        return Items.findOne({_id:this.itemid}).title;
    },
    'getGivingDate': function () {
        var d=new Date(this.giveTimestamp*1000);
        return d.getDate()+'.'+(d.getMonth()+1)+'.'+d.getFullYear();
    }
});

Template.printcard.events({
    'click .print-front':function(){
        $('.next-page').hide();
        window.print();
        $('.next-page').show();
    },
    'click .print-back':function(){
        $('.forecard').hide();
        window.print();
        $('.forecard').show();
    }
})