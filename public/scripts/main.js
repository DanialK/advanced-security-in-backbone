require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
    },
    paths: {
        jquery: '../libs/jquery/jquery',
        backbone: '../libs/backbone/backbone',
        underscore: '../libs/underscore/underscore',
        text : '../libs/requirejs-text/text'
    }
});

require([
    'app'
], function (App) {
    var app = new App();
    app.start(); 
});