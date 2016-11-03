Template.tanitems.helpers({
    'getItemType':function(){
        return {man:'Мужская', woman:'Женская', none:'Общая'}[this.sex]+' '+{winter:'зимняя', summer:'летняя', none:'без сезона'}[this.season]+', '+this.size+' размер'
    },
    'getLastDate':function(){
        console.log(this);
        var d=new Date(Gives.findOne({itemid:this._id}, {sort:{giveTimestamp:-1}}).giveTimestamp*1000);
        console.log(d);
        return d.getDate()+'.'+(d.getMonth()+1)+'.'+d.getFullYear();
    }
})