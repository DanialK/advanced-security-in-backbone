define([
	'underscore',
	'backbone'
], function(_, Backbone){

	var BaseView = Backbone.View.extend({
		close : function(){
			if(this.childViews){
				this.childViews.close();
			}
			this.remove();
		}
	});

	return BaseView;

});