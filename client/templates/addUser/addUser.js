Template.addUser.events({
    'submit .adduser-form': function (e) {
        e.preventDefault();
        var form = e.currentTarget,
            login = form.login.value,
            password = form.password.value,
            role = form.role.value;
        if(login==''){
            sAlert.error('Необходимо ввести логин');
            return false;
        }
        if(password==''){
            sAlert.error('Необходимо ввести пароль');
            return false;
        }

        Meteor.call('createFallUser', login.trim(), password, role, function (err) {
            if (err) {
                if (err.reason == 'Username already exists.') {
                    sAlert.error('Такой пользователь уже создан.');
                }
                else {
                    sAlert.error(err.reason);
                }
            }
            else {
                sAlert.success('Пользователь создан');
            }
        })
    }
})
;