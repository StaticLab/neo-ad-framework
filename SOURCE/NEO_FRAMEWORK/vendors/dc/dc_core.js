/** DOUBLECLICK CORE FUNCTIONS
 ********************************************************************************************/

var isExpanded = false;

/** PRE INIT **********************************************/
function initVendor () {
    // init DoubleClick
    if ( Enabler.isInitialized() ) vendorReady();
    else Enabler.addEventListener ( studio.events.StudioEvent.INIT, vendorReady );
}

/** INIT *************************************************/
function vendorReady () {
    console.info ('DOUBLECLICK API INITIALIZING');
    addListeners ();

    // polite load
    if ( Enabler.isPageLoaded() ) pageLoadedHandler();
    else Enabler.addEventListener (studio.events.StudioEvent.PAGE_LOADED, pageLoadedHandler);
}

/** PAGE LOADED *****************************************/
function pageLoadedHandler () {
    if ( Enabler.isVisible() ) adVisible();
    else Enabler.addEventListener (studio.events.StudioEvent.VISIBLE, adVisible);
}

/** AD VISIBLE *****************************************/
function adVisible () {
    // ad visible ... dispatch READY event
    dispatchEvent (BLT.Events.AD_READY);
}

/** LISTENERS *****************************************/
function addListeners () {
    // AD events
    addEventListener ('collapseStart', onCollapseStart);
    addEventListener ('collapseFinish', onCollapseFinish);
    addEventListener ('expandStart', onExpandStart);
    addEventListener ('expandFinish', onExpandFinish);

    // DoubleClick events
    Enabler.addEventListener (studio.events.StudioEvent.EXIT, onExitHandler);
}


/***********************************************************************************************
 * COLLAPSE METHODS
 **********************************************************************************************/
function onCollapseStart (event) {
    // console.info ('DC_CORE: onCollapseStart');

    Enabler.requestCollapse ();
    dispatchEvent (BLT.Events.COLLAPSE_START);
}

function onCollapseFinish (event) {
    // console.info ('DC_CORE: onCollapseFinish');

    isExpanded = false;
    Enabler.finishCollapse ();
    Enabler.stopTimer ('Panel Expansion');
    Enabler.reportManualClose ();
}


/***********************************************************************************************
 * EXPAND METHODS
 **********************************************************************************************/
function onExpandStart (event) {
    // console.info ('DC_CORE: onExpandStart');

    Enabler.requestExpand ();
    Enabler.startTimer ('Panel Expansion');

    dispatchEvent (BLT.Events.EXPAND_START);
}

function onExpandFinish (event) {
    // console.info ('DC_CORE: onExpandFinish');

    isExpanded = true;
    Enabler.finishExpand();

    dispatchEvent (BLT.Events.EXPAND_FINISH);
}


/***********************************************************************************************
 * CLOSE METHOD
 **********************************************************************************************/
function onCloseAd (event) {
    // console.info ('DC_CORE: onCloseAd');

    isExpanded = false;
    Enabler.close();
    Enabler.reportManualClose ();
}


/***********************************************************************************************
 * EXIT CLEANUP
 **********************************************************************************************/
function onExitHandler (event) {
    dispatchEvent (BLT.Events.KILL_VIDEO);
    if (isExpanded) dispatchEvent (BLT.Events.COLLAPSE_AD);
}
