
/** BLT VIDEO CONTROLS CLASS
 **********************************************************/

var BLT = BLT || {};
BLT.VideoControls = {};

var videoPlayer,
    videoControls,
    playButton,
    pauseButton,
    soundOffButton,
    soundOnButton,
    videoScrubber,
    scrubHandle,
    videoTrack,
    videoProgress,
    trackRect,
    trackLeft,
    trackRight,
    trackWidth,
    trackOffsetLeft,
    scrubberLeft,
    videoDuration;


BLT.VideoControls.initControls = function (player) {
    videoPlayer = player;
    BLT.VideoControls.initVars();
    BLT.VideoControls.addListeners();
};


BLT.VideoControls.initVars = function () {
    // elements
    videoControls = document.getElementById     ('vidControls');
    playButton = document.getElementById        ('playButton');
    pauseButton = document.getElementById       ('pauseButton');
    soundOffButton = document.getElementById    ('soundOffButton');
    soundOnButton = document.getElementById     ('soundOnButton');
    videoScrubber = document.getElementById     ('videoScrubber');
    scrubHandle = document.getElementById       ('scrubHandle');
    videoTrack = document.getElementById        ('scrubTrack');
    videoProgress = document.getElementById     ('scrubProgress');
};


BLT.VideoControls.addListeners = function () {
    playButton.addEventListener ('click', BLT.VideoControls.handleControls);
    pauseButton.addEventListener ('click', BLT.VideoControls.handleControls);
    soundOffButton.addEventListener ('click', BLT.VideoControls.handleControls);
    soundOnButton.addEventListener ('click', BLT.VideoControls.handleControls);

    addEventListener ('hideControls', BLT.VideoControls.handleVideoEvents);
    addEventListener ('showControls', BLT.VideoControls.handleVideoEvents);
    addEventListener ('videoPlaying', BLT.VideoControls.handleVideoEvents);
    addEventListener ('videoPaused', BLT.VideoControls.handleVideoEvents);
    addEventListener ('videoMuted', BLT.VideoControls.handleVideoEvents);
    addEventListener ('videoUnmuted', BLT.VideoControls.handleVideoEvents);
    addEventListener ('killVideo', BLT.VideoControls.killControls);

    addEventListener ('videoComplete', BLT.VideoControls.handleVideoComplete);
    videoPlayer.addEventListener ('canplay', BLT.VideoControls.videoReady);

    if (videoScrubber != null) {
        videoTrack.addEventListener ('click', BLT.VideoControls.handleControls);
        videoPlayer.addEventListener ('timeupdate', BLT.VideoControls.handleProgressEvent);

        // scrubber
        scrubHandle.onmousedown = function(e) {
            videoDuration = videoPlayer.duration;
            videoPlayer.removeEventListener ('timeupdate', BLT.VideoControls.handleProgressEvent);

            document.onmousemove = function(e) {
                if (e.clientX >= (trackLeft + scrubHandle.offsetWidth /2) && e.clientX <= trackRight) {
                    BLT.VideoControls.setScrubberPosition (e);
                }
            };

            document.onmouseup = function() {
                document.onmousemove = document.onmouseup = null;
                videoPlayer.addEventListener ('timeupdate', BLT.VideoControls.handleProgressEvent);
            };
        }
    }
};

BLT.VideoControls.removeListeners = function () {
    console.log ('REMOVE CONTROL LISTENERS');

    playButton.removeEventListener ('click', BLT.VideoControls.handleControls);
    pauseButton.removeEventListener ('click', BLT.VideoControls.handleControls);
    soundOffButton.removeEventListener ('click', BLT.VideoControls.handleControls);
    soundOnButton.removeEventListener ('click', BLT.VideoControls.handleControls);

    removeEventListener ('hideControls', BLT.VideoControls.handleVideoEvents);
    removeEventListener ('showControls', BLT.VideoControls.handleVideoEvents);
    removeEventListener ('videoPlaying', BLT.VideoControls.handleVideoEvents);
    removeEventListener ('videoPaused', BLT.VideoControls.handleVideoEvents);
    removeEventListener ('videoMuted', BLT.VideoControls.handleVideoEvents);
    removeEventListener ('videoUnmuted', BLT.VideoControls.handleVideoEvents);
    removeEventListener ('killVideo', BLT.VideoControls.killControls);

    removeEventListener ('videoComplete', BLT.VideoControls.handleVideoComplete);

    videoTrack.removeEventListener ('click', BLT.VideoControls.handleControls);
    videoPlayer.removeEventListener ('timeupdate', BLT.VideoControls.handleProgressEvent);
    videoPlayer.removeEventListener ('canplay', BLT.VideoControls.videoReady);
};


