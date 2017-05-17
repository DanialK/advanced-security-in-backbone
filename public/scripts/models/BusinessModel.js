define(function(require, exports, module) {

    "use strict";

    var BusinessModel = Backbone.Model.extend({

        defaults : {
            'businessId' : null,
            'name' : null,
            'address': null
        },

        urlRoot : '/businesses'
    });

    module.exports = BusinessModel;
});