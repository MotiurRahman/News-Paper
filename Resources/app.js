/*
* Single Window Application Template:
* A basic starting point for your application.  Mostly a blank canvas.
*
* In app.js, we generally take care of a few things:
* - Bootstrap the application with any data we need
* - Check for dependencies like device type, platform version or network connection
* - Require and open our top-level UI component
*
*/

//bootstrap and check dependencies
if (Ti.version < 1.8) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
}


// This is a single context application with multiple windows in a stack
(function() {
	var value = true;
	//render appropriate components based on the platform and form factor
	var osname = Ti.Platform.osname,
	    version = Ti.Platform.version,
	    height = Ti.Platform.displayCaps.platformHeight,
	    width = Ti.Platform.displayCaps.platformWidth;

	var Window;
	if (osname === 'ipad') {
		Window = require('ui/tablet/ApplicationWindow');
	} else if (osname === 'iphone') {
		Window = require('ui/handheld/ApplicationWindow');

	} else {
		var data = Ti.App.Properties.getBool('data');
		if (data != true) {
			var pushTest = require('lib/network');
			pushTest.androidPush();
		}

		Window = require('ui/handheld/android/ApplicationWindow');
	}

	//var launch = require('ti.enroll');

	var win = new Window();

	win.open();

	win.addEventListener('open', function() {
		Titanium.Analytics.featureEvent('open.Main.Window');
	});

})();
