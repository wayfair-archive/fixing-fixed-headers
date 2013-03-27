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
  'ffh/initToggles'
], function($, initToggles){

  // this will get the (fake) api and handle bringing it in/out of header. only makes 1 ajax call

  return function(options){
    var api;

    $.getJSON('api/ffh.json', function(data){

      // initiate on load
      api = $('.jq_ffh_scrollspy li.active').data('api');
      $('.jq_ffh_nav').html(data[api]);
      initToggles('.ffh_toggle', 'ffh_toggle_off');

      // adjust header when scrollspy triggers activate event
      $('#jq_ss_scrollspy').on('activate', '.jq_ffh_api', function(){
        api = $(this).data('api');
        $('.jq_ffh_nav').html(data[api]);
        initToggles('.ffh_toggle', 'ffh_toggle_off');
      });
    });
  };
});
