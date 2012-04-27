/**
 * @name jQuery Google Analytics (https://github.com/jgarber623/jquery-googleanalytics)
 * @author Jason Garber
 * @copyright (cc) Jason Garber (http://sixtwothree.org and http://www.viget.com)
 * 
 * Licensed under the CC-GNU GPL (http://creativecommons.org/licenses/GPL/2.0/)
 */

;(function( $, window, document, undefined ) {
	
	var GoogleAnalytics = function( elem, options ) {
		this.elem = elem;
		this.$elem = $( elem );
		this.options = options;
		this.metadata = this.$elem.data( "track-options" );
	};
	
	GoogleAnalytics.prototype = {
		defaults: {
			separator: ", "
		},
		
		init: function() {
			this.config = $.extend( {}, this.defaults, this.options, this.metadata );
			
			this.$elem.on( "mousedown.googleanalytics keydown.googleanalytics", "a[data-track-event], button[data-track-event]", $.proxy( this.track, this ) );
		},
		
		push: function( tracking_components ) {
			if ( _gaq !== "undefined" ) {
				_gaq.push( ["_trackEvent"].concat( tracking_components ) );
			}
		},
		
		track: function( event ) {
			if ( event.type === "mousedown" || event.which === 13 ) {
				var $target = $( event.currentTarget ),
					tracking = $target.data( "track-event" ),
					tracking_components = tracking.split( this.config.separator );
				
				tracking_components[3] = ( !tracking_components[3] || tracking_components[3] === "" ) ? 0 : parseFloat( tracking_components[3] );
				tracking_components[4] = ( tracking_components[4] && tracking_components[4].toLowerCase() === "true" ) ? true : false;
				
				this.push( tracking_components );
			}
		}
	};
	
	GoogleAnalytics.defaults = GoogleAnalytics.prototype.defaults;
	
	$.fn.googleanalytics = function( options ) {
		return this.each( function() {
			new GoogleAnalytics( this, options ).init();
		});
	};
	
})( jQuery, window , document );