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

require.config({
  baseUrl: 'assets/js',
  paths: {
    hoverintent: 'vendor/jquery.hoverintent-0.7.0.min',
    scrollspy: 'vendor/jquery.scrollspy-2.3.1.min',
    detectzoom: 'vendor/detectzoom-1.0.2.min',
    highlight: 'vendor/highlight-7.3.0.min',
    modernizr: 'vendor/modernizr-2.6.2.min',
    lazyload: 'vendor/lazyload-1.8.4.min',
    jquery: 'vendor/jquery-1.9.1.min'
  }
});

define(function(require){
  var $ = require('jquery'),
      highlight = require('highlight'),
      lazyload = require('lazyload'),
      remember = require('ffh/remember'),
      dropDown = require('ffh/dropDown'),
      toggleSwitch = require('ffh/toggleSwitch'),
      latoToggle = require('ffh/latoToggle'),
      storageToggle = require('ffh/storageToggle'),
      hoverToggle = require('ffh/hoverToggle'),
      fixedCheck = require('ffh/fixedCheck'),
      scrollEvents = require('ffh/scrollEvents'),
      getWebFont = require('ffh/getWebFont'),
      api = require('ffh/api'),
      $b = $('body'),
      $w = $(window),
      storageChoice,
      hoverChoice,
      latoChoice;

  // get/set the key value pairs
  storageChoice = remember({ name: 'storageType', value: 'default', getSet: true });
  hoverChoice = remember({ name: 'allowHover', value: true, getSet: true });
  latoChoice = remember({ name: 'localLato', value: false, getSet: true });

  // call webfont once on init (if remember doesnt hit)
  if (latoChoice !== 'true'){
    getWebFont();
  }

  // init lazyloading
  $('img.lazy').lazyload();

  // init syntax highlighting
  highlight.initHighlighting();

  // initiate the ajax request calling out fake api
  api();

  // setup the delegated events, passing in the dom nodes
  // docouples modules from dom
  $b.dropDown('.jq_ffh_dd_trigger', '.jq_ffh_dd_show', { allowHover: hoverChoice })
    .toggleSwitch('.jq_ffh_toggle', '.ffh_toggle', 'ffh_toggle_off')
    .latoToggle('.jq_lato_toggle')
    .storageToggle('.jq_storage_toggle')
    .hoverToggle('.jq_hover_toggle')
    .colorSwitch({ selector: 'a.ffh_basic_link', trigger: 'hover', property: 'color' });

  // call fixed check on load and on window resize
  function callFixedCheck(){
    fixedCheck('.jq_ffh', 'ffh_fixed', { elementSpacer: '.jq_ffh_spacer', fixedSpacerClass: 'ffh_spacer' });
  }
  callFixedCheck();
  $w.resize(function(){
    callFixedCheck();
  });

  // initiate scroll events (really just handles scrollspy)
  scrollEvents('#jq_ss_scrollspy');

  // give the scrollspy nav a random color on load + activation
  $('.jq_ffh_scrollspy li.active a').colorSwitch({ trigger: 'load' });
  $('.jq_ffh_scrollspy').colorSwitch({ selector: 'li:not(.active) a', trigger: 'hover', property: 'background' });

});
