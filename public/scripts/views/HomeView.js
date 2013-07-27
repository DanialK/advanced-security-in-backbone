define([
	'core/BaseView',
	'Session',
	'text!templates/homeTemplate.html'
], function(BaseView, Session, homeTemplate){

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

	return HomeView;

});