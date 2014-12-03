require.config({
	baseUrl: 'dest',
  	deps: ['bootstrap'],
	shim: {
	    jquery: {
	     	exports: 'jquery'
	    },
	    lodash: {
	     	exports: '_'
	    },
	    angular: {
	     	exports: 'angular'
	    },
	    'angular-animate': {
	     	deps: ['angular']
	    },
	    'ui.router': {
	        deps: ['angular']
	    }
  	}
});
