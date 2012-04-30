/**
 * @name jQuery Google Analytics Event Tracking (https://github.com/jgarber623/jquery-googleanalytics)
 * @author Jason Garber
 * @copyright (cc) Jason Garber (http://sixtwothree.org and http://www.viget.com)
 * 
 * Licensed under the CC-GNU GPL (http://creativecommons.org/licenses/GPL/2.0/)
 */

;(function( $, window, document, undefined ) {
	
	window._gaq = window._gaq || [];
	
	var GoogleAnalytics = function( elem, options ) {
		this.elem = elem;
		this.$elem = $( elem );
		this.options = options;
		this.metadata = this.$elem.data( "track-options" );
	};
	
	GoogleAnalytics.prototype = {
		defaults: {
			selectors: "a, button",
			separator: ", "
		},
		
		init: function() {
			this.config = $.extend( {}, this.defaults, this.options, this.metadata );
			
			var selectors_components = this.config.selectors.split( "," );
			
			for ( i = 0, j = selectors_components.length; i < j; i++ ) {
				selectors_components[i] = $.trim( selectors_components[i] ) + "[data-track-method]";
			}
			
			this.$elem.on( "mousedown.googleanalytics keydown.googleanalytics", selectors_components.join(), $.proxy( this.track, this ) );
			
			return this;
		},
		
		push: function( method, params ) {
			var param_components = params.split( this.config.separator );
			
			if ( method === "_trackEvent" ) {
				param_components[3] = ( !param_components[3] || param_components[3] === "" ) ? 0 : parseInt( param_components[3], 10 );
				param_components[4] = ( param_components[4] && param_components[4].toLowerCase() === "true" ) ? true : false;
			}
			
			_gaq.push( [method].concat( param_components ) );
		},
		
		track: function( event ) {
			if ( event.type === "mousedown" || event.which === 13 ) {
				var $target = $( event.currentTarget ),
					method = $target.data( "track-method" ),
					params = $target.data( "track-params" );
				
				this.push( method, params );
			}
		}
	};
	
	GoogleAnalytics.defaults = GoogleAnalytics.prototype.defaults;
	
	$.fn.googleanalytics = function( options ) {
		return this.each( function() {
			new GoogleAnalytics( this, options ).init();
		});
	};
	
	window.GoogleAnalytics = GoogleAnalytics;
	
})( jQuery, window , document );