//FirstView Component Constructor
function newspaper(navWin, url) {
	//create object instance, a parasitic subclass of Observable

	var self = Ti.UI.createView({
		//layout : 'vertical'
		borderColor : 'gray',
		borderWidth : 2,
		backgroundColor : '#fff',
		zIndex : 4

	});

	if (Ti.Platform.osname == 'android') {
		var value = true;
		var menuView = require('ui/common/menuData');
		menuData = new menuView(self, function(e) {
			value = e;
		});

		var mainView = Ti.UI.createView({
			width : Ti.UI.FILL,
			height : 50,
			backgroundColor : '#A9A9A9',
			top : 0,

		});
		self.add(mainView);

		// Create a Label.
		var title = Ti.UI.createLabel({
			text : 'BD News24.com',
			color : '#000',
			font : {
				fontSize : 20,
				
			},
			height : Ti.UI.SIZE,
			width : Ti.UI.SIZE,

		});

		// Add to the parent view.
		mainView.add(title);

		// Create an ImageView.
		var menu = Ti.UI.createImageView({
			image : '/menu.png',
			width : 40,
			height : 40,
			left : 10
		});

		menu.addEventListener('click', function() {
			//alert(motiur);
			var animationView = require('lib/network');
			animationView.animation(self, value, function(e) {
				value = e;
			});
		});

		// Add to the parent view.
		mainView.add(menu);

		// Create an ImageView.
		var refresh = Ti.UI.createImageView({
			image : '/refresh.png',
			width : 40,
			height : 40,
			right : 10
		});
		refresh.addEventListener('click', function() {
			var Window = require('ui/handheld/android/ApplicationWindow');
			refreshWin = new Window(url);
			refreshWin.open();

		});

		mainView.add(refresh);

		navWin.add(menuData);

	}

	var news = require('lib/network');
	news.newsPaper(self, url);

	return self;
}

module.exports = newspaper;
