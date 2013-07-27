define([
	'jquery',
	'backbone',
	'router'
], function($, Backbone, Router){

	var SessionModel = Backbone.Model.extend({
		
		url : '/session',

		initialize : function(){
			//Ajax Request Configuration
			//To Set The CSRF Token To Request Header
			$.ajaxSetup({
				headers : {
					'X-CSRF-Token' : csrf
				}
			});

			//Check for sessionStorage support
			if(Storage && sessionStorage){
				this.supportStorage = true;
			}
		},

		get : function(key){
			if(this.supportStorage){
				var data = sessionStorage.getItem(key);
				if(data && data[0] === '{'){
					return JSON.parse(data);
				}else{
					return data;
				}
			}else{
				return Backbone.Model.prototype.get.call(this, key);
			}
		},


		set : function(key, value){
			if(this.supportStorage){
				sessionStorage.setItem(key, value);
			}else{
				Backbone.Model.prototype.set.call(this, key, value);
			}
			return this;
		},

		unset : function(key){
			if(this.supportStorage){
				sessionStorage.removeItem(key);
			}else{
				Backbone.Model.prototype.unset.call(this, key);
			}
			return this;	
		},

		clear : function(){
			if(this.supportStorage){
				sessionStorage.clear();  
			}else{
				Backbone.Model.prototype.clear(this);
			}
		},

		login : function(credentials){
			var that = this;
			var login = $.ajax({
				url : this.url + '/login',
				data : credentials,
				type : 'POST'
			});
			login.done(function(response){
				that.set('authenticated', true);
				that.set('user', JSON.stringify(response.user));
				if(that.get('redirectFrom')){
					var path = that.get('redirectFrom');
					that.unset('redirectFrom');
					Backbone.history.navigate(path, { trigger : true });
				}else{
					Backbone.history.navigate('', { trigger : true });
				}
			});
			login.fail(function(){
				Backbone.history.navigate('login', { trigger : true });
			});
		},

		logout : function(callback){
			var that = this;
			$.ajax({
				url : this.url + '/logout',
				type : 'DELETE'
			}).done(function(response){
				//Clear all session data
				that.clear();
				//Set the new csrf token to csrf vaiable and
				//call initialize to update the $.ajaxSetup 
				// with new csrf
				csrf = response.csrf;
				that.initialize();
				callback();
			});
		},


		getAuth : function(callback){
			var that = this;
			var Session = this.fetch();

			Session.done(function(response){
				that.set('authenticated', true);
				that.set('user', JSON.stringify(response.user));
			});

			Session.fail(function(response){
				response = JSON.parse(response.responseText);
				that.clear();
				csrf = response.csrf !== csrf ? response.csrf : csrf;
				that.initialize();
			});

			Session.always(callback);
		}
	});

	return new SessionModel();	
});