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
], function($, remember, getWebFont){

  // this sets toggles to correct state on initial page load

  return function(toggleSwitch, toggleClass) {
    var storageType = remember({ name: 'storageType' }) || 'default',
        localLato = remember({ name: 'localLato' }),
        allowHover = remember({ name: 'allowHover' }),
        $latoToggle = $('.jq_lato_toggle'),
        $storageToggle = $('.jq_storage_toggle'),
        $hoverToggle = $('.jq_hover_toggle'),
        $toggleItem = null;

    // for each option, set the toggle swith to correct side and set the input checkbox
    function toggle($toggleItem){
      $toggleItem.children(toggleSwitch).removeClass(toggleClass);
      $toggleItem.find('input[type=checkbox]').prop('checked', true);
    }

    // whether we are using localstorage/cookies
    if (storageType === 'cookie'){
      toggle($storageToggle);
    }

    // whether we want to use the header drop down by clicking/hover
    if (allowHover === 'true'){
      toggle($hoverToggle);
    }

    // for local lato, toggle the switch, and decide whether google web fonts should be pulled in
    if (localLato === 'true') {
      toggle($latoToggle);
    }
  };
});
