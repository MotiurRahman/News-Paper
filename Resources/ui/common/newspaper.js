//FirstView Component Constructor
function newspaper(navWin) {
	//create object instance, a parasitic subclass of Observable

	var self = Ti.UI.createView({
		//layout : 'vertical'
		borderColor : 'gray',
		borderWidth : 2,
		backgroundColor : '#fff',
		zIndex : 4

	});
	var menuView = require('ui/common/menuData');
	menuData = new menuView(self);

	var section = null;
	var list = null;
	var itemData = null;

	if (Ti.Platform.osname == 'android') {

		var mainView = Ti.UI.createView({
			width : Ti.UI.FILL,
			height : 50,
			backgroundColor : 'gray',
			top : 0,

		});
		self.add(mainView);

		// Create a Label.
		var title = Ti.UI.createLabel({
			text : 'BD News24.com',
			color : '#000',
			font : {
				fontSize : 20
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
			animationView.animation(self);
		});

		// Add to the parent view.
		mainView.add(menu);

		// Create an ImageView.
		var refresh = Ti.UI.createImageView({
			image : '/menu.png',
			width : 40,
			height : 40,
			right : 10
		});
		refresh.addEventListener('click', function() {
			activityIndicator.show();
			itemData = [];
			section.setItems(itemData);
			list.setSections(section);
			UpdateNews();

		});

		mainView.add(refresh);

		navWin.add(menuData);

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

	var inTView = Ti.UI.createView({
		width : Ti.UI.FILL,
		height : 50,
		bottom : 20,
		zIndex : 5

	});
	inTView.add(activityIndicator);
	activityIndicator.show();

	UpdateNews();

	function UpdateNews() {
		var news = require('lib/network');
		news.getInfo(activityIndicator, function(e) {

			var myTemplate = {

				childTemplates : [{
					type : 'Ti.UI.ImageView', // Use an image view for the image
					bindId : 'pic', // Maps to a custom pic property of the item data
					properties : {// Sets the image view  properties
						width : '50dp',
						height : '50dp',
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
							fontSize : '20dp'
						},
						left : '60dp',
						//link : e[i].postLink,
					},
					events : {
						click : report
					}
				}]
			};

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

	return self;
}

module.exports = newspaper;
