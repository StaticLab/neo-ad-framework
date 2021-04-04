
/** NEO TUNEIN CLASS
 **********************************************************/

NEO.Tunein = NEO.Tunein || {};

NEO.Tunein.dates = [];
NEO.Tunein.today = new Date();
NEO.Tunein.currentTunein = new Date();
NEO.Tunein.currentID = undefined;
NEO.Tunein.isProxy = false;


NEO.Tunein.addDate = function (year, month, day, id ) {
    if (!NEO.Tunein.dates) NEO.Tunein.dates = [];
    var date = new Date (year, month -1, day);
    date.id = id;
    NEO.Tunein.dates.push (date);
};


NEO.Tunein.parseDates = function (year, month, day ) {
    if (NEO.Tunein.errorCheck()) return;

    NEO.Tunein.isProxy = false;

    // if date value for comparison if passed (for testing)
    if (year && month && day) {
        // will use proxy date for testing
        NEO.Tunein.today = new Date (year, month -1, day);
        NEO.Tunein.isProxy = true;
    }

    NEO.Tunein.sortDec (NEO.Tunein.dates);
    NEO.Tunein.currentTunein = NEO.Tunein.today;
    NEO.Tunein.currentID = 'default';

    // determine correct Tunein
    for (var i in NEO.Tunein.dates) {
        if (NEO.Tunein.today >= NEO.Tunein.dates[i]) {
            NEO.Tunein.currentID = NEO.Tunein.dates[i].id;
            NEO.Tunein.currentTunein = NEO.Tunein.dates[i];
            break;
        }
    }

    dispatchEvent (NEO.Events.PARSE_DATES);

    // display the results
    NEO.Tunein.displayCurrentDate();
};


// sort date array ascending
NEO.Tunein.sortAsc = function (dateArray) {
    dateArray.sort (function (a, b) {
        a = new Date ( a.getTime() );
        b = new Date ( b.getTime() );
        return a < b ? -1 : a > b ? 1 : 0;
    });
};


// sort date array descending
NEO.Tunein.sortDec = function (dateArray) {
    dateArray.sort (function (a, b) {
        a = new Date ( a.getTime() );
        b = new Date ( b.getTime() );
        return a > b ? -1 : a < b ? 1 : 0;
    });
};


/** CONSOLE LOG FOR TESTING **/
// displays all dates in the console window (for testing)
NEO.Tunein.displayDates = function () {
    if (NEO.Tunein.errorCheck()) return;

    var revDates = NEO.Tunein.dates.slice(0); // clone
    NEO.Tunein.sortAsc (revDates);

    for (var x in revDates) {
        console.info ( revDates[x].id, '--> ', revDates[x].toLocaleDateString() );
    }

    // display the results
    NEO.Tunein.displayCurrentDate();
};


// displays current dates in console window (for testing)
NEO.Tunein.displayCurrentDate = function () {
    var outputString;
    NEO.Tunein.isProxy ? outputString = 'CURRENT TUNEIN (USING PROXY):' : outputString = 'CURRENT TUNEIN:';

    console.info (outputString, NEO.Tunein.currentID, '-->', NEO.Tunein.currentTunein.toLocaleDateString() );
};


// ERROR CHECKING
NEO.Tunein.errorCheck = function () {
    if (NEO.Tunein.dates.length === 0) {
        console.info ('<<< Tunein cannot be parsed. Use NEO.Tunein.addDate to add date values');
        return 1;
    }
    else return 0; // no error
};

