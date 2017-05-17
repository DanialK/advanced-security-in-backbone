define(function(require, exports, module) {

  	"use strict";

  	var Session = require("session");
  	var BaseView = require("BaseView");
  	var profileTemplate = require("text!templates/profileTemplate.html");

	var ProfileView = BaseView.extend({

		template : _.template(profileTemplate),

		events : {
			'click .logout' : 'logout'
		},

		render : function(){
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

		logout : function(e){
			Session.logout(function(){
				Backbone.history.navigate('', { trigger : true });
			});
		}
	});

	module.exports = ProfileView;

});