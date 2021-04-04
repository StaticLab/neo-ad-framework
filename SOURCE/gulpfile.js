let version = '1.0';

/** DEPENDENCIES
 * **************************************************************/
const config    = require ('./config.json'),
    gulp        = require ('gulp'),
    colors      = require ('colors'),
    fs          = require ('fs-extra'),
    path        = require ('path'),
    sass        = require ('gulp-sass'),
    prompt      = require ('gulp-prompt'),
    sync        = require ('browser-sync'),
    uglify      = require ('gulp-uglify'),
    rename      = require ('gulp-rename'),
    changed     = require ('gulp-changed'),
    bourbon     = require ('node-bourbon'),
    folders     = require ('gulp-folders'),
    autoPre     = require ('gulp-autoprefixer'),
    include     = require ('gulp-file-include'),
    inject      = require ('gulp-inject-string'),
    concat      = require ('gulp-concat'),
    sourcemaps  = require ('gulp-sourcemaps');


// get an array of all folders in Ads directory
let childFolders = getFolders(config.dest.ads);

/***** DEFAULT *****/
function defaultTask (cb) {
    console.clear();
    console.log ( ('::::::  NEO AD BUILDER - version ' + version + '  ::::::') .magenta);
    console.log ('---------------------------------------------' .magenta);

    return gulp.src ('*')
        .pipe (prompt.prompt ({
                type: 'list',
                name: 'task',
                message: 'Select the task to run',
                choices: ['Start Watcher', 'Process Files', 'Create New Ad', 'Cancel']
            },
            function (res){
                if (res.task === 'Start Watcher')       watchFiles();
                if (res.task === 'Process Files')       gulp.parallel(processSASS, processJS)(cb);
                if (res.task === 'Create New Ad')       buildAd();
                if (res.task === 'Cancel')              console.log ('>>>' .yellow)
            }));
}
exports.default = defaultTask;


/***** BUILD AD *****/
function buildAd() {
    console.clear();
    console.log ( ('>>> building new ad ...') .green);

    gulp.src ('*')
        .pipe (prompt.prompt (
            [
                {
                    type: 'input',
                    name: 'name',
                    message: 'New Ad Folder Name:'
                },

                {
                    type: 'confirm',
                    name: 'video',
                    message: 'Does this ad contain video?'
                },

                {
                    type: 'list',
                    name: 'vendor',
                    message: 'Ad Vendor:',
                    choices: ['DoubleClick', 'Sizmek', 'SiteServed']
                }
            ],

            function (res){
                createNewAd (res.name, res.vendor, res.video);
            }));
}


/***** WATCH FILES *****/
function watchFiles() {
    // init BrowserSync
    sync.init ({
        server: {
            baseDir: config.dest.ads,
            directory: true,
            notify: false
        },

        open: "external",
        reloadDelay: 500
    });

    gulp.watch ([config.dest.html]).on ('change', sync.reload);
    gulp.watch ([config.dest.sass, config.dest.js],
        {interval: 1000, usePolling: true},
        gulp.parallel(processSASS, processJS)
    );
}


/***** PROCESS SASS *****/
function processSASS (cb) {
    let tasks = childFolders.map(function(folder) {
        let currPath = config.dest.ads + folder + '/';

        return gulp.src (currPath + 'source/scss/**/*.scss')
            .pipe ( changed (config.dest.sass) )
            .pipe ( sass ({ includePaths: bourbon.includePaths }) )
            .pipe (autoPre ({
                cascade: false
            }))
            .pipe (gulp.dest (currPath + 'deploy/css/') )
            .pipe (sync.stream());
    });

    cb();
}


/***** PROCESS JAVASCRIPT *****/
function processJS (cb) {
    let tasks = childFolders.map(function(folder) {
        let currPath = config.dest.ads + folder + '/';
        let scriptsPath = currPath + 'source/scripts/';

        return gulp.src ([scriptsPath + 'vendor/*.js', scriptsPath + '*.js'])
        .pipe ( changed (config.dest.js) )
        .pipe ( sourcemaps.init() )
        .pipe ( concat ('main.js' ) )
        .pipe ( uglify () )
        .pipe ( rename ({ extname: '.min.js'}) )
        .pipe ( sourcemaps.write ('../') )
        .pipe ( gulp.dest (currPath + 'deploy/scripts/') );
    });

    cb();
}


/***** CREATE NEW AD *****/
createNewAd = function (folderName, vendorID, hasVideo) {
    // create ad folder and all subfolders
    let newAdFolder = config.dest.ads + folderName;
    let buildFolders = [];
    buildFolders.push (newAdFolder + '/source/scripts');
    buildFolders.push (newAdFolder + '/source/scripts/vendor');
    buildFolders.push (newAdFolder + '/source/scss');
    buildFolders.push (newAdFolder + '/deploy/scripts');
    buildFolders.push (newAdFolder + '/deploy/css');
    buildFolders.push (newAdFolder + '/deploy/images');
    //if (hasVideo === true) buildFolders.push (newAdFolder + '/deploy/video');

    // add the folders
    buildFolders.forEach (function (item, index, array) {
        fs.mkdirs (item, function (err) {
            if (err) return console.error (err .red);
        })
    });

    // set vars for vendor file paths
    let htmlPath, vendorPath, baseJS, videoJS;
    switch (vendorID) {
        case 'DoubleClick':
            htmlPath = config.vendors.dc.html;
            vendorPath = config.vendors.dc.vendorPath;
            baseJS = config.vendors.dc.coreClass;
            if (hasVideo === true) videoJS = config.vendors.dc.videoClass;
            break;

        case 'Sizmek':
            htmlPath = config.vendors.sz.html;
            vendorPath = config.vendors.sz.vendorPath;
            baseJS = config.vendors.sz.coreClass;
            if (hasVideo === true) videoJS = config.vendors.sz.videoClass;
            break;

        case 'SiteServed':
            htmlPath = config.vendors.ss.html;
            vendorPath = config.vendors.ss.vendorPath;
            baseJS = config.vendors.ss.coreClass;
            if (hasVideo === true) videoJS = config.vendors.ss.videoClass;

            // copy local Greensock libraries
            fs.copy (config.source.neo + 'greensock/', newAdFolder + '/deploy/scripts/greensock/', function (){});
            break;
    }

    // copy vendor specific files
    fs.copy (htmlPath, newAdFolder + '/deploy/index.html', function (){});
    fs.copy (vendorPath + baseJS, newAdFolder + '/source/scripts/vendor/' + baseJS, function (){});
    if (hasVideo === true) {
        fs.copy (vendorPath + videoJS, newAdFolder + '/source/scripts/vendor/' + videoJS, function (){});
        fs.copy (config.source.neo + 'templates/video/', newAdFolder + '/deploy/video/', function (){});
        fs.copy (config.source.neo + 'templates/_video.scss', newAdFolder + '/source/scss/_video.scss', function (){});
    }

    // copy default files
    fs.copy (config.source.neo + 'templates/_styles.scss', newAdFolder + '/source/scss/styles.scss', function (){});
    fs.copy (config.source.neo + 'templates/_main.js', newAdFolder + '/source/scripts/main.js', function (){});

    // create single framework javascript file with included dependencies (using gulp-file-include)
    gulp.src (config.source.neo + 'core/neoCore.js')
        .pipe (include ({
            prefix: '//@',
            basepath: config.source.neo
        }))
        .pipe ( rename ('neoFramework.js') )
        .pipe ( gulp.dest (newAdFolder + '/source/scripts/') );

    // done
    console.clear();
    console.log (('>>> NEW AD CREATED: ' + folderName) .green);
};


/***** HELPER FUNCTIONS *****/
// clear console
console.clear = function () {
    return process.stdout.write ('\033c');
};

// get array of subfolders in given directory
function getFolders(dir){
    return fs.readdirSync(dir)
        .filter(function(file){
            return fs.statSync(path.join(dir, file)).isDirectory();
        });
}

