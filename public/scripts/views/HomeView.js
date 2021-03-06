define(function(require, exports, module) {

  	"use strict";
  	var Session = require("session");
  	var BaseView = require("BaseView");
  	var homeTemplate = require("text!templates/homeTemplate.html");

	var HomeView = BaseView.extend({

		template : _.template(homeTemplate),

		events : {
			'click .logout' : 'logOut'
		},

		logOut : function(){
			var view = this;
			Session.logout(function(){
				view.render();
			});
		},

		render : function(){
			var user = Session.get('user');
			this.$el.html(this.template({
				user : user
			}));
			return this;
		}
	});

	module.exports = HomeView;

});