"use strict";
var Premium = Premium || {};


Premium.creative = {
    clickURL: "http://www.example.com/",

    init: function () {
        var skinLeftController = new LeftGutterController("body_left", "SkinLeft", "landscape");
        skinLeftController.awake();

        Premium.communicator.init(3);
        TweenMax.to('#body_left', .1, { opacity: 1, delay: .1, rotationZ: '0.01deg', ease: Power2.easeOut });

        var leftAnima = new TimelineMax({ paused: true });
        var leftSmoke = new TimelineMax({ paused: true, repeat: -1 });
        var videoContainerLeft = document.getElementById("left-video-wrap");
        var firstLoaded = false;

        // PARALLAX
        $("#left-container").mousemove(function (e) {
            parallaxIt(e, "#left-hero img", - 30);
        });

        function parallaxIt(e, target, movement) {
            var $this = $("#left-container");
            var relX = e.pageX - $this.offset().left;
            var relY = e.pageY - $this.offset().top;

            TweenMax.to(target, 1, {
                x: (relX - $this.width() / 2) / $this.width() * movement,
                y: (relY - $this.height() / 2) / $this.height() * movement
            });
        }

        // PARTICLES
        particlesJS.load('left-particles-js', 'js/particles.json', function () { });

        // ANIMAS
        leftSmoke
            .addLabel('start')
            .to('#left-smoke-1', 2, { opacity: 1, ease: Power0.easeNone }, 'start' + '+=1')
            .to('#left-smoke-1', 10, { scale: 2, x: '-100%', y: '-85%', rotationZ: '0.01deg', ease: Power0.easeNone }, 'start' + '+=1')
            .to('#left-smoke-1', .8, { opacity: 0, ease: Power0.easeNone }, 'start' + '+=9')

            .to('#left-smoke-2', 2, { opacity: 1, ease: Power0.easeNone }, 'start' + '+=10')
            .to('#left-smoke-2', 10, { scale: 2, x: '-100%', y: '-85%', rotationZ: '0.01deg', ease: Power0.easeNone }, 'start' + '+=10')
            .to('#left-smoke-2', .8, { opacity: 0, ease: Power0.easeNone }, 'start' + '+=19')


        leftAnima
            .addLabel('start')
            .set('#left-hero', { x: '-50%', y: '40px', scale: 1.2 })
            .set('.sides-cta-wrap', { x: '-50%', y: '-50%', scale: 2 })
            .staggerTo('.sides-logo-anima', .4, { opacity: 1, scale: 1, rotationZ: '0.01deg', ease: Power2.easeIn }, .2, 'start' + '+=0')
            .to('#left-hero', .6, { opacity: 1, ease: Power2.easeOut }, 'start' + '+=.6')
            .to('#left-hero', 10, { scale: 1, rotationZ: '0.01deg', ease: Power2.easeOut }, 'start' + '+=.6')
            .to('.sides-cta-wrap', .5, { opacity: 1, x: '-50%', y: '-50%', scale: 1, rotationZ: '0.01deg', ease: Power2.easeIn }, 'start' + '+=.8')


        // Cta Mouse Over
        document.querySelector('.sides-cta-wrap').onmouseover = function () {
            TweenMax.to('.sides-cta-hover', .6, { opacity: 1, ease: Power2.easeOut })
        };

        document.querySelector('.sides-cta-wrap').onmouseout = function () {
            TweenMax.to('.sides-cta-hover', .6, { opacity: 0, ease: Power2.easeOut })
        };

        Premium.communicator.api.receiveMessage(function (e) {
            var obj = JSON.parse(e);
            if (obj.id === "play") {
                leftAnima.play();
                leftSmoke.play();
            }
        });

        if (!firstLoaded) {
            firstLoaded = true;
            setTimeout(function () {
                leftAnima.play();
            }, 1000);
        }


    }
}

var LeftGutterController = function (elementID, controllerID, orientationLock) {
    ViewControllerBase.call(this, elementID, controllerID, orientationLock);

    this.isSetup = false;
    this.expandVideo = document.getElementById("expand-button");

}
Utils.inheritsFrom(LeftGutterController, ViewControllerBase);

var p = LeftGutterController.prototype;

// format specific intialisation
p.viewReady = function () {
    Logger(this.controllerID + " panel ready");
    var me = this;
    var count = 0;

    document.getElementById("video").volume = 0; // set volume to zero in one of the panels involved in switchOnScroll
    Premium.video.switchOnScroll(document.getElementById("video-container-left"), 2, function (pos) {
        if (pos === 'down') {
            TweenMax.to('#left-scroll-wrap', .6, { opacity: 1, ease: Power2.easeOut })
            TweenMax.to('.sides-cta-wrap', .6, { opacity: 0, ease: Power2.easeOut })
        }
        
        if (pos === 'up') {
            TweenMax.to('#left-scroll-wrap', .6, { opacity: 0, ease: Power2.easeOut })
            TweenMax.to('.sides-cta-wrap', .6, { opacity: 1, ease: Power2.easeOut })
        }
    });

    this.expandVideo.addEventListener("click", function (e) {
        Premium.expand.expand("expanded.html", "width:100%; height:100%;", undefined, undefined, "display:block");
    });

    this.show();
};

// overrides base class
p.getDesignSize = function () {
    var size = { 'width': 500, 'height': 1200 };
    return size;
};
