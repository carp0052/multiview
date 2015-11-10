// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.services', 'starter.controllers', 'ngCordova', 'ngStorage'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.todo', {
        url: '/todo',
        views: {
            'menuContent': {
                templateUrl: 'templates/todo.html',
                controller: 'ToDoCtrl'
            }
        }
    })

    .state('app.grocery', {
            url: '/grocery',
            views: {
                'menuContent': {
                    templateUrl: 'templates/grocery.html',
                    controller: 'GroceryCtrl'
                }
            }
        })
        .state('app.gifts', {
            url: '/gifts',
            views: {
                'menuContent': {
                    templateUrl: 'templates/gifts.html',
                    controller: 'GiftCtrl'
                }
            }
        });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/todo');
});