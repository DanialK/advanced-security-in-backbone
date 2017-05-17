define(function(require, exports, module) {

    "use strict";
    var Session = require("session");
    var BaseView = require("BaseView");
    var startTemplate = require("text!templates/startTemplate.html");

    var startView = BaseView.extend({

        template : _.template(startTemplate),

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

    module.exports = startView;

});