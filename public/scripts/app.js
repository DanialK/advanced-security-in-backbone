define(function(require, exports, module) {
  "use strict";
  var Session = require("session");
  var Router = require("router");

  var ApplicationModel = Backbone.Model.extend({

		start : function(){
			Session.getAuth(function(response){
				var router = new Router();
				Backbone.history.start();
			});
		}
	});

  	module.exports = ApplicationModel;

});