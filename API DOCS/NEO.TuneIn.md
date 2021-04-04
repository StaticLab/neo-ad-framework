## NEO.Tunein

---

### Adding Tune-Ins:

Dates can be added to the creative through the API. Adding dates this way helps to provide a simple mechanism to add multiple date ranges and determine what date should be displayed. It also provides a simple way to test the given date ranges without having to change your system’s date. Dates added are given an ID which can be used for comparison, or to display the correct video (see Adding Videos). You can add as many dates as needed. The syntax is as follows:

	NEO.Tunein.addDate (int year, int month (actual), int day, string ID);
	
The month is NOT zero-based, but instead uses the actual date for the month. This was done to help alleviate any mistakes caused by inadvertently entering a date and forgetting to subtract one from the month. The ID is a string, and can be any name you want, though you will most likely want to give it a name that is relative to the date given, such as “Starts Friday”. Once you’ve added all the dates, you will next need to parse these dates before they can be used. This is done by the using NEO.Tunein.parseDates(). This command will compare all the dates provided and determine the correct date range we are currently in. Here’s an example where we are adding 3 dates and parsing the values:

	NEO.Tunein.addDate (2016, 3, 11, ‘Coming Soon’);
	NEO.Tunein.addDate (2016, 4, 11, ’This Friday’);
	NEO.Tunein.addDate (2016, 4, 15, ‘Tonight’);
	NEO.Tunein.parseDates ();


Now that the dates have been added, we can now determine what the closest date added is based of the current date. In order to get the current ID of the date we are closest to, use NEO.Tunein.currentID. This can now be used for conditional comparisons, such as to display the correct Tune-In in the creative. Any value that is less than the first date will be considered to have an ID of “default”, so in the example above, running NEO.Tunein.currentID anytime before 3/11/2016 will result in “default” as the ID.

For testing purposes, a proxy date can be passed as a parameter in the parseDates method, such as NEO.Tunein.parseDates (2016, 4, 11). This will cause the API to use this proxy date for comparison and not the current date. This feature was added so the developer doesn’t need to change their system date in order to test a particular date.

---

###NEO.TuneIn API:

**NEO.Tunein.addDate (int year, int month (actual), int day, string ID);**

	adds a date and ID for comparison

**NEO.Tunein.parseDates();**

	initializes and parses all the dates added and determines the correct ID to use based of the current date
		
**NEO.Tunein.parseDates (year, month, day);**

	for testing purposes, a date can be added as a parameter (proxy date). This date will be used for comparison instead of the current date. A reminder will be output to the console log.

**NEO.Tunein.currentID();**

	returns the ID of the date closest to the current date. If a proxy date is added (for testing, see parseDates), the ID closest to the proxy date will be returned.

---

### TuneIn Helpers

Helpers are also provided as a means to check the Tunein values, and will simply output the results to the console window. This can be used in the browser to test values.

**NEO.Tunein.displayDates();**

	outputs all the dates that have been added using NEO.Tunein.addDate() to the console

**NEO.Tunein.displayCurrentDate();**

	outputs the current date ID to the console


