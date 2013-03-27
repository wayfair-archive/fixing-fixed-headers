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
 
define(['jquery'],
function($){

  // this will genereate random colors when called and update elements

  $.fn.colorSwitch = function(options) {
    var $el,
        settings,
        ffhColor,
        randomColor,
        property;

    settings = $.extend({
      trigger  : 'hover',       // init/hover (init if given class, then class removed for example)
      property : 'background',  // color/background
      past     : null,          // if we are using init event, clean up inactive objects. pass in selector
      selector : null           // selector if delegating
    }, options);

    ffhColor = {
      init: function($el) {
        // generate a random color and set the correct property
        property = this._property();
        randomColor = this._colors[this._randomize()];
        $el.css(property, randomColor);
        if (property === 'background-color'){
          $el.css('color', '#fff');
        }
      },
      destroy: function($el){
        // return the property to original state
        property = this._property();
        // have to do chaining rather than object, since property a variable
        // $el.css({ property: '', 'color'... wouldnt get property var
        $el.css(property, '').css('color', '');
      },
      clean: function(){
        // clean previously activated elements
        $el = $(settings.past);
        this.destroy($el);
      },
      _colors: [
        '#1ABC9C',
        '#16A085',
        '#2ECC71',
        '#27AE60',
        '#3498DB',
        '#2980B9',
        '#9B59B6',
        '#8E44AD',
        '#34495E',
        '#2C3E50',
        '#F1C40F',
        '#F39C12',
        '#E67E22',
        '#D35400',
        '#E74C3C',
        '#C0392B'
      ],
      _property: function(){
        if (settings.property === 'color') {
          property = 'color';
        } else {
          property = 'background-color';
        }

        return property;
      },
      _randomize: function(){
        return Math.floor(Math.random() * this._colors.length);
      }
    };

    return this.each(function(){
      // recreate hover now that jquery deleted it from 1.9
      if (settings.trigger === 'hover'){
        $(this).on('mouseenter', settings.selector, function(){
          ffhColor.init($(this));
        }).on('mouseleave', settings.selector, function(){
          ffhColor.destroy($(this));
        });
      } else if (settings.trigger === 'init'){
        // clean other elements, activate current
        if (settings.past !== null) {
          ffhColor.clean();
        }
        ffhColor.init($(this));
      } else if (settings.trigger === 'load'){
        ffhColor.init($(this));
      }
    });
  };
});
