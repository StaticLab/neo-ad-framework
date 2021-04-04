/** SIZMEK VIDEO PLAYER
 ********************************************************************************************/

var BLT = BLT || {};
BLT.Video = BLT.Video || {};

var $videoArray = [],
    $videoGroups = {},
    $vidPlayer = undefined,
    $currID = undefined,
    $currTuneIn = undefined,
    $currReportingID = undefined,
    $isPlaying = false,
    $autoPlay = false
    ;


/** INIT
 ********************************************************************************************/
BLT.Video.init = function (vidElement) {
    $vidPlayer = vidElement;
    BLT.Video.checkInit(); // error check

    BLT.Video.addListeners();

    // determine current group ID based on TuneIn
    var tuneinID = BLT.Tunein.currentID;
    tuneinID === undefined ? $currTuneIn = 'default' : $currTuneIn = tuneinID;
};


/** ADD LISTENERS
 ********************************************************************************************/
BLT.Video.addListeners = function () {
    // ad events
    addEventListener ('collapseAd', BLT.Video.handleEvents);
    addEventListener ('parseDates', BLT.Video.handleEvents);
    addEventListener ('pauseVideo', BLT.Video.handleEvents);
    addEventListener ('playVideo', BLT.Video.handleEvents);
    addEventListener ('replayVideo', BLT.Video.handleEvents);
    addEventListener ('videoPlaying', BLT.Video.handleEvents);
    addEventListener ('killVideo', BLT.Video.handleEvents);
    addEventListener ('muteVideo', BLT.Video.handleEvents);
    addEventListener ('unmuteVideo', BLT.Video.handleEvents);

    // video events
    $vidPlayer.addEventListener ('timeupdate', BLT.Video.handleProgress);
    $vidPlayer.addEventListener ('canplay', BLT.Video.handleEvents);
    $vidPlayer.addEventListener ('ended', BLT.Video.handleEvents);
    $vidPlayer.addEventListener ('loadedmetadata', BLT.Video.handleEvents);

    // FULL SCREEN METHODS
    addEventListener ('showFullscreen', BLT.Video.handleEvents);
    addEventListener ('exitFullscreen', BLT.Video.handleEvents);

    // FULL SCREEN EXIT DETECTION
    addEventListener ('webkitfullscreenchange', BLT.Video.onExitFSHandler, false);
    addEventListener ('mozfullscreenchange', BLT.Video.onExitFSHandler, false);
    addEventListener ('fullscreenchange', BLT.Video.onExitFSHandler, false);
    addEventListener ('MSFullscreenChange', BLT.Video.onExitFSHandler, false);
};


/** HANDLE EVENTS
 ********************************************************************************************/
BLT.Video.handleEvents = function (e) {
    //console.info ('HANDLE VIDEO EVENTS: ' + e.type);

    switch (e.type) {
        case 'collapseAd':
            dispatchEvent (BLT.Events.KILL_VIDEO);
            break;
        case 'parseDates':
            BLT.Video.sortGroups();
            break;
        case 'pauseVideo':
            BLT.Video.pauseVideo();
            break;
        case 'playVideo':
            BLT.Video.playVideo();
            break;
        case 'replayVideo':
            BLT.Video.replayVideo();
            break;
        case 'muteVideo':
            BLT.Video.toggleMute(true);
            break;
        case 'unmuteVideo':
            BLT.Video.toggleMute(false);
            break;
        case 'killVideo':
            BLT.Video.killVideo();
            break;
        case 'showFullscreen':
            BLT.Video.showFullScreen();
            break;
        case 'hideFullscreen':
            BLT.Video.exitFullScreen();
            break;
        case 'canplay':
            dispatchEvent (BLT.Events.VIDEO_READY);
            break;
        case 'ended':
            $isPlaying = false;
            dispatchEvent (BLT.Events.VIDEO_COMPLETE);
            BLT.Video.exitFullScreen();
            break;
        case 'loadedmetadata':
            BLT.Video.checkSize();
            break;
    }
};


