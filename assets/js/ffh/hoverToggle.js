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
  'ffh/remember'
],
function($, remember){

  // this will set whether we want to use hoverintent/hover or click dropdowns
  // NOTE -- this will require a reload if you switch preference

  $.fn.hoverToggle = function(trigger) {
    var hover;

    hover = {
      init: function(){
        this._setHover();
      },
      _setHover: function(){
        var allowHover = this._checkStorage(),
            storageType = this._storageType();

        // set to the opposite preference, and use correct storage preference
        if (allowHover === 'true'){
          remember({ name: 'allowHover', value: false, use: storageType });
        } else {
          remember({ name: 'allowHover', value: true, use: storageType });
        }
      },
      _checkStorage: function(){
        // check what the hover preference is currently
        return remember({ name: 'allowHover' });
      },
      _storageType: function(){
        // determine where to save preference
        return remember({ name: 'storageType' }) || 'default';
      }
    };

    return this.each(function(){
      var $self = $(this);
      $self.on('click', trigger, function(){
        hover.init();
      });
    });
  };
});
