
/** NEO EVENTS
 **********************************************************/

// polyfill fix for IE (adds custom events to IE)
(function () {
    function CustomEvent ( event, params ) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent ( 'CustomEvent' );
        evt.initCustomEvent ( event, params.bubbles, params.cancelable, params.detail );
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent;
})();

NEO.Events = {

    /** AD EVENTS
     *************************************************************/
    AD_READY:                   new CustomEvent ('adReady'),

    CLOSE_AD:                   new CustomEvent ('closeAd'),
    COLLAPSE_AD:                new CustomEvent ('collapseAd'),
    COLLAPSE_START:             new CustomEvent ('collapseStart'),
    COLLAPSE_FINISH:            new CustomEvent ('collapseFinish'),

    EXPAND_AD:                  new CustomEvent ('expandAd'),
    EXPAND_START:               new CustomEvent ('expandStart'),
    EXPAND_FINISH:              new CustomEvent ('expandFinish'),

    REPLAY_AD:                  new CustomEvent ('replayAd'),
    PARSE_DATES:                new CustomEvent ('parseDates'),


    /** VIDEO EVENTS
     *************************************************************/
    // status events
    VIDEO_LOADED:               new CustomEvent ('videoLoaded'),
    VIDEO_LOAD_PROGRESS:        new CustomEvent ('videoLoadProgress'),
    VIDEO_READY:                new CustomEvent ('videoReady'),
    VIDEO_COMPLETE:             new CustomEvent ('videoComplete'),
    VIDEO_STARTED:              new CustomEvent ('videoStarted'),
    VIDEO_PLAYING:              new CustomEvent ('videoPlaying'),
    VIDEO_PAUSED:               new CustomEvent ('videoPaused'),
    VIDEO_RESUMED:              new CustomEvent ('videoResumed'),
    VIDEO_REPLAYING:            new CustomEvent ('videoReplaying'),
    VIDEO_MUTED:                new CustomEvent ('videoMuted'),
    VIDEO_UNMUTED:              new CustomEvent ('videoUnmuted'),
    VIDEO_ERROR:                new CustomEvent ('videoError'),
    VIDEO_ON_CUEPOINT:          new CustomEvent ('videoCuepoint'),

    // buffer events
    VIDEO_BUFFER_EMPTY:         new CustomEvent ('videoBufferEmpty'),
    VIDEO_BUFFER_FULL:          new CustomEvent ('videoBufferFull'),
    VIDEO_SHOW_BUFFER:          new CustomEvent ('videoShowBuffer'),
    VIDEO_HIDE_BUFFER:          new CustomEvent ('videoHideBuffer'),

    // progress events
    VIDEO_PROGRESS:             new CustomEvent ('videoProgress'),
    VIDEO_0_PERCENT:            new CustomEvent ('video 0% complete'),
    VIDEO_25_PERCENT:           new CustomEvent ('video 25% complete'),
    VIDEO_50_PERCENT:           new CustomEvent ('video 50% complete'),
    VIDEO_75_PERCENT:           new CustomEvent ('video 75% complete'),
    VIDEO_100_PERCENT:          new CustomEvent ('video 100% complete'),

    // controls
    MUTE_VIDEO:                 new CustomEvent ('muteVideo'),
    UNMUTE_VIDEO:               new CustomEvent ('unmuteVideo'),
    PLAY_VIDEO:                 new CustomEvent ('playVideo'),
    PAUSE_VIDEO:                new CustomEvent ('pauseVideo'),
    REPLAY_VIDEO:               new CustomEvent ('replayVideo'),
    SEEK_VIDEO:                 new CustomEvent ('seekVideo'),
    KILL_VIDEO:                 new CustomEvent ('killVideo'),
    HIDE_CONTROLS:              new CustomEvent ('hideControls'),
    SHOW_CONTROLS:              new CustomEvent ('showControls'),

    // fullscreen events
    VIDEO_FULLSCREEN_OPENED:    new CustomEvent ('fullScreenOpened'),
    VIDEO_FULLSCREEN_CLOSED:    new CustomEvent ('fullScreenClosed'),
    SHOW_FULLSCREEN:            new CustomEvent ('showFullscreen'),
    EXIT_FULLSCREEN:            new CustomEvent ('exitFullscreen')
};
