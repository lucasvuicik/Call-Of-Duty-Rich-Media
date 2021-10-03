"use strict";
var Premium = Premium || {};


Premium.creative = {

    init: function () {

        try {
            jpxApi.expandTop(435);
        } catch (e) {
            Premium.addon.topExpandable(435);
        }

        var skinTopController = new SkinTopViewController("body_top", "SkinTop", "landscape");
        skinTopController.awake();

        Premium.communicator.init(3);
        TweenMax.to('#body_top', .1, { opacity: 1, delay: .1, rotationZ: '0.01deg', ease: Power2.easeOut });

        var topAnima = new TimelineMax({});
        topAnima
            .addLabel('start')
            .to('#top-txt-1', .8, { y: '0%', rotationZ: '0.01deg', ease: Power2.easeOut }, 'start' + '+=.2')
            .to('#top-txt-2', .8, { y: '0%', rotationZ: '0.01deg', ease: Power2.easeOut }, 'start' + '+=.2')

    }
}

/**
** Skin Top View Controller
** Extends ViewControllerBase
**/
var SkinTopViewController = function (elementID, controllerID, orientationLock) {
    ViewControllerBase.call(this, elementID, controllerID, orientationLock);

    this.currentState = "collapsed";
    this.video = document.getElementById("video");

    this.isSetup = false;

}
Utils.inheritsFrom(SkinTopViewController, ViewControllerBase);

var p = SkinTopViewController.prototype;

p.viewReady = function () {
    Premium.video.switchOnScroll(document.getElementById("video-container"), 2);
    this.show();

    var me = this;
    Utils.addEvent(document.body, "mouseenter", function (e) {

        setTimeout(function() {
            PremiumJpControls.resizeAll();
        }, 200)

        var tl = new TimelineMax();
        tl.to("#video-wrapper", 0.25, { width: "100%", rotationZ: '0.01deg' }, 0);
        tl.to("#top-txt-wrap", 0.25, { opacity: 0 }, 0);

    });
    Utils.addEvent(document.body, "mouseleave", function (e) {
        
        setTimeout(function() {
            PremiumJpControls.resizeAll();
        }, 200)

        var tl = new TimelineMax();
        tl.to("#video-wrapper", 0.25, { width: "50%", rotationZ: '0.01deg' }, 0);
        tl.to("#top-txt-wrap", 0.25, { opacity: 1 }, 0);
    });
};




// overrides base class
p.getDesignSize = function () {
    var size = { 'width': 1600, 'height': 400 };
    return size;
};
