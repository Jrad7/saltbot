var UI = function() {

	if ( arguments.callee._singletonInstance )
		return arguments.callee._singletonInstance;
	arguments.callee._singletonInstance = this;

	this.$window = $('<div id="popup"></div>')
			   .html('<iframe id="frame" style="border: 0px; overflow: hidden; " src="" width="100%" height="100%"></iframe>')
               .dialog({
                   autoOpen: false,
                   modal: false,
                   height: 400,
                   width: 400,
                   title: "Salt Bot UI"
               });
	var $head = $("#frame").contents().find("head");
	var $link = chrome.extension.getURL('lib/jquery-ui.css');
	$head.append($("<link/>",
    { rel: "stylesheet", href: $link, type: "text/css" }));
	$link = chrome.extension.getURL('lib/jquery-ui.theme.css');
	$head.append($("<link/>",
    { rel: "stylesheet", href: $link, type: "text/css" }));

	this.$window.dialog('open');

	this.Tabs = document.createElement('div');
	this.Tabs.id = 'tabs';
	this.Tabs.innerHTML = "<ul><li><a href=\"#matchTab\">Current Match</a></li><li><a href=\"#statsTab\">Stats</a></li></ul>";

	this.matchTab = this.createAndAppendDiv('matchTab', this.Tabs);
	this.statsTab = this.createAndAppendDiv('statsTab', this.Tabs);

	this.modeDiv = this.createAndAppendDiv('modeDiv', this.matchTab);
	this.totalMatchesDiv = this.createAndAppendDiv('totalMatchesDiv', this.statsTab);

	$('#frame').contents().find('body').append(this.Tabs);
	$( this.Tabs ).tabs();
};

UI.prototype.setMode = function(mode) {
	this.mode = mode;
	this.modeDiv.innerHTML = this.modeStr() + this.mode;
};

UI.prototype.getMode = function() {
	return this.mode;
};

UI.prototype.modeStr = function() {
	return "Current Mode: ";
};

UI.prototype.updateTotalMatches = function() {
	chrome.storage.local.get(["matches_v1"], function(results){
		var win = new UI();
		win.setTotalMatches(results.matches_v1.length);
	});
};

UI.prototype.setTotalMatches = function(matches) {
	this.totalMatchesDiv.innerHTML = this.totalMatchesStr() + matches;
};

UI.prototype.totalMatchesStr = function() {
	return "Total Matches: ";
};

UI.prototype.createAndAppendDiv = function(div, parent) {
	var newDiv = document.createElement('div');
	newDiv.id = div;
	parent.appendChild(newDiv);
	return newDiv;
};