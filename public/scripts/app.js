define([
	'jquery',
	'backbone',
	'router',
	'Session'
], function($, Backbone, Router, Session){

	var ApplicationModel = Backbone.Model.extend({

		start : function(){
			Session.getAuth(function(response){
				var router = new Router();
				Backbone.history.start();
			});
		}
	});
	return ApplicationModel;
});