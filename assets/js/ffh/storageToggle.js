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

  // this will set whether we want to use localstorage/cookies (and store preference in correct place!)

  $.fn.storageToggle = function(trigger) {
    var storage;

    storage = {
      init: function(){
        this._setStorage();
      },
      _checkStorage: function(){
        // check what current preference is
        return remember({ name: 'storageType' });
      },
      _setStorage: function(){
        var storageType = this._checkStorage();

        // set to the reverse of the current preference
        if (storageType === 'cookie'){
          remember({ name: 'storageType', value: 'localstorage', use: 'localstorage' });
        } else {
          remember({ name: 'storageType', value: 'cookie', use: 'cookie' });
        }
      }
    };

    return this.each(function(){
      var $self = $(this);
      $self.on('click', trigger, function(){
        storage.init();
      });
    });
  };
});
