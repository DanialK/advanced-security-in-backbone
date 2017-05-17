define(function(require, exports, module) {

    "use strict";

    var BaseView = require("BaseView");
    var currentTemplate = require("text!templates/bussinessListTemplate.html");

    var BusinessListView = BaseView.extend({

        template : _.template(currentTemplate),

        events : {

        },

        render : function(){
            this.$el.html(this.template({
                businesses: []
            }));
            return this;
        }
    });

    module.exports = BusinessListView;

});