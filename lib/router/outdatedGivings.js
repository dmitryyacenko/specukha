Router.route('/reports/outdatedGivings', function(){
    if(typeof(PositionFilter)=='undefined'){
        PositionFilter=new ReactiveVar([]);
        AreaFilter=new ReactiveVar([])
    }
    var alreadyExplored = [];
    var uniqueGives = [];
    var findQuery = {};
    if (PositionFilter.get().length!=0) {
        var positionsTitles = PositionFilter.get();
        var positionsId = positionsTitles.map((i)=>Positions.findOne({title: i})._id);
        findQuery.positionId = {$in: positionsId}
    }
    if (AreaFilter.get().length!=0) {
        var areasTitles = AreaFilter.get();
        var areasId = areasTitles.map((i)=>Areas.findOne({title: i})._id);
        findQuery.areaId = {$in: areasId}
    }
    var gives = Gives.find(findQuery).fetch();
    console.log(findQuery);
    gives.forEach((i)=> {
        var hash = i.itemid + i.employerid;
        if(alreadyExplored.indexOf(hash)==-1) {
            findQuery.itemid = i.itemid;
            findQuery.employerid = i.employerid;
            alreadyExplored.push(hash);
            var givingCase = Gives.find(findQuery, {sort: {giveTimestamp: -1}}).fetch()[0];
            uniqueGives.push(givingCase);
        }
    });
    var d=new Date();
    var ts=d.getTime()/1000;
    uniqueGives=uniqueGives.filter((i)=>i.nextTimestamp<ts);
    this.layout('mainLayout');
    this.render('outdatedGivings',{
        data:{
            givingCase:uniqueGives
        }
    });
})
