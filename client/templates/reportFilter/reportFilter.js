Template.reportFilter.rendered=function(){
};
Template.reportFilter.helpers({
    'list':function(){
        var collection=window[this.collection];
        return collection.find().fetch().map((i)=>i[this.titleField]);
    }
});

Template.reportFilter.events({
    'click .nav-link':function(e){
        var el=e.currentTarget;
        el=$(el).parent();
        var dmenu=$(el).find('.dropdown-menu');
        var chdown=$(el).find('.fa-chevron-down');
        if(dmenu.is(':visible')){
            chdown.removeClass('opened');
            dmenu.slideUp(300);
        }
        else{
            chdown.addClass('opened');
            dmenu.slideDown(300);
        }
    },
    'click .dropdown-item':function(e){
        var el=$(e.currentTarget);
        var rVar=window[Template.currentData().reactiveVar];
        var state=el.data('state');
        if(state=='uncheck'){
            el.data('state', 'check');
            el.find('.checked-placeholder').html('<i class="fa fa-check"></i>');
            var p=rVar.get();
            p.push(el.data('filtertitle'));
            rVar.set(p);
        }
        else{
            el.data('state', 'uncheck');
            el.find('.checked-placeholder').html('');
            var index=rVar.get().indexOf(el.data('filtertitle'));
            rVar.set(rVar.get().slice(0, index).concat(rVar.get().slice(index+1)));

        }
    }
})