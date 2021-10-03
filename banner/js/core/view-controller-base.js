/**
** ViewControllerBase
** Extend this class for individual formats
** Override getDesignSize in individual format sub-classes
**/
var ViewControllerBase = function(elementID, controllerID, orientationLock)
{
    this.rootElement = document.getElementById(elementID);
    this.controllerID = controllerID;
    this.orientationLock = orientationLock;
  	this.state = "intro";
    this.isDevice = false;
    this.isAndroid = false;
    this.isIE = false;
    this.currentOrientation = null;
    this.currentViewMode = null;
}

ViewControllerBase.prototype.awake = function()
{
    var me = this;
    Logger = Premium.utils.debug;

    this.rootElement.style.visibility = "hidden";

    this.updateCurrentOrientation();
    this.updateCurrentViewMode();

    this.isDevice = Utils.isMobileDevice();
    this.isAndroid = Utils.isAndroidDevice();
    this.isIE = Utils.detectIE();

    this.registerEvents();
    this.handleResize();
    //TweenMax.delayedCall(0.1, function() { me.start(); });
    Utils.addEvent(window, "DOMContentLoaded", function() { me.start(); });
};

ViewControllerBase.prototype.start = function()
{
    Logger(this.controllerID + " start() - orientation = " + this.currentOrientation + " is mobile = " + this.isDevice + ". is android = " + this.isAndroid);
    this.viewReady();
};

ViewControllerBase.prototype.show = function()
{
    this.rootElement.style.visibility = "visible";
    document.body.style.opacity = 1;
};


ViewControllerBase.prototype.registerEvents = function()
{
    var me = this;
    Utils.addEvent(window, "resize", function(event) { me.handleResize(); });
};

ViewControllerBase.prototype.handleResize = function()
{
    if (this.orientationLock === "none")
    {
        if (this.getOrientation() != this.currentOrientation)
        {
            this.updateCurrentOrientation();
        }
    }

    if (this.getCurrentViewMode() != this.currentViewMode)
    {
        this.updateCurrentViewMode();
    }

    this.scaleElements();
    this.resizePanel();
};

ViewControllerBase.prototype.updateCurrentOrientation = function()
{
    this.currentOrientation = this.getOrientation();
    switch (this.currentOrientation)
    {
        case "landscape":
            this.changeToLandscape();
        break;
        case "portrait":
            this.changeToPortrait();
        break;
    }
}

ViewControllerBase.prototype.updateCurrentViewMode = function()
{
    this.currentViewMode = this.getCurrentViewMode();
    switch (this.currentViewMode)
    {
        case "mobile":
            this.changeToMobile();
        break;
        case "tablet":
            this.changeToTablet();
        break;
        case "desktop":
            this.changeToDesktop();
        break;
    }
};


// Override
ViewControllerBase.prototype.changeToLandscape = function()
{
};

// Override
ViewControllerBase.prototype.changeToPortrait = function()
{
};

// SCREEN MODE CHANGES
ViewControllerBase.prototype.changeToMobile = function()
{
    Logger("CHANGE TO MOBILE");
};

ViewControllerBase.prototype.changeToTablet = function()
{
    Logger("CHANGE TO TABLET");
};

ViewControllerBase.prototype.changeToDesktop = function()
{
    Logger("CHANGE TO DESKTOP");
};


ViewControllerBase.prototype.scaleElements = function()
{
    var scope = this;

    var h = this.getWindowSize().height;
    var rh = h / this.getDesignSize().height;

    var w = this.getWindowSize().width;
    var rw = w / this.getDesignSize().width;

    var scaleFactor = 1;

    var containElements = document.getElementsByClassName("contain");
    for (var i = 0; i < containElements.length; i++) {
        scaleFactor = Math.min(1, Math.min(rh, rw));
        TweenMax.set(containElements[i], {scale:scaleFactor});
    };

    var coverElements = document.getElementsByClassName("cover");
    for (var j = 0; j < coverElements.length; j++) {
        scaleFactor =  Math.max(rh, rw);
        TweenMax.set(coverElements[j], {scale:scaleFactor});
    };

};


ViewControllerBase.prototype.getWindowSize = function()
{
    var w = window.innerWidth || (document.documentElement || document.body).clientWidth;
    var h = window.innerHeight || (document.documentElement || document.body).clientHeight;
    return {width:w, height:h};
}


// Override this function for individual format
ViewControllerBase.prototype.getDesignSize = function()
{
    var size = {};
    var mode = this.getCurrentViewMode();

    var orientation = this.getOrientation();

    switch (orientation)
    {
    case "portrait":
        size = {'width':1080, 'height':1920};
        break;
    case "landscape":
        size = {'width':1920, 'height':736};
        break;
    default:
        console.warning("error - unknown mode");
    }

    return size;
};


ViewControllerBase.prototype.getThresholdSize = function()
{
    var size = {'width': 250, 'height':1200};
    return size;
};

// Helper functions
ViewControllerBase.prototype.getOrientation = function()
{
    var orientation = this.orientationLock === "none" ? document.documentElement.clientWidth > document.documentElement.clientHeight ? "landscape" : "portrait" : this.orientationLock;
    return orientation;
};

ViewControllerBase.prototype.getCurrentViewMode = function()
{
    var mode = "";
    var w = this.getWindowSize().width;;

    if (w < 768)
    {
        mode = "mobile";
    }
    else if (w >= 768 && w < 1280)
    {
        mode = "tablet";
    }
    else
    {
        mode = "desktop";
    }

    return mode;
};


ViewControllerBase.prototype.pulseArrow = function(arrow)
{
	var pulseTL = new TimelineMax({repeat:-1, repeatDelay:0.2});
  	pulseTL.to(arrow, 0.2, { left:"+=6px", force3D:false });
    pulseTL.to(arrow, 0.22, { left:"-=6px", force3D:false });
    pulseTL.to(arrow, 0.2, { left:"+=6px", force3D:false });
    pulseTL.to(arrow, 0.22, { left:"-=6px", force3D:false });
};


ViewControllerBase.prototype.resizePanel = function()
{};
