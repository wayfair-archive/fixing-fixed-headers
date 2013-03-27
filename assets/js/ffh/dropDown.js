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
  'hoverintent'
], function($, Modernizr, hoverIntent){

  // this handles the dropdowns with either hover intent or on click settings

  $.fn.dropDown = function(trigger, dropdown, options) {
    var settings,
        dd,
        touchEnabled = Modernizr.touch;

    settings = $.extend({
      allowHover: true    // hoverIntent on by default. setting to false enabled click dropdowns
    }, options);

    dd = {
      toggleCurrent: function(e){
        // open/close the current targeted dropdown
        e.stopPropagation();
        return $(e.currentTarget).children(dropdown).fadeToggle();
      },
      closeAll: function(e, dropdown){
        // close dropdowns other than filtered under currenttarget
        $(dropdown).filter(function(){
          return $(this).parent().not($(e.currentTarget)).length;
        }).fadeOut();
      }
    };

    return this.each(function(){
      var $self = $(this);

      // control handling of clicks/hover variations
      if (touchEnabled || (settings.allowHover === 'false')) {
        $self.on('click', trigger, function(e){
          // when trigger clicked, toggler current and close others
          dd.closeAll(e, dropdown);
          dd.toggleCurrent(e, $self);
        }).on('click', dropdown, function(e){
          // keep dropdown open when clicked inside
          e.stopPropagation();
        }).on('click', function(e){
          // when anywhere else on page clicked, close drop
          dd.closeAll(e, dropdown);
        });
      } else {
        $self.hoverIntent(function(e){
          // toggle the current on hover
          dd.toggleCurrent(e, $self);
        }, trigger);
      }
    });
  };
});