BLT.VideoControls.videoReady = function (event) {
    // display controls
    show (videoControls);

    videoPlayer.removeEventListener ('canplay', BLT.VideoControls.videoReady);

    // store video's duration
    videoDuration = videoPlayer.duration;

    // if scrubber exists, set properties
    if (videoScrubber != null) {
        trackRect = videoTrack.getBoundingClientRect();
        trackWidth = trackRect.width;
        trackLeft = trackRect.left;
        trackRight = trackRect.right;
        trackOffsetLeft = videoTrack.offsetLeft;

        if (typeof scrubberLeft === 'undefined') scrubberLeft = scrubHandle.offsetLeft;
    }
};

BLT.VideoControls.handleControls = function (event) {
    var obj = event.currentTarget.id;

    switch (obj) {
        case 'playButton':
            dispatchEvent (BLT.Events.PLAY_VIDEO);
            if (videoScrubber != null && videoPlayer.currentTime == 0) videoProgress.style.width = 0;
            BLT.VideoControls.togglePlayButton (false);
            break;

        case 'pauseButton':
            dispatchEvent (BLT.Events.PAUSE_VIDEO);
            BLT.VideoControls.togglePlayButton (true);
            break;

        case 'soundOffButton':
            dispatchEvent (BLT.Events.UNMUTE_VIDEO);
            BLT.VideoControls.toggleMuteButton (false);
            break;

        case 'soundOnButton':
            dispatchEvent (BLT.Events.MUTE_VIDEO);
            BLT.VideoControls.toggleMuteButton (true);
            break;

        case 'scrubTrack':
            BLT.VideoControls.setScrubberPosition (event);
            break;
    }
};

BLT.VideoControls.handleVideoEvents = function (event) {
    switch (event.type) {
        case 'videoPlaying':
            BLT.VideoControls.togglePlayButton (false);
            break;

        case 'videoPaused':
            BLT.VideoControls.togglePlayButton (true);
            break;

        case 'hideControls':
            BLT.VideoControls.showHideControls ('hidden');
            break;

        case 'showControls':
            BLT.VideoControls.showHideControls ('visible');
            break;

        case 'videoMuted':
            BLT.VideoControls.toggleMuteButton (true);
            break;

        case 'videoUnmuted':
            BLT.VideoControls.toggleMuteButton (false);
            break;
    }
};

BLT.VideoControls.showHideControls = function (state) {
    videoControls.style.visibility = state;
};


BLT.VideoControls.setScrubberPosition = function (event) {
    if (!videoDuration) videoDuration = videoPlayer.duration;

    var currPos = event.clientX;
    var newPos = currPos - trackLeft;
    var posRatio = newPos / trackWidth;
    var newTime = videoDuration * posRatio;

    videoPlayer.currentTime = newTime;
    scrubHandle.style.left = (newPos - (scrubHandle.offsetWidth /2)) + "px";
    videoProgress.style.width = (currPos - trackLeft) + "px";
};


BLT.VideoControls.handleProgressEvent = function () {
    if (!videoDuration) videoDuration = videoPlayer.duration;

    // moves scrubber in relation to currentTime
    var currTime = videoPlayer.currentTime;
    var posRatio = currTime/videoDuration;
    var posOffset = trackWidth * posRatio;
    var scrubberPos = scrubberLeft + posOffset;

    var newPos = scrubberPos - (scrubHandle.offsetWidth /2);
    if (newPos < 0) newPos = scrubberPos;

    scrubHandle.style.left = newPos + "px";
    videoProgress.style.width = (scrubberPos - trackOffsetLeft) + "px";
};


BLT.VideoControls.togglePlayButton = function (playState) {
    if (playState === true) {
        show (playButton);
        hide (pauseButton);
    }
    else {
        hide (playButton);
        show (pauseButton);
    }
};


BLT.VideoControls.toggleMuteButton = function (muteState) {
    if (muteState === true) {
        show (soundOffButton);
        hide (soundOnButton);
    }
    else {
        hide (soundOffButton);
        show (soundOnButton);
    }
};


BLT.VideoControls.handleVideoComplete = function (event) {

    BLT.VideoControls.togglePlayButton (true);
};


BLT.VideoControls.killControls = function () {
    BLT.VideoControls.removeListeners();
    hide (videoControls);
};