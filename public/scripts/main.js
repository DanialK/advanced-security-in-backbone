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
        session: {
            deps: [
                'backbone'
            ]
        },
        router: {
            deps: [
                'backbone',
                'session'
            ],
            exports: 'router'
        }
    },
    paths: {
        jquery: '../libs/jquery/jquery',
        backbone: '../libs/backbone/backbone',
        underscore: '../libs/underscore/underscore',
        text : '../libs/requirejs-text/text',
        router: "./router",
        session: "./session",
        BaseView: "./core/BaseView",
    }
});

require([
    'session',
    'app'
], function (Session, App) {
    var app = new App();
    app.start();
});