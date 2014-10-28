define(function(require, exports, module) {

  	"use strict";

	var UserModel = Backbone.Model.extend({

		defaults : {
			'firstName' : null,
			'lastName' : null
		},

		getFullName : function(){
			return this.get('firstName') + ' ' + this.get('lastName');
		},

		urlRoot : '/users'
	});

	module.exports = UserModel;
});