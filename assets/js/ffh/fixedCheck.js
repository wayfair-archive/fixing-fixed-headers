/**
 *
 * jQuery 1.9.1
 * require.js 2.1.5
 *
 * @author    Nick Dreckshage
 * @copyright 2013 Wayfair, LLC
 * 
 * (note -- its fine to use this with copyright, opensource)
 * 
 */

define([
  'jquery',
  'modernizr',
  'detectzoom'
], function($, Modernizr, detectZoom){

  return function(element, fixedClass, options){
    var mediaQueries = Modernizr.mq('only all'),
        touchEnabled = Modernizr.touch,
        settings,
        fixed;

    // containerWidth only impacts non media query browsers
    settings = $.extend({
      containerWidth: 940,
      elementSpacer: null,
      fixedSpacerClass: null,
      offset: null
    }, options);

    fixed = {
      init: function(element, fixedClass){

        // update the header based on zoom and width
        this._updateHeader(element, fixedClass);
      },
      _checkZoom: function(){
        // determine zoom level from 3rd party plugin
        return detectZoom.zoom();
      },
      _checkOffset: function(){
        // if we want an offset, either for side nav (like in demo), or nav that becomes fixed on scroll
        if (settings.offset !== null && $(window).scrollTop() < settings.offset){
          return false;
        } else {
          return true;
        }
      },
      _updateHeader: function(element, fixedClass){
        var $element = $(element),
            zoomLevel = this._checkZoom(),
            offset = this._checkOffset(),
            ieViewport;

        // if media queries not supported, replicate via js (width only)
        if (!mediaQueries) {
          ieViewport = $(window).width();
        }

        // only allow fixed header under optimal settings.
        // disable if the zoom level (any browser, most importantly -- mobile), or if non-mq window is less than container width
        if (zoomLevel > 1 || (!mediaQueries && ieViewport < settings.containerWidth) || offset === false){
          $element.removeClass(fixedClass);
          if (settings.elementSpacer !== null){
            $(settings.elementSpacer).removeClass(settings.fixedSpacerClass);
          }
        } else if (!$element.hasClass(fixedClass) && offset === true) {
          // add back the necessary classes if they are off
          $element.addClass(fixedClass);
          if (settings.elementSpacer !== null){
            $(settings.elementSpacer).addClass(settings.fixedSpacerClass);
          }
        }
      }
    };

    return fixed.init(element, fixedClass);
  };
});
