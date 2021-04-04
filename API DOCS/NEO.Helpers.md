## Helper Functions

---

### loadScript (scriptURL:String, callback:Function);

	loads an external script and calls the callback function once loaded


### addClass = (element:String, className:String);

	adds a class to an dom element. Do not use the . when specifying the class name.


### removeClass = (element:String, className:String);

	removes a class to an dom element. Do not use the . when specifying the class name.


### getEl (element:String);

	returns the object (by id or class) of the specified dom element. Will determine if string passed is an ID or Class. This is a shortcut to document.getElementById(element) or document.getElementByClass (element);


### show (element:String);

	sets the selected element to display.style.block


### hide (element:String);

	sets the selected element to display.style.none


### getDevice ();

	returns an object containing properties of the device. Properties include the following:
	
	- isMobile (true, false)
	- isTablet (true, false)
	- userAgent (iPad, Android, Kindle, Windows, etc)
	
	EXAMPLES:
	
	if (getDevice.isTablet) {
		// device is tablet
	} else {
		// not a tablet
	}
	