/** HANDLE PROGRESS
 ********************************************************************************************/
BLT.Video.handleProgress = function (event) {
    var duration = $vidPlayer.duration;
    var currTime = $vidPlayer.currentTime;
    var perc = ((currTime/duration) *100).toFixed(2);

    if (perc >= 75 && perc <= 76) {
        console.log ('3RD QUARTILE');
        dispatchEvent (BLT.Events.VIDEO_75_PERCENT);
    }
    else if (perc >= 50 && perc <= 51) {
        console.log ('MIDPOINT');
        dispatchEvent (BLT.Events.VIDEO_50_PERCENT);
    }
    else if (perc >= 25 && perc <= 26) {
        console.log ('1ST QUARTILE');
        dispatchEvent (BLT.Events.VIDEO_25_PERCENT);
    }
};


/** ADD VIDEO
 ********************************************************************************************/
BLT.Video.addVideo = function (sourcePath, groupID, reportingID) {
    BLT.Video.checkInit(); // error check

    // create video object
    var videoObj = {};
    videoObj.source = sourcePath;
    videoObj.groupID = groupID;
    videoObj.reportingID = reportingID;

    // add to $videoArray
    $videoArray.push (videoObj);

    // rebuild $videoGroups
    BLT.Video.sortGroups();
};


/** SORT GROUPS
 ********************************************************************************************/
BLT.Video.sortGroups = function () {
    // rebuld $videoGroups from $videoArray
    $videoGroups = {};

    for (var i in $videoArray) {
        var videoObj = ($videoArray[i]);

        // check if tuneIn is used, if not, add to a 'default' group
        var groupID = videoObj.groupID;
        $currTuneIn = BLT.Tunein.currentID;

        if ($currTuneIn === undefined) {
            $currTuneIn = 'default';
            groupID = 'default';
        }

        // check if group exists in $videoGroups; if not create the group object
        if ($videoGroups.hasOwnProperty(groupID) === false) {
            $videoGroups[groupID] = [];
        }

        $videoGroups[groupID].push (videoObj);
    }
};


/** LOAD VIDEO
 ********************************************************************************************/
BLT.Video.loadVideo = function (videoID, controlType, isMuted ) {
    BLT.Video.checkInit(); // error check

    // dispose any previous video instances
    BLT.Video.killVideo();

    var sourceVideo = $videoGroups[$currTuneIn][videoID].source;
    $currID = videoID;
    $currReportingID = $videoGroups[$currTuneIn][videoID].reportingID;

    // mp4 video
    srcNode = document.createElement ('source');
    srcNode.setAttribute ('type', 'video/mp4');
    srcNode.setAttribute ('src', (sourceVideo + '.mp4'));
    $vidPlayer.appendChild (srcNode);

    // webm video
    var srcNode = document.createElement ('source');
    srcNode.setAttribute ('type', 'video/webm');
    srcNode.setAttribute ('src', (sourceVideo + '.webm'));
    $vidPlayer.appendChild (srcNode);

    // initially remove controls
    $vidPlayer.removeAttribute ("controls");
    dispatchEvent (BLT.Events.HIDE_CONTROLS);

    // if adding controls, determine what type
    if (controlType === 'default') $vidPlayer.setAttribute ("controls", "controls");
    else if (controlType === 'custom') BLT.VideoControls.initControls ($vidPlayer);

    // set autoplay
    if ($autoPlay === true) $vidPlayer.setAttribute ("autoplay", $autoPlay);
    else $vidPlayer.removeAttribute ("autoplay");

    // handle muting
    if (isMuted === undefined) isMuted = false;
    BLT.Video.toggleMute (isMuted);

    // SIZMEK TRACKING
    var videoTrackingModule = new EBG.VideoModule ($vidPlayer);

    $vidPlayer.load();


    if ($autoPlay === true) {
        $autoPlay = false;
        $isPlaying = true;
        dispatchEvent (BLT.Events.VIDEO_PLAYING);
    }
};


