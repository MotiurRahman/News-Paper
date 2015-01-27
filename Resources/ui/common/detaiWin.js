function detail(title, link) {

	var window = Titanium.UI.createWindow({
		title : title
	});

	if (Ti.Platform.osname == 'android') {

		var mainView = Ti.UI.createView({
			width : Ti.UI.FILL,
			height : 50,
			backgroundColor : 'red',
			top : 0

		});
		window.add(mainView);

		// Create a Label.
		var title = Ti.UI.createLabel({
			text : title,
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
		bottom : 20,
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE
	});

	var webview = Titanium.UI.createWebView({
		url : link,
		top : (Ti.Platform.osname == 'iphone') ? 0 : 50,
		zIndex : 3
	});

	var inTView = Ti.UI.createView({
		width : Ti.UI.FILL,
		height : 50,
		bottom : 20,
		zIndex : 5

	});

	window.add(webview);
	window.add(inTView);
	inTView.add(activityIndicator);
	activityIndicator.show();

	webview.addEventListener('load', function() {
		activityIndicator.hide();
	});

	return window;

}

module.exports = detail;
