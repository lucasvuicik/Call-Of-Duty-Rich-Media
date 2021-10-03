"use strict";
var Premium = Premium || {};


Premium.creative = {
    init: function () {

        Premium.communicator.init(3);
        TweenMax.to('#body_right', .1, { opacity: 1, delay: .1, rotationZ: '0.01deg', ease: Power2.easeOut });

        var rightAnima = new TimelineMax({ paused: true });
        var rightSmoke = new TimelineMax({ paused: true, repeat: -1 });

        setTimeout(function () {
            var message = { from: "right", id: "play" };
            Premium.communicator.api.sendMessage(JSON.stringify(message));
            rightAnima.play();
            rightSmoke.play();
        }, 900);


        // Timeline & Animation
        rightSmoke
            .addLabel('start')
            .to('#right-smoke-1', 2, { opacity: 1, ease: Power0.easeNone }, 'start' + '+=1')
            .to('#right-smoke-1', 10, { scale: 2, x: '100%', y: '-85%', rotationZ: '0.01deg', ease: Power0.easeNone }, 'start' + '+=1')
            .to('#right-smoke-1', .8, { opacity: 0, ease: Power0.easeNone }, 'start' + '+=9')

            .to('#right-smoke-2', 2, { opacity: 1, ease: Power0.easeNone }, 'start' + '+=10')
            .to('#right-smoke-2', 10, { scale: 2, x: '100%', y: '-85%', rotationZ: '0.01deg', ease: Power0.easeNone }, 'start' + '+=10')
            .to('#right-smoke-2', .8, { opacity: 0, ease: Power0.easeNone }, 'start' + '+=19')

        rightAnima
            .addLabel('start')
            .set('.sides-call-of-duty img', { y: '-120%' })
            .set('.sides-cta-wrap', { x: '-50%', y: '-50%', scale: 2 })
            .set('#right-case', { x: '-50%', y: '-50%', scale: 0.2 })
            .staggerTo('.sides-logo-anima', .4, { opacity: 1, scale: 1, rotationZ: '0.01deg', ease: Power2.easeIn }, .2, 'start' + '+=0')
            .to('#right-case', 1, { opacity: 1, scale: 1, rotationZ: '0.01deg', ease: Back.easeOut.config(1.7) }, 'start' + '+=0.5')
            .to('.sides-cta-wrap', .5, { opacity: 1, x: '-50%', y: '-50%', scale: 1, rotationZ: '0.01deg', ease: Power2.easeIn }, 'start' + '+=.8')

        // PARTICLES
        particlesJS.load('right-particles-js', 'js/particles.json', function () { });

        // Cta Mouse Over
        document.querySelector('.sides-cta-wrap').onmouseover = function () {
            TweenMax.to('.sides-cta-hover', .6, { opacity: 1, ease: Power2.easeOut })
        };

        document.querySelector('.sides-cta-wrap').onmouseout = function () {
            TweenMax.to('.sides-cta-hover', .6, { opacity: 0, ease: Power2.easeOut })
        };

    }
}

