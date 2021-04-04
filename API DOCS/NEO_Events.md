## NEO.Events

The Ad Framework relies on events to communicate among the various components and classes. A polyfill has been added so events will work with Internet Explorer. The events are listed as follows (variable & string representative):

#### AD EVENTS
```javascript
AD_READY: 'adReady'
EXPAND_START: 'expandStart'
EXPAND_FINISH: 'expandFinish'
COLLAPSE_START: 'collapseStart'
COLLAPSE_FINISH: 'collapseFinish'
CLOSE_AD: 'closeAd'
REPLAY_AD: 'replayAd'
PARSE_DATES: 'parseDates'
```

#### VIDEO STATUS EVENTS
```javascript
VIDEO_LOADED: 'videoLoaded'
VIDEO_LOAD_PROGRESS: 'videoLoadProgress'
VIDEO_READY: 'videoReady'
VIDEO_COMPLETE: 'videoComplete'
VIDEO_STARTED: 'videoStarted'
VIDEO_PLAYING: 'videoPlaying'
VIDEO_PAUSED: 'videoPaused'
VIDEO_RESUMED: 'videoResumed'
VIDEO_REPLAYING: 'videoReplaying'
VIDEO_MUTED: 'videoMuted'
VIDEO_UNMUTED: 'videoUnmuted'
VIDEO_ERROR: 'videoError'
VIDEO_ON_CUEPOINT: 'videoCuepoint'
```

#### VIDEO BUFFER EVENTS
```javascript
VIDEO_BUFFER_EMPTY: 'videoBufferEmpty'
VIDEO_BUFFER_FULL: 'videoBufferFull'
VIDEO_SHOW_BUFFER: 'videoShowBuffer'
VIDEO_HIDE_BUFFER: 'videoHideBuffer'
```

#### VIDEO PROGRESS EVENTS
```javascript
VIDEO_PROGRESS: 'videoProgress'
VIDEO_0_PERCENT: 'video 0% complete'
VIDEO_25_PERCENT: 'video 25% complete'
VIDEO_50_PERCENT: 'video 50% complete'
VIDEO_75_PERCENT: 'video 75% complete'
VIDEO_100_PERCENT: 'video 100% complete'
```

#### VIDEO CONTROL EVENTS
```javascript
MUTE_VIDEO: 'muteVideo'
UNMUTE_VIDEO: 'unmuteVideo'
PLAY_VIDEO: 'playVideo'
PAUSE_VIDEO: 'pauseVideo'
SEEK_VIDEO: 'seekVideo'
KILL_VIDEO: 'killVideo'
HIDE_CONTROLS: 'hideControls'
SHOW_CONTROLS: 'showControls'
```

#### VIDEO FULLSCREEN EVENTS
```javascript
VIDEO_FULLSCREEN_OPENED: 'fullScreenOpened'
VIDEO_FULLSCREEN_CLOSED: 'fullScreenClosed'
SHOW_FULLSCREEN: 'showFullscreen'
EXIT_FULLSCREEN: 'exitFullscreen'
```