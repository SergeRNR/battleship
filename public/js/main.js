requirejs.config({
    paths: {
        angular: '../assets/libs/angular',
        domReady: '../assets/libs/require-domready',
        underscore: '../assets/libs/underscore'
    },
    shim: {
        'angular': {
            exports: 'angular'
        }
    },
    deps: ['./init']
});