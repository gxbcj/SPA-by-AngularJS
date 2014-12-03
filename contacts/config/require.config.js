require.config({
	baseUrl: 'dest',
  	deps: ['bootstrap'],
/*	paths:{
		jquery:'../lib/jquery',
		angular:'../lib/angular',
		lodash:'../lib/lodash',
		'ui.router':'../lib/angular-ui-router',
		'angular-animate':'../lib/angular-animate'
	},*/
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
