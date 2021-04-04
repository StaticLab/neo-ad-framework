/** SITE-SERVED CORE FUNCTIONS
 ********************************************************************************************/

var isExpanded = false;

/** PRE INIT **********************************************/
function initVendor () {
    vendorReady();
}

/** INIT *************************************************/
function vendorReady () {
    console.info ('SITE-SERVED API INITIALIZING');

    addListeners ();
    adVisible ();
}

/** AD VISIBLE *****************************************/
function adVisible () {
    // Ad visible ... dispatch event to app
    dispatchEvent (BLT.Events.AD_READY);
}

/** LISTENERS *****************************************/
function addListeners () {
    // AD events
    addEventListener ('collapseStart', onCollapseStart);
    addEventListener ('collapseFinish', onCollapseFinish);
    addEventListener ('expandStart', onExpandStart);
    addEventListener ('expandFinish', onExpandFinish);
    addEventListener ('closeAd', onCloseAd);
}


/***********************************************************************************************
 * COLLAPSE METHODS
 **********************************************************************************************/
function onCollapseStart (event) {
    // console.info ('SS_CORE: onCollapseStart');
    dispatchEvent (BLT.Events.COLLAPSE_START);
}

function onCollapseFinish (event) {
    isExpanded = false;
}


/***********************************************************************************************
 * EXPAND METHODS
 **********************************************************************************************/
function onExpandStart (event) {
    // console.info ('SS_CORE: onExpandStart');
    dispatchEvent (BLT.Events.EXPAND_START);
}

function onExpandFinish (event) {
    isExpanded = true;
}


/***********************************************************************************************
 * CLOSE METHOD
 **********************************************************************************************/
function onCloseAd (event) {
    // console.info ('SS_CORE: onCloseAd');
    isExpanded = false;
    onCollapseStart (null);
}

