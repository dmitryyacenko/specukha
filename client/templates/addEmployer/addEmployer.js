Template.addEmployer.helpers({
    'area':function(){
        return Areas.find();
    },
    'position':function(){
        var p=Positions.find().fetch();
        p.unshift({'title':'Выбор должности', '_id':'fakeid'});
        return  p;
    }
})

Template.addEmployer.events({
    'change #position':function(e){
        var positionId=$(e.currentTarget).val();
        if(positionId=='')return false;
        document.getElementsByClassName('sizes')[0].innerHTML='';
        var position=Positions.findOne({_id:positionId});
        console.log(Blaze.renderWithData(Template.addEmployerSizes, {item:position.items}, document.getElementsByClassName('sizes')[0]));

    },
    'submit .employer-form':function(e){
        e.preventDefault();
        var sizes=[];
        var sizesInput=$('.size-input').each((i,k)=>sizes.push({itemTitle:$(k).data('itemtitle'), size:$(k).val()}))
        var form=document.getElementsByClassName('employer-form')[0];
        var number=form.number.value.trim(),
            firstname=form['first-name'].value.trim(),
            lastname=form['last-name'].value.trim(),
            givenname=form['given-name'].value.trim(),
            sex=form.sex.value.trim(),
            tall=form.tall.value.trim(),
            shoes=form.shoes.value.trim(),
            gloves=form.gloves.value.trim(),
            head=form.head.value.trim(),
            body=form.body.value.trim(),
            areaid=form.area.value,
            position=form.position.value;
        if(number=='' || number==0){
            sAlert.error('Необходимо ввести табельный номер');
            return false;
        }
        if(Employers.find({number:number}).count()>0){
            sAlert.error('Работрник с таким табельным номером уже есть');
            return false
        }
        if(firstname==''){
            sAlert.error('Необходимо ввести имя');
            return false;
        }
        if(lastname==''){
            sAlert.error('Необходимо ввести фамилию');
            return false;
        }
        if(sex==''){
            sAlert.error('Необходимо выбрать пол');
            return false;
        }
        if(tall=='' || tall==0){
             sAlert.error('Необходимо ввести рост');
            return false;
        }
        if(shoes=='' || shoes==0){
            sAlert.error('Необходимо ввести размер обуви');
            return false;
        }
        if(gloves=='' || gloves==0){
            sAlert.error('Необходимо ввести размер рукавиц');
            return false;
        }
        if(head=='' || head==0){
            sAlert.error('Необходимо ввести размер головного убора');
            return false;
        }
        if(body=='' || body==0){
            sAlert.error('Необходимо ввести размер одежды');
            return false;
        }
        if(areaid==''){
            sAlert.error('Необходимо выбрать участок');
            return false;
        }

        var d=Employers.insert({
            number:number,
            firstname:firstname,
            lastname:lastname,
            givenname:givenname,
            sex:sex,
            tall:tall,
            shoes:shoes,
            gloves:gloves,
            head:head,
            body:body,
            areaid:areaid,
            position:position,
            sizes:sizes
        }, function(err, id){
            if(err){
                sAlert.error('Произошла ошибка: '+err.reason);
            }
            else{
                sAlert.success('Сотрудник создан');
                Router.go('/employer/'+id);
            }
        })
    }
})