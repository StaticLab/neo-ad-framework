
/** NEO HELPER METHODS
 **********************************************************/

/** LOAD EXTERNAL JAVASCRIPT **/
var loadScript = function (scriptURL, callback)  {
    var script = document.createElement("script");
    script.type = "text/javascript";

    if (script.readyState){  // IE, incl. IE9
        script.onreadystatechange = function(){
            if (script.readyState === "loaded" || script.readyState === "complete"){
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {  // others
        script.onload = callback;
    }

    script.src = scriptURL;
    document.body.appendChild (script);
};


/** ADD CLASS **/
var addClass = function ($el, className) {
    var attr = $el.getAttribute ('class') || '';  // default to empty string
    var classList = attr.split (' ');

    for (var i = 0; i < classList.length; i++) {
        if (classList[i] === className) return;
    }

    classList.push (className);
    $el.setAttribute ('class', classList.join(' '));
};


/** REMOVE CLASS **/
var removeClass = function (element, className) {
    var Element = (typeof element === 'string') ? _getElement(element) : element;
    var classNames = Element.className;

    // Clean up Class Names
    classNames = classNames.replace(className, '');
    classNames = classNames.replace(/\s{2,}/g, ' ').replace(/^ +/gm, '').replace(/\s+$/, '');

    // Update Class Names
    Element.className = classNames;
};


/** GET ELEMENT **/
var getEl = function ($id) {
    return document.getElementById ($id);
};


/** SHOW ELEMENT **/
var show = function ($element) {
    $element.style.display = 'block';
};


/** HIDE ELEMENT **/
var hide = function ($element) {
    $element.style.display = 'none';
};


/** DEVICE DETECTION **/
var getDevice = (function () {
    var ua     = navigator.userAgent.toLowerCase();
    var detect = (function (s) {
        if (typeof (s) === 'undefined') {
            s = ua;
        } else {
            ua = s.toLowerCase();
        }
        if (/(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(ua)) {
            return 'tablet';
        } else if (/(mobi|ipod|phone|blackberry|opera mini|fennec|minimo|symbian|psp|nintendo ds|archos|skyfire|puffin|blazer|bolt|gobrowser|iris|maemo|semc|teashark|uzard)/.test(ua)) {
            return 'phone';
        } else {
            return 'desktop';
        }
    });
    var device = detect();
    return {
        detect     : detect,
        device     : device,
        isMobile   : (device !== 'desktop'),
        isTablet   : (device === 'tablet'),
        isDestktop : (device === 'desktop'),
        userAgent  : ua
    };
}());
