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

define(['ffh/scrollEvents'], function(scrollEvents){

  return function() {

    // if we need lato, this is the JS version of google web fonts
    WebFontConfig = {
      google: { families: [ 'Lato:400,700,900,400italic:latin' ] }
    };

    (function() {
      var wf = document.createElement('script');
      wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
        '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
      wf.type = 'text/javascript';
      wf.async = 'true';
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(wf, s);
    })();
  };
});
