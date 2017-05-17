define(function(require, exports, module) {

  	"use strict";
	var BaseView = Backbone.View.extend({
		close : function(){
			if(this.childViews){
				this.childViews.close();
			}
			this.remove();
		}
	});

	module.exports = BaseView;

});