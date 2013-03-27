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
  'scrollspy',
  'ffh/colorSwitch',
  'ffh/fixedCheck',
  'ffh/remember',
  'ffh/initToggles'
], function($, scrollspy, colorSwitch, fixedCheck, remember, initToggles){

  return function(spyTarget) {
    var scrollEvents;

    scrollEvents = {
      init: function(){
        var self = this,
            $body = $('body');

        // call functions on load
        self._fixedCheck();
        self._bootstrapScrollSpy();

        // and keep checking fixed on scroll
        $(window).on('scroll', function(){
          self._fixedCheck();
        });

        // jump to defined section on click. this is needed to cover the height offset
        $body.on('click', 'a[href*=#]', function(e){
          self._jumpTo(e);
        });

      },
      _bootstrapScrollSpy: function(){
        // initiate bootstrap scrollspy
        $('body').scrollspy({ target: spyTarget, offset: 150 });
        // run refresh since pulling in data to dom with custom events
        $('[data-spy="scroll"]').each(function(){
          $(this).scrollspy('refresh');
        });
        // within spyTarget, listen on li and a with active class
        $('li').on('activate', function(){
          // trigger color on activation
          $('li.active a').colorSwitch({ trigger: 'init', property: 'background', past: 'li a' });
        });
      },
      _fixedCheck: function(){
        fixedCheck('.jq_ffh_scrollspy', 'ffh_fixed', { offset: 345 });
      },
      _jumpTo: function(e){
        // for links associated with id's, go to their position (minus offset)
        e.preventDefault();
        $(window).scrollTop($($(e.currentTarget).attr('href')).offset().top - 79);
      }
    };

    scrollEvents.init();
  };
});
