define([
	'jquery',
	'core/BaseView',
	'Session',
	'text!templates/loginTemplate.html'
], function($, BaseView, Session,  loginTemplate){

	var LoginView = BaseView.extend({

		template : _.template(loginTemplate),
		
		events : {
			'click button' : 'submit'
		},

		render : function(){
			this.$el.html(this.template());
			return this;
		},

		submit : function(e){
			e.preventDefault();
			var email = $('#email').val();
			var password = $('#password').val();
			Session.login({
				email : email,
				password : password
			});
		}
	});

	return LoginView;

});