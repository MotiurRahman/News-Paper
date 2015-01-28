exports.getInfo = function(activityIndicator, _CB) {
	if (Titanium.Network.networkType == Titanium.Network.NETWORK_NONE) {
		alert('please connect your device to the network');
		activityIndicator.hide();

	} else {

		var url = "http://bangla.bdnews24.com/?widgetName=rssfeed&widgetId=1151&getXmlFeed=true";
		var client = Ti.Network.createHTTPClient({
			// function called when the response data is available
			onload : function(e) {
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
				//alert("login success" + deviceToken);
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
				//alert('Subscribed for Push Notification!');
			} else {
				//alert('Error:' + ((e.error && e.message) || JSON.stringify(e)));
			}
		});
	}

};
