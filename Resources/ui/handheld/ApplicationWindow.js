//Application Window Component Constructor
function ApplicationWindow(url) {
	//load component dependencies

	var FirstView = require('ui/common/newspaper');
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor : '#ffffff',
		title : 'BD News24.com'
	});

	//construct UI

	var navWin = Titanium.UI.iOS.createNavigationWindow({
		window : self
	});

	var leftBtn = Ti.UI.createButton({
		systemButton : Titanium.UI.iPhone.SystemButton.INFO_LIGHT
	});
	leftBtn.addEventListener("click", function() {
		navWindow.toggleLeftView();
		navWindow.setCenterhiddenInteractivity("TouchEnabled");

	});
	self.leftNavButton = leftBtn;

	var rightbtn = Ti.UI.createButton({
		systemButton : Titanium.UI.iPhone.SystemButton.REFRESH
	});
	rightbtn.addEventListener("click", function() {

	});
	self.rightNavButton = rightbtn;
	
	
	
	var winLeft = Ti.UI.createWindow({
		backgroundColor:"#fff"
	});
	

	var leftTableView = Ti.UI.createTableView({
		font : {
			fontSize : 12
		},
		rowHeight : 40,
		top:20,
		data : [{
			title : 'About'
		}, {
			title : 'Information'
		}]
	});
	winLeft.add(leftTableView);
	leftTableView.addEventListener("click", function(e) {
		switch(e.index) {
		case 0:
		case 1:
			alert("You clicked " + e.rowData.title + ". Implement menu structure.. ");
			navWindow.toggleLeftView();
			//	navWindow.setCenterhiddenInteractivity("TouchEnabled");

			break;
		case 2:
			alert("You clicked " + e.rowData.title + ". Implement menu structure.. ");
			navWindow.toggleLeftView();
			//	navWindow.setCenterhiddenInteractivity("TouchEnabled");

			break;
		}
	});

	var NappSlideMenu = require('dk.napp.slidemenu');

	var navWindow = NappSlideMenu.createSlideMenuWindow({
		centerWindow : navWin,
		leftWindow : winLeft,
		leftLedge : 200
	});

	var firstView = new FirstView(navWin, url);
	self.add(firstView);

	return navWindow;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
