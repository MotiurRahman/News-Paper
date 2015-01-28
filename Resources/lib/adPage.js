function adView(push) {
	var self = Ti.UI.createWindow({
		backgroundColor : '#000',
		exitOnClose : true
	});

	// Create a Label.
	var aLabel = Ti.UI.createLabel({
		text : "push",
		color : 'red',
		font : {
			fontSize : 20
		},
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE,

	});

	// Add to the parent view.
	self.add(aLabel);

	// Create a Button.
	var Close = Ti.UI.createButton({
		title : 'Close',
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE, 
		bottom : '40'

	});

	// Listen for click events.
	Close.addEventListener('click', function() {
		Titanium.Analytics.featureEvent('closeAddWindow');
		if (Ti.Platform.osname == 'android') {
			var Window = require('ui/handheld/android/ApplicationWindow');
			win = new Window();
			win.open();

		}
		self.close();
	});

	// Add to the parent view.
	self.add(Close);

	return self;
}

module.exports = adView;
