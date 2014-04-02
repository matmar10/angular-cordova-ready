'use strict';

(function () {

    angular.module('matmar10Cordova', []).factory('cordovaReady', function ($q) {

        // set up a deferred object which is satisfied once cordova loads
        var $document = angular.element(document),
            cordovaReady = $q.defer(),
            cordovaReadyPromise = cordovaReady.promise;

        $document.on('deviceready', cordovaReady.resolve);

        // if we're not on a device, simulate the cordovaready event
        if (!navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
            $document.triggerHandler('deviceready');
        } else {
            // cordova already loaded
            if (window.device) {
                $document.triggerHandler('deviceready');
            }
        }

        /**
         * Wraps a Cordova service call to ensure Cordova has loaded and is ready
         *
         * @param {Function} [callbackFunction] - The method to invoke when Cordova is ready; invoked immediately if Cordova is already loaded
         * @param {Array} [callbackArguments] - The arguments to pass to the callbackFunction
         * @return {Object<Promise>} A promise object for chaining
         */
        return function (callbackFunction, callbackArguments) {
            cordovaReadyPromise.then(function() {
                if ('function' === typeof callbackFunction) {
                    callbackFunction.apply(callbackFunction, callbackArguments);
                }
            });
            return cordovaReadyPromise;
        };
    });

})();

