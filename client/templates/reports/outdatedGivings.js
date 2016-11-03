Template.outdatedGivings.helpers({
    'getFullName': function () {
        var employer = Employers.findOne(this.employerid);
        return employer.lastname + ' ' + employer.firstname + ' ' + employer.givenname;
    },
    'getPosition': function () {
        var employer = Employers.findOne(this.employerid);
        var position = Positions.findOne(employer.position);
        return position.title;
    },
    'getArea': function () {
        var employer = Employers.findOne(this.employerid);
        var area = Areas.findOne(employer.areaid);
        return area.title
    },
    'getIndex':function(ind){
        return ind+1;
    },
    'getAreasFilter':function(){
        var d=AreaFilter.get().length==0?'Все':AreaFilter.get().join(', ')
        return 'Участки: '+d;
    },
    'getItemTitle': function () {
        return Items.findOne(this.itemid).title
    },
    'getGivingDate': function () {
        var d = new Date(this.giveTimestamp * 1000);
        return d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear();
    },
    'getNextGivingDate': function () {
        var d = new Date(this.nextTimestamp * 1000);
        return d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear();
    }
});