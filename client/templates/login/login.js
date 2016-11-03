Template.login.events({
    'submit .login-form':function(e){
        e.preventDefault();
        Meteor.loginWithPassword(e.currentTarget.login.value, e.currentTarget.password.value, function(e){
            if(e){
                switch(e.reason){
                    case 'Incorrect password':
                        sAlert.error('Неверный пароль');
                        break;
                    case 'User not found':
                        sAlert.error('Пользователь не найден');
                        break;
                    default:
                        sAlert.error('Произошла ошибка во время авторизации: '+e.reason);
                }
            }
        })
    }
})