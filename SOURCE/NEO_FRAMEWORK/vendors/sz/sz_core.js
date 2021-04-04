/** SIZMEK CORE FUNCTIONS
 ********************************************************************************************/

var isExpanded = false;

/** PRE INIT **********************************************/
function initVendor () {
    // init Sizmek
    if ( EB.isInitialized() ) vendorReady();
    else EB.addEventListener (EBG.EventName.EB_INITIALIZED, vendorReady);
}

/** INIT *************************************************/
function vendorReady () {
    console.info ('SIZMEK API INITIALIZING');
    addListeners ();
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

    // SIZMEK EVENTS

}

/***********************************************************************************************
 * COLLAPSE METHODS
 **********************************************************************************************/
function onCollapseStart (event) {
    // console.info ('SIZMEK_CORE: onCollapseStart');

    EB.collapse();
    dispatchEvent (BLT.Events.COLLAPSE_START);
}

function onCollapseFinish (event) {
    isExpanded = false;
    EB.stopTimer ('Panel Expansion');
}


/***********************************************************************************************
 * EXPAND METHODS
 **********************************************************************************************/
function onExpandStart (event) {
    // console.info ('SIZMEK_CORE: onExpandStart');

    EB.expand();
    EB.startTimer ('Panel Expansion');
    dispatchEvent (BLT.Events.EXPAND_START);
}

function onExpandFinish (event) {
    isExpanded = true;
}


/***********************************************************************************************
 * CLOSE METHOD
 **********************************************************************************************/
function onCloseAd (event) {
    isExpanded = false;
    EB.close();
    EB.stopTimer ('Panel Expansion');
}


/***********************************************************************************************
 * EXIT CLEANUP
 **********************************************************************************************/
// function onExitCleanup (event) {
//     dispatchEvent (BLT.Events.KILL_VIDEO);
//     if (isExpanded) dispatchEvent (BLT.Events.COLLAPSE_AD);
// }
