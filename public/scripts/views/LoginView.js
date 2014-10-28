define(function(require, exports, module) {

  	"use strict";

  	var Session = require("session");
  	var BaseView = require("BaseView");
  	var loginTemplate = require("text!templates/loginTemplate.html");

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

	module.exports = LoginView;

});