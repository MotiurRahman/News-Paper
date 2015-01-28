//FirstView Component Constructor
function newspaper(navWin) {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({
		//layout : 'vertical'
	});

	if (Ti.Platform.osname == 'android') {

		var mainView = Ti.UI.createView({
			width : Ti.UI.FILL,
			height : 50,
			backgroundColor : 'red',
			top : 0

		});
		self.add(mainView);

		// Create a Label.
		var title = Ti.UI.createLabel({
			text : 'BD News24.com',
			color : 'Green',
			font : {
				fontSize : 20
			},
			height : Ti.UI.SIZE,
			width : Ti.UI.SIZE,

		});

		// Add to the parent view.
		mainView.add(title);

	}

	if (Ti.Platform.name === 'iPhone OS') {
		var style = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
	} else {
		var style = Ti.UI.ActivityIndicatorStyle.DARK;

	}

	var activityIndicator = Ti.UI.createActivityIndicator({
		color : 'red',
		font : {
			fontFamily : 'Helvetica Neue',
			fontSize : 20,
		},
		message : 'Loading...',
		style : style,
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE
	});

	// Create a TableView.
	var newsTable = Ti.UI.createTableView({
		top : (Ti.Platform.osname == 'iphone') ? 0 : 50,
		zIndex : 3
	});

	var inTView = Ti.UI.createView({
		width : Ti.UI.FILL,
		height : 50,
		bottom : 20,
		zIndex : 5

	});
	inTView.add(activityIndicator);
	activityIndicator.show();
	var news = require('lib/network');

	news.getInfo(activityIndicator, function(e) {

		var newsData = [];

		Ti.API.info("News Length:" + e.length);

		for (var i = 0; i < e.length; i++) {

			var row = Titanium.UI.createTableViewRow({
				height : 60,
				link : e[i].postLink,
				titleData : e[i].postTitle,
			});

			// Create a Label.
			var newsTitle = Ti.UI.createLabel({
				text : e[i].postTitle,
				color : '#000',
				font : {
					fontSize : 20
				},
				left : 60,
			});

			// Add to the parent view.
			row.add(newsTitle);

			// Create an ImageView.
			var image = Ti.UI.createImageView({
				image : e[i].postImage,
				width : 50,
				height : 50,
				left : 5
			});

			// Add to the parent view.
			row.add(image);

			newsData.push(row);
			newsTable.setData(newsData);
		};
		activityIndicator.hide();
	});

	//Ti.API.info("motiur rahman:" + news.length);

	// Listen for click events.
	newsTable.addEventListener('click', function(e) {
		//alert('link: \'' + e.rowData.link);

		if (Titanium.Network.networkType == Titanium.Network.NETWORK_NONE) {
			alert('please connect your device to the network');

		} else {
			var detail = require('ui/common/detaiWin');
			var detailWin = new detail(e.rowData.titleData, e.rowData.link);
			if (Ti.Platform.osname == 'iphone') {
				Titanium.Analytics.featureEvent('openDetailWindow');
				navWin.openWindow(detailWin);
			} else {
				Titanium.Analytics.featureEvent('openDetailWindow');
				detailWin.open();
			}
		}

	});

	// Add to the parent view.
	self.add(newsTable);
	self.add(inTView);

	return self;
}

module.exports = newspaper;