/** LOAD & PLAY VIDEO
 ********************************************************************************************/
BLT.Video.loadPlayVideo = function (videoID, controlType, isMuted) {
    $autoPlay = true;
    BLT.Video.loadVideo (videoID, controlType, isMuted);
};



/** PLAY VIDEO
 ********************************************************************************************/
BLT.Video.playVideo = function () {
    $vidPlayer.play ();
    $isPlaying = true;
    dispatchEvent (BLT.Events.VIDEO_PLAYING);
};

/** PAUSE VIDEO
 ********************************************************************************************/
BLT.Video.pauseVideo = function () {
    $vidPlayer.pause ();
    $isPlaying = false;
    dispatchEvent (BLT.Events.VIDEO_PAUSED);
};

/** REPLAY VIDEO
 ********************************************************************************************/
BLT.Video.replayVideo = function () {
    $vidPlayer.pause ();
    $vidPlayer.currentTime = 0;
    $vidPlayer.play ();
    $isPlaying = true;
    dispatchEvent (BLT.Events.VIDEO_PLAYING);
};


/** KILL VIDEO
 ********************************************************************************************/
BLT.Video.killVideo = function () {
    if ($isPlaying == true) $vidPlayer.pause();
    $isPlaying = false;
    while ($vidPlayer.firstChild) {
        $vidPlayer.removeChild ($vidPlayer.firstChild);
    }
};


/** TOGGLE MUTE
 ********************************************************************************************/
BLT.Video.toggleMute = function (muteState) {
    $vidPlayer.muted = muteState;

    if (muteState === true) dispatchEvent (BLT.Events.VIDEO_MUTED);
    else dispatchEvent (BLT.Events.VIDEO_UNMUTED);
};


/** CHECK VIDEO SIZE
 ********************************************************************************************/
BLT.Video.checkSize = function() {
    // check if video can play in IE
    if ($vidPlayer.videoWidth > 1920 || $vidPlayer.videoHeight > 1088) {
        console.error("<<< VIDEO EXCEEDS MAXIMUM SIZE FOR IE (1920x1088) >>>");
        console.error(" <<< RESIZE THE VIDEO WITHIN SPEC FOR IE SUPPORT >>>");
    }
};



/** SHOW FULLSCREEN METHOD
 ********************************************************************************************/
BLT.Video.showFullScreen = function() {
    if (document.requestFullscreen)             document.requestFullscreen();
    else if (document.mozRequestFullScreen)     document.mozRequestFullScreen();
    else if (document.webkitRequestFullscreen)  document.webkitRequestFullscreen();
    else if (document.msRequestFullscreen)      document.msRequestFullscreen();

    dispatchEvent (BLT.Events.VIDEO_FULLSCREEN_OPENED);
};


/** EXIT FULLSCREEN METHOD
 ********************************************************************************************/
BLT.Video.exitFullScreen = function() {
    // cross browser exit fullscreen helper
    if (document.exitFullscreen)                document.exitFullscreen();
    else if (document.mozCancelFullScreen)      document.mozCancelFullScreen();
    else if (document.webkitCancelFullScreen)   document.webkitCancelFullScreen();
    else if (document.msExitFullscreen)         document.msExitFullscreen();
};


/** EXIT FULLSCREEN CALLBACK
 ********************************************************************************************/
BLT.Video.onExitFSHandler = function(e)
{
    // run when fullscreen is exited
    if (document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement === false)
    {
        dispatchEvent (BLT.Events.VIDEO_FULLSCREEN_CLOSED);
    }
};


/** ERROR CHECKING
 ********************************************************************************************/
BLT.Video.checkInit = function () {
    if ($vidPlayer === undefined) {
        throw "Video Element not defined. Please use BLT.Video.init () to pass the video element prior to using the video player."
    }
};

