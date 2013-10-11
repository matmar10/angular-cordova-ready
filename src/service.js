'use strict';

(function () {

    angular.module('matmar10Cordova', []).factory('cordovaReady', function ($q) {


        // set up a deferred object which is satisfied once cordova loads
        var $document = angular.element(document),
            cordovaReady = $q.defer(),
            cordovaReadyPromise = cordovaReady.promise;

        // if we're not on a device, simulate the cordovaready event
        if (!navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
            // TODO: remove jquery dependency
            $document.on('ready', function () {
                $document.triggerHandler('deviceready');
            });
        }

        $document.on('deviceready', cordovaReady.resolve);

        // cordova already loaded
        if (window.device) {
            $document.triggerHandler('deviceready');
        }

        /**
         * Wraps a Cordova service call to ensure Cordova has loaded and is ready
         *
         * @param callbackFunction The method to invoke when Cordova is ready; invoked immediately if Cordova is already loaded
         * @param callbackArguments The arguments to pass to the callbackFunction
         */
        return function (callbackFunction, callbackArguments) {
            cordovaReadyPromise.then(function() {
                callbackFunction.apply(callbackFunction, callbackArguments);
            });
        };
    });

})();
