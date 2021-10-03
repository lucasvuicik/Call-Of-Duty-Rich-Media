"use strict";
var Premium = Premium || {};


Premium.creative = {
    init: function() {


        var videoEl = document.getElementById("video");
        var videoWrap = document.getElementById('video-wrap');

        videoEl.volume = 0;
        videoWrap.style.display = 'block';
        videoWrap.style.opacity = 0;
        Premium.video.sync(videoEl, undefined, Premium.video.SyncType_Get);

        setTimeout(function () {
            PremiumJpControls.resizeAll();
            videoWrap.style.display = 'flex';
            videoWrap.style.opacity = 1;
        }, 1000);


        Premium.jpxApi.addSheet('#JPX_expandable iframe{width: 100% !important;}');

        // document.getElementById("expanded-video-close").addEventListener("click", function(){
        //     Premium.expand.close();
        // });
    }
}
