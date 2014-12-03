define(['angular','ui.router'], 
	function(angular){
		var app = angular.module('configApp', [
			'ui.router'
		]);

		app.factory('authInterceptor', ['$q', '$injector',
	        function($q) {
	            return {
	                // On request success
                    request: function (config) {
                        console.log(config);
                        return config || $q.when(config);
                    },

                    // On response success
                    response: function (response) {
                        console.log(response);
                        return response || $q.when(response);
                    },

                    responseError: function(rejection) {
                        console.log(rejection);
                        return $q.reject(rejection);
                    }
	            };
	        }
	    ]);

	    app.config(['$httpProvider', '$stateProvider',
        	function($httpProvider, $stateProvider) {
            	$httpProvider.interceptors.push('authInterceptor');
        }]);



});