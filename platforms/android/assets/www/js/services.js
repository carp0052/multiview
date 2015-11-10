angular.module('starter.services', [])

.factory('LocalStorageService', function ($localStorage) {
    return {
        //createStorageLists
        setStorageList: function (key, value) {
            $localStorage[key] = value;

        },

        getStorageList: function (key) {
            return $localStorage[key];

        }
    };
});