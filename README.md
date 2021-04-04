### NEO AD FRAMEWORK
---

#### Starting a New Project

The Ad Framework relies on Gulp tasks to handle adding the necessary components of an ad, as well as the compiling 
and processing of the final build files. When starting a new project, it is necessary to copy the **NEO_FRAMEWORK** 
folder to the new projects directory, as well as the following files:

* config.json
* gulpfile.js
* package.json

As the node_modules are not included in the git repo, it is necessary to install the dependencies prior to starting the gulp tasks. Install the dependencies to the root directory of your project using `npm install`.

---

#### The Build Menu

Type `gulp` from the command line and choose one of the following options:

1. Start Watcher
2. Process Files
3. Create New Ad
4. Cancel
		
	
**Start Watcher**
	
Opens a local browser window for testing. Any edits made to the index.html, SASS, or Javascript will be processed and compiled automatically,  and the browser will be updated with the changes.
	
**Process Files**

Processes and compiles all SASS and Javascript for all ads. SASS files fill be compiled to CSS, while all Javascript will be concatenated and minified. The final files will be saved to the **../deploy/** folder within their respective subfolders (css, scripts). Also, a source map will be created, so any error seen in the console log of the browser will report the correct line number where the error occured. When delivering the final files to a site, please do not include the **main.min.js.map** file.

**Create New Ad**

Creates a new ad within the **Ads** folder. If the Ads folder doesn't exist, one will be created. You will be asked to name the new ad folder, if the ad will use video, and what vendor (DoubleClick, Sizmek, etc) will be used.

Once a new ad is created, all the subfolders will be made and the starting files will be added. The task will 
concatenate the necessary framework files, and this will be saved within the **../source/scripts/** folder as 
**NeoFramework.js**. The vendor specific scripts will be saved within **../source/scripts/vendors/**.

**Cancel**

Quits the build menu.

---

#### Framework API

The framework consists of many classes to help in building online ad units, and includes methods to handle multiple video instances, date checking, device detection, as well as many helper functions. For full documantation of the API, please visit:  

[NEO Framework Documentation](https://github.com/StaticLab/neo-ad-framework/wiki)