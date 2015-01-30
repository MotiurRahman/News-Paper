function menuView(self) {
	var mainView = Ti.UI.createView({
		width : 200,
		height : Ti.UI.FILL,
		layout : 'vertical',
		left : 0,
		zIndex : 1,
		backgroundColor : 'red'
	});

	// Create a Button.
	var bangla = Ti.UI.createButton({
		title : 'Bangla News',
		height : 50,
		width : Ti.UI.SIZE,
		top : 30,

	});

	// Listen for click events.
	bangla.addEventListener('click', function() {
		self.animate({
			left : 0,
			right : 0,
			duration : 200,
			curve : Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
		});
		value = true;

	});

	// Add to the parent view.
	mainView.add(bangla);
	var english = Ti.UI.createButton({
		title : 'English News',
		height : 50,
		width : Ti.UI.SIZE,
		top : 30,
	});

	// Listen for click events.
	english.addEventListener('click', function() {
		self.animate({
			left : 0,
			right : 0,
			duration : 200,
			curve : Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
		});
		value = true;

	});

	// Add to the parent view.
	mainView.add(english);
	var about = Ti.UI.createButton({
		title : 'About',
		height : 50,
		width : 130,
		top : 30,
	});

	// Listen for click events.
	about.addEventListener('click', function() {
		self.animate({
			left : 0,
			right : 0,
			duration : 200,
			curve : Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
		});

		value = true;

	});

	// Add to the parent view.
	mainView.add(about);

	return mainView;

}

module.exports = menuView;
