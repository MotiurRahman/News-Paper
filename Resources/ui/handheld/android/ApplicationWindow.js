//Application Window Component Constructor
function ApplicationWindow(url) {
	//load component dependencies
	var FirstView = require('ui/common/newspaper');

	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor : '#ffffff',
		exitOnClose : true
	});
	
	//construct UI
	var firstView = new FirstView(self, url);
	self.add(firstView);

	self.addEventListener('androidback', function() {
		var dialog = Ti.UI.createAlertDialog({
			title : 'Do you want to Close the App?',
			buttonNames : ['Yes', 'No']
		});
		dialog.addEventListener('click', function(e) {
			if (e.index == 0) {
				self.close();
			}
		});
		dialog.show();
	});

	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
