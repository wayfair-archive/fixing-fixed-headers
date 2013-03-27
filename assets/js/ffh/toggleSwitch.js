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
  'jquery'
], function($){

  $.fn.toggleSwitch = function(trigger, toggleSwitch, toggleClass) {

    return this.each(function(){
      var $self = $(this),
          checkbox;

      $self.on('click', trigger, function(e){
        // prevent default to stop the input checkbox double click event
        e.preventDefault();
        $(e.currentTarget).children(toggleSwitch).toggleClass(toggleClass);
        checkbox = $(e.currentTarget).find('input[type=checkbox]');
        return checkbox.prop('checked') ? checkbox.prop('checked', false) : checkbox.prop('checked', true);
      });
    });
  };
});
