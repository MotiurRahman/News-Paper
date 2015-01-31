exports.getInfo = function(activityIndicator, url, _CB) {
	if (Titanium.Network.networkType == Titanium.Network.NETWORK_NONE) {
		alert('please connect your device to the network');
		activityIndicator.hide();

	} else {

		var client = Ti.Network.createHTTPClient({
			// function called when the response data is available
			onload : function(e) {
				//alert(url);
				// Data is returned from the blog, start parsing
				var xml = this.responseXML;
				var data = [];
				// blog posts are in nodes named "item"
				var items = xml.documentElement.getElementsByTagName("item");
				for (var i = 0; i < items.length; i++) {
					data.push({
						postTitle : items.item(i).getElementsByTagName("title").item(0).text,
						postLink : items.item(i).getElementsByTagName("link").item(0).text,
						postImage : items.item(i).getElementsByTagName("cropimage").item(0).text
					});
				}
				Ti.API.info("hello world" + data.length);
				_CB(data);

			},
			// function called when an error occurs, including a timeout
			onerror : function(e) {
				Ti.API.debug(e.error);
				alert('error');
				activityIndicator.hide();
			},
		});
		// Prepare the connection.
		client.open("GET", url);
		// Send the request.
		client.send();
	}
};

exports.androidPush = function() {
	var CloudPush = require('ti.cloudpush');
	CloudPush.debug = true;
	CloudPush.enabled = true;
	var deviceToken = null;
	var Cloud = require('ti.cloud');
	Cloud.debug = true;

	loginDefault();

	CloudPush.retrieveDeviceToken({
		success : deviceTokenSuccess,
		error : deviceTokenError
	});

	// Save the device token for subsequent API calls
	function deviceTokenSuccess(e) {
		deviceToken = e.deviceToken;
	}

	function deviceTokenError(e) {
		//alert('Failed to register for push notifications! ' + e.error);
	}

	// Process incoming push notifications
	CloudPush.addEventListener('callback', function(evt) {
		//	alert("Notification received: " + evt.payload);

		var adView = require('lib/adPage');
		data = new adView();
		data.open();

	});

	CloudPush.addEventListener('trayClickLaunchedApp', function(evt) {
		//alert('Tray Click Launched App (app was not running)');
		Ti.API.info('Tray Click Launched App (app was not running)');
	});

	CloudPush.addEventListener('trayClickFocusedApp', function(evt) {
		//alert('Tray Click Focused App (app was already running)');
		Ti.API.info('Tray Click Focused App (app was already running)');
	});

	function loginDefault(e) {
		// At first you need to create an user from the application dashboard
		// Then login that email and password
		Cloud.Users.login({
			login : 'motiur.mbstu@gmail.com',
			password : '1234'
		}, function(e) {
			if (e.success) {
				alert("login success");
				defaultSubscribe();
			} else {
				//alert('Error: ' + ((e.error && e.message) || JSON.stringify(e)));
			}
		});
	}

	function defaultSubscribe() {
		Cloud.PushNotifications.subscribe({
			channel : 'Android Test',
			device_token : deviceToken,
			type : 'gcm'
		}, function(e) {
			if (e.success) {
				Ti.App.Properties.setBool('data', true);
				alert('Subscribed for Push Notification!');
			} else {
				//alert('Error:' + ((e.error && e.message) || JSON.stringify(e)));
			}
		});
	}

};

exports.animation = function(self, value, _CB) {

	if (value == true) {
		self.animate({
			left : 200,
			right : -200,
			duration : 300,
			curve : Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
		});
		value = false;
		_CB(value);

	} else {
		self.animate({
			left : 0,
			right : 0,
			duration : 200,
			curve : Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
		});
		value = true;
		_CB(value);
	}

};

exports.newsPaper = function(self, url) {
	var section = null;
	var list = null;
	var itemData = null;
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

	var inTView = Ti.UI.createView({
		width : Ti.UI.FILL,
		height : 50,
		bottom : 20,
		zIndex : 5

	});
	inTView.add(activityIndicator);
	activityIndicator.show();
	// activityIndicator.show();

	UpdateNews();

	function UpdateNews() {
		var news = require('lib/network');
		news.getInfo(activityIndicator, url, function(e) {

			var myTemplate = {

				childTemplates : [{
					type : 'Ti.UI.ImageView', // Use an image view for the image
					bindId : 'pic', // Maps to a custom pic property of the item data
					properties : {// Sets the image view  properties
						width : '50',
						height : '50',
						defaultImage : '/appicon.png',
						left : 0
					}

				}, {// Subtitle
					type : 'Ti.UI.Label', // Use a label for the subtitle
					bindId : 'title', // Maps to a custom es_info property of the item data
					properties : {// Sets the label properties
						color : '#000',
						font : {
							fontFamily : 'Arial',
							fontSize : '16'
						},
						left : '60',
						//link : e[i].postLink,
					},
					events : {
						click : report
					}
				}]
			};

			//section.setItems(itemData);
			//list.setSections(section);

			itemData = [];

			for (var i = 0; i < e.length; i++) {
				//var paper =  ;

				itemData.push({
					pic : {
						image : e[i].postImage,
					},
					title : {
						text : e[i].postTitle,
					},
					detail : {
						link : e[i].postLink,
					}
				});
			}

			section = Ti.UI.createListSection({});
			section.setItems(itemData);

			list = Ti.UI.createListView({
				sections : [section],
				templates : {
					'template' : myTemplate
				},
				defaultItemTemplate : 'template',
				top : (Ti.Platform.osname == 'iphone') ? 0 : 50,
				zIndex : 3,
				backgroundColor : '#fff'

			});

			//call(list);
			self.add(list);

			function report(e) {
				var item = e.section.getItemAt(e.itemIndex);
				if (Titanium.Network.networkType == Titanium.Network.NETWORK_NONE) {
					alert('please connect your device to the network');

				} else {
					var detail = require('ui/common/detaiWin');
					var detailWin = new detail(item.title.text, item.detail.link);
					if (Ti.Platform.osname == 'iphone') {
						Titanium.Analytics.featureEvent('openDetailWindow');
						navWin.openWindow(detailWin);
					} else {
						Titanium.Analytics.featureEvent('openDetailWindow');
						detailWin.open();
					}
				}
			}


			activityIndicator.hide();
		});
	}


	self.add(inTView);

};

