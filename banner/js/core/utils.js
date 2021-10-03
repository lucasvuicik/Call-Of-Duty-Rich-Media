// GLOBALLY ACCESSIBLE UTILITY FUNCTIONS


var Logger;

// IE 11 polyfill for custom event
(function () {
  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;   }  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;
})();


if ( !window.requestAnimationFrame ) {
	window.requestAnimationFrame = ( function() {
		return window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function( callback, element ) {
			window.setTimeout( callback, 1000 / 60 );
		};
	} )();
}


var Utils = {

    addEvent: function(object, type, callback) {
      if (object == null || typeof(object) == 'undefined') return;
      if (object.addEventListener) {
          object.addEventListener(type, callback, false);
      } else if (object.attachEvent) {
          object.attachEvent("on" + type, callback);
      } else {
          object["on"+type] = callback;
      }
    },

    inheritsFrom: function (child, parent) {
      child.prototype = Object.create(parent.prototype);
    },

    randomRange: function(min, max) {
        return ((Math.random()*(max-min)) + min);
    },

    appendLinkRel: function(rel, href)
    {
      	var link = document.createElement('link');
        link.rel = rel;
        link.href = href;
        document.head.appendChild(link);
    },

    isMobileDevice: function ()
    {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            return true;
        }
        return false;
    },

    detectIE: function(userAgent)
    {
        userAgent = userAgent || navigator.userAgent;
        return userAgent.indexOf("MSIE ") > -1 || userAgent.indexOf("Trident/") > -1 || userAgent.indexOf("Edge/") > -1;
    },

    isAndroidDevice: function()
    {
        if( /Android/i.test(navigator.userAgent) ) {
            return true;
        }
        return false;
    },

    convertHex: function(hex, opacity)
    {
        hex = hex.replace('#','');
        r = parseInt(hex.substring(0,2), 16);
        g = parseInt(hex.substring(2,4), 16);
        b = parseInt(hex.substring(4,6), 16);

        result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
        return result;
    }
};






// pixi animation GSAP plugin
var _gsScope = (typeof module !== "undefined" && module.exports && typeof global !== "undefined") ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
    "use strict";
    _gsScope._gsDefine.plugin({
        propName: "pixi",
        priority: 0,
        API: 2,
        version: "1.0.0",
        overwriteProps: ["alpha", "rotation", "x", "y", "scale", "scaleX", "scaleY", "pivot", "pivotX", "pivotY", "anchor", "anchorX", "anchorY"],

        init: function (target, values, tween) {
            if (!target instanceof PIXI.DisplayObject) {
                return false;
            }

            var self = this;
            Object.keys(values).forEach(function (property) {
                var value = values[property];
                switch (property) {
                    // PIXI.DisplayObject
                    case 'alpha':
                        self._addTween(target, property, target.alpha, value, property);
                        break;

                    case 'rotation':
                        self._addTween(target, property, target.rotation, value, property);
                        break;

                    case 'x':
                        self._addTween(target.position, "x", target.position.x, value, property);
                        break;

                    case 'y':
                        self._addTween(target.position, "y", target.position.y, value, property);
                        break;

                    case 'scale':
                        self._addTween(target.scale, "x", target.scale.x, value, property);
                        self._addTween(target.scale, "y", target.scale.y, value, property);
                        break;
                    case 'scaleX':
                        self._addTween(target.scale, "x", target.scale.x, value, property);
                        break;
                    case 'scaleY':
                        self._addTween(target.scale, "y", target.scale.y, value, property);
                        break;

                    case 'pivot':
                        self._addTween(target.pivot, "x", target.pivot.x, value, property);
                        self._addTween(target.pivot, "y", target.pivot.y, value, property);
                        break;
                    case 'pivotX':
                        self._addTween(target.pivot, "x", target.pivot.x, value, property);
                        break;
                    case 'pivotY':
                        self._addTween(target.pivot, "y", target.pivot.y, value, property);
                        break;

                    // PIXI.Sprite
                    case 'anchor':
                        self._addTween(target.anchor, "x", target.anchor.x, value, property);
                        self._addTween(target.anchor, "y", target.anchor.y, value, property);
                        break;
                    case 'anchorX':
                        self._addTween(target.anchor, "x", target.anchor.x, value, property);
                        break;
                    case 'anchorY':
                        self._addTween(target.anchor, "y", target.anchor.y, value, property);
                        break;

                    default:
                        console.warn('Property "' + property + '" is not supported by the PixiPlugin');
                }
            });

            return true;
        },
        set: function (ratio) {
            this._super.setRatio.call(this, ratio);
        }
    });
});
if (_gsScope._gsDefine) {
    _gsScope._gsQueue.pop()();
}
