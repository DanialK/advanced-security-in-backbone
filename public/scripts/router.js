define(function(require, exports, module) {

  	"use strict";

  	var Session = require("session");
  	var BaseRouter = require("./core/BaseRouter");
  	var HomeView = require("./views/HomeView");
  	var LoginView = require("./views/LoginView");
  	var ProfileView = require("./views/ProfileView");
  	var UserModel = require("./models/UserModel");
  	var startView = require("./views/startView");
  	var Business = {
  		Views: {
  			List: require("./views/businessListView")
  		}
  	};

	var Router = BaseRouter.extend({

		routes : {
			'bussinesses': 'showAllBusiness',
			'login' : 'showLogin',
			'profile' : 'showProfile',
			'home' : 'showHome',
			'*default' : 'showStartPage',

		},

		userModel: null,

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
				this.setUserAuthenticate();
				Session.set('redirectFrom', path);
				Backbone.history.navigate('login', { trigger : true });
			}else if(isAuth && cancleAccess){
				//User is authenticated and tries to go to login, register ...
				// so redirect the user to home page
				this.setUserAuthenticate();
				Backbone.history.navigate('', { trigger : true });
			}else{
				this.setUserAuthenticate();
				//No problem handle the route
				return next();
			}
		},

		setUserAuthenticate: function() {
			var self = this;
			var isAuth = Session.get('authenticated');
			if (!isAuth) {
				$('ul.login-nav-bar').html('<li><a href="#login">Login</a></li>');
				return;
			}
			if (!self.userModel){
				self.userModel = new UserModel({
					id : Session.get('user').id
				});
				self.userModel.fetch()
					.done(function(){
						var user = self.userModel.toJSON();
						$('ul.login-nav-bar').html('<li><a href="#/profile">'+ user.firstName +' ' + user.lastName +'</li>');
					})
					.fail(function(error){
						$('ul.login-nav-bar').html('<li><a href="#/login">Login</a></li>');
					});
			}
		},

		after : function(){
			//empty
		},

		showAllBusiness: function() {
			var View = new Business.Views.List();
			this.changeView(View);
		},

		changeView : function(view){
			var self = this;
			self.setUserAuthenticate();
			//Close is a method in BaseView
			//that check for childViews and
			//close them before closing the
			//parentView
			function setView(view){
				if(self.currentView){
					self.currentView.close();
				}
				self.currentView = view;
				$('.first-view').hide();
				$('.main-view').html(view.render().$el);
			}

			setView(view);
		},

		showLogin : function(){
			var loginView = new LoginView();
			this.changeView(loginView);
		},

		showProfile : function(){
			var self = this;
			if (!self.userModel) {
				// self.userModel = new UserModel({
				// 	id : Session.get('user').id
				// });
				self.navigate('#/login')
			} else {
				self.userModel.fetch()
				.done(function(){
					var profileView = new ProfileView({
						model : self.userModel
					});
					self.changeView(profileView);
				})
				.fail(function(error){
					//In case that session expired
					self.fetchError(error);
				});
			}
		},

		showStartPage: function() {
			var startViewInstance = new startView();
			this.changeView(startViewInstance);
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

	module.exports = Router;
});