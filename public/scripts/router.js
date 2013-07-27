define([
	'jquery',
	'underscore',
	'backbone',
	'core/BaseRouter',
	'views/HomeView',
	'views/LoginView',
	'views/ProfileView',
	'models/UserModel',
	'Session'
], function($, _,  Backbone, BaseRouter, HomeView, LoginView, ProfileView, UserModel, Session){

	var Router = BaseRouter.extend({

		routes : {
			'login' : 'showLogin',
			'profile' : 'showProfile',
			'*default' : 'showHome'
		},

		// Routes that need authentication and if user is not authenticated
		// gets redirect to login page
		requresAuth : ['#profile'],

		// Routes that should not be accessible if user is authenticated
		// for example, login, register, forgetpasword ...
		preventAccessWhenAuth : ['#login'],

		before : function(params, next){
			//Checking if user is authenticated or not
			//then check the path if the path requires authentication 
			var isAuth = Session.get('authenticated');
			var path = Backbone.history.location.hash;
			var needAuth = _.contains(this.requresAuth, path);
			var cancleAccess = _.contains(this.preventAccessWhenAuth, path);

			if(needAuth && !isAuth){
				//If user gets redirect to login because wanted to access
				// to a route that requires login, save the path in session
				// to redirect the user back to path after successful login
				Session.set('redirectFrom', path);
				Backbone.history.navigate('login', { trigger : true });
			}else if(isAuth && cancleAccess){
				//User is authenticated and tries to go to login, register ...
				// so redirect the user to home page
				Backbone.history.navigate('', { trigger : true });
			}else{
				//No problem handle the route
				return next();
			}			
		},

		after : function(){
			//empty
		},

		changeView : function(view){
			//Close is a method in BaseView
			//that check for childViews and 
			//close them before closing the 
			//parentView
			function setView(view){
				if(this.currentView){
					this.currentView.close();
				}
				this.currentView = view;
				$('.container').html(view.render().$el);
			}

			setView(view);
		},

		showLogin : function(){
			var loginView = new LoginView();
			this.changeView(loginView);
		},

		showProfile : function(){
			var that = this;
			var userModel = new UserModel({
				id : Session.get('user').id
			});
			userModel.fetch()
				.done(function(){
					var profileView = new ProfileView({
						model : userModel
					});
					that.changeView(profileView);
				})
				.fail(function(error){
					//In case that session expired
					that.fetchError(error);
				});
		},

		showHome : function(){
			var homeView = new HomeView();
			this.changeView(homeView);
		},

		fetchError : function(error){
			//If during fetching data from server, session expired
			// and server send 401, call getAuth to get the new CSRF
			// and reset the session settings and then redirect the user
			// to login
			if(error.status === 401){
				Session.getAuth(function(){
					Backbone.history.navigate('login', { trigger : true });
				});
			}
		}
	});

	return Router;
});