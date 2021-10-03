"use strict";
var Premium = Premium || {};


Premium.creative = {

    init: function () {

        TweenMax.to('#body_back', .1, { opacity: 1, delay: .1, rotationZ: '0.01deg', ease: Power2.easeOut });
    }
}
