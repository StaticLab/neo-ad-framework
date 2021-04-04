var AD = AD || {};

var adContainer     = getEl ('adContainer');
var videoContainer  = getEl ('videoContainer');
var videoPlayer     = getEl ('videoPlayer');
var endframe        = getEl ('endframe');

/***** UNCOMMENT IF THIS IS AN EXPANDABLE AD *****/
// var colPanel        = getEl ('#collapsedPanel');
// var expPanel        = getEl ('#expandPanel');


/** INITIALIZE AD
 *******************************************************************/
AD.initAd = function () {
    AD.addListeners();
    AD.setupAnimation();

    // add date coding tune-ins (year, month (actual; Jan = 1), day, label)
    //BLT.Tunein.addDate (2016, 1, 16, 'Date 1'); // Jan
    //BLT.Tunein.addDate (2016, 2, 20, 'Date 2'); // Feb
    //BLT.Tunein.parseDates ();

    //  add videos (videoPath, videoID, trackingString)
    BLT.Video.init (videoPlayer); // video player element
    BLT.Video.addVideo ('video/fpo1', 'Date 1', ':15 video');
    BLT.Video.addVideo ('video/fpo2', 'Date 1', ':30 video');

    // INITIALIZE THE AD VENDOR API
    initVendor();
};


/** SETUP LISTENERS
 *******************************************************************/
AD.addListeners = function () {
    // ad events
    addEventListener ('adReady', AD.adReady);

    /***** UNCOMMENT IF THIS IS AN EXPANDABLE AD *****/
    // addEventListener ('collapseStart', AD.collapseStart); // if expandable unit
    // addEventListener ('expandStart', AD.expandStart); // if expandable unit

    // video events
    addEventListener ('videoComplete', AD.videoComplete); // if video unit
};


/** ANIMATION SETUP
 *******************************************************************/
AD.setupAnimation = function() {
    // setup animations here; i.e. Greensock
};


/** AD READY -- CALLED ONCE VENDOR API IS READY (EVENT DISPATCHED)
 *******************************************************************/
AD.adReady = function() {
    console.info ('AD READY');

    // loads and plays video (video ID, control type ("none", "default", "custom"), isMuted)
    BLT.Video.loadPlayVideo (0, "custom", false);
};


/** COLLAPSE FUNCTIONS
 *******************************************************************/
AD.collapseStart = function (event) {
    console.info ('COLLAPSE START');
};


/** EXPAND FUNCTIONS
 *******************************************************************/
AD.expandStart = function (event) {
    console.info ('EXPAND START');
};



/** VIDEO FUNCTIONS
 *******************************************************************/
AD.videoComplete = function (event) {
    console.info ('VIDEO COMPLETE');
    // hide (videoContainer);
    // show (endframe);
};


/** STARTUP
 *******************************************************************/
window.load = AD.initAd();