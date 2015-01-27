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
