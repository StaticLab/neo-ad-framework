## NEO.Video

---

### Adding Videos:

The video API provides a way to easily add videos to a project and efficiently control their loading and playback. In the html, a common video tag is made and given an ID. The video is initialized by passing this ID to the API, so it knows what element to control. If the creative is using a Tune-In, the videos can be given an ID that is also used in a Tune-In date, linking the video to that particular date. If the creative isn’t using the NEO.Tunein class, videos can still be controlled by using their ID. The syntax for adding videos is as follows:

	NEO.Video.init (string elementID);
	NEO.Video.addVideo (string videoPath, string videoID, string trackingName);

	videoPath: the path to the video without the file suffix. (“videos/video1” … NOT “videos/video1.mp4”)

	videoID: if using the Tunein class, this ID will match the ID for the date that will use these videos; links an array of videos to a date.

	trackingID: the name that gets used when tracking video events with third party vendors, such as DoubleClick.


Videos added are stored in arrays which are sorted by their videoID. When used with the Tunein class, the video class will know what array of videos to use based off the current date ID. Because of this, be sure to match the Tunein IDs to the video IDs that you want linked. For example, if a Tunein was this:

	NEO.Tunein.addDate (2016, 3, 11, ‘Coming Soon’);

then these are the videos it will use when the date matches 3/11:

		NEO.Video.init (“videoPlayer”);
		NEO.Video.addVideo (“videos/video1”, “default”, “video 1”);
		NEO.Video.addVideo (“videos/video2”, “default”, “video 2”);

		NEO.Video.addVideo (“videos/video3”, “Coming Soon”, “video 3”);
		NEO.Video.addVideo (“videos/video4”, “Coming Soon”, “video 4”);

In this example, the video array for the “Coming Soon” ID would hold the videos “video3” and “video4”. Note that we do not add the file suffix to the video path. The video class will automatically attach the common file suffixes at run time. Also, as this example illustrates, if the date were before 3/11/2016, then the video array would use “default”. See the documentation at [NEO.Tunein](https://github.com/NEODigital/banners-framework/wiki/NEO.TuneIn-API) for more info.

In order to play a particular video, we simply load the video by specifying what video in the array to play, as well as pass a few parameters to control playback. Once the video is loaded we use common commands such as play, pause, etc. The syntax to load a video is:

	NEO.Video.loadVideo (int videoNumber, string controlType, boolean muted);
	NEO.Video.playVideo();

so to load the 2nd video, with controls and not muted, the syntax would be:

	NEO.Video.loadVideo (1, ‘default’, false);

Alternatively you could load a video with automatic playback by using NEO.Video.loadPlayVideo (see API below).

---

### NEO.Video API:

**NEO.Video.init (string elementID);**

	initializes the video player with the html video elements that will contain the videos

**NEO.Video.addVideo (string videoPath, string videoID, string trackingName);**

	adds a video to the array of videos. Videos are added to the arrays sequentially, based off the videoID. There will be a unique array created for each videoID. 

**NEO.Video.loadVideo (int videoNumber, string controlType, boolean muted);**

	loads a video; control type can be ‘none’, ‘default’, or ‘custom’. Using 'custom' will use

**NEO.Video.loadPlayVideo (int videoNumber, string controlType, boolean muted);**

	loads a video, but begins playback automatically once there is enough data to start; control type can be ‘none’, ‘default’, or ‘custom’

**NEO.Video.playVideo();**

	plays the currently loaded video

**NEO.Video.pauseVideo();**

	pauses the currently loaded video

**NEO.Video.killVideo();**

	removes and video elements from the html container. This ensures the videos are disposed of properly.

---

### Video Controls

When the *loadVideo* or *loadPlayVideo* function is called, and the control type is set to 'custom', the controls will be using custom SVGs (as defined in the html). These SVGs are added inline to the html, and if a custom skin is necessary, the raw SVG images are located in the **_ASSETS** folder for editing.

