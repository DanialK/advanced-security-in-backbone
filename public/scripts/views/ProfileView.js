define([
	'core/BaseView',
	'Session',
	'text!templates/profileTemplate.html'
], function(BaseView, Session, profileTemplate){

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

	return ProfileView;

});