Router.route('/reports/tanitems', function(){
    this.layout('mainLayout');
    this.render('tanitems', {
        data:{
            tanitems:Items.find({count:0})
        }
    })
})