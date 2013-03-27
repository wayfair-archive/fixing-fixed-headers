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
  'ffh/remember',
  'ffh/getWebFont'
],
function($, remember, getWebFont){

  // this pulls in/resets google web fonts when input is clicked

  $.fn.latoToggle = function(trigger) {
    var lato;

    lato = {
      init: function(){
        var localLato = this._checkStorage();

        // if local lato currently true, get remove lato and update storage
        // else, we are using remote lato, so reset it and update storage
        if (localLato === 'true'){
          this._get();
          this._setStorage(false);
        } else {
          this._reset();
          this._setStorage(true);
        }
      },
      _checkStorage: function(){
        // grab our option preference from storage
        // we dont need to check where to get it from, only important (for our purposes) in setting
        return remember({ name: 'localLato' });
      },
      _setStorage: function(switchValue){
        var storageType = this._storageType();
        // set the new local lato preference, and set it in the correct place based on storage preference
        remember({ name: 'localLato', value: switchValue, use: storageType });
      },
      _storageType: function(){
        // determine what the storage preference is. will return cookies or localstorage (or default for localstorage)
        return remember({ name: 'storageType' }) || 'default';
      },
      _reset: function(){
        var regex = new RegExp(/googleapis/),
            $lastLink = $('head').find('link').last();

        // if we currently are using webfonts and want remove it,
        // match the api subdomain, and strip it from dom
        if (regex.test($lastLink.attr('href'))) {
          $lastLink.remove();
        }
      },
      _get: function(){
        // handle this in another utility method so we can also grab it on page load
        getWebFont();
      }
    };

    return this.each(function(){
      var $self = $(this);
      $self.on('click', trigger, function(){
        lato.init();
      });
    });
  };
});
