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
                   width: 500,
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

	this.modeStr = "Current Mode: ";
	this.totalMatchesStr = "Total Matches: ";
	this.runningTotalStr = "Running Total: $";

	this.Tabs = document.createElement('div');
	this.Tabs.id = 'tabs';
	this.Tabs.innerHTML = "<ul><li><a href=\"#matchTab\">Current Match</a></li><li><a href=\"#statsTab\">Stats</a></li></ul>";

	this.matchTab = this.createAndAppendDiv('matchTab', this.Tabs);
	this.statsTab = this.createAndAppendDiv('statsTab', this.Tabs);

	this.modeDiv = this.createAndAppendDiv('modeDiv', this.matchTab);

	$(this.modeDiv).css('background-color', '#94E994');
	$(this.modeDiv).css('width', '100%');
	$(this.modeDiv).css('text-align', 'center');

	this.playersDiv = this.createAndAppendDiv('playersDiv', this.matchTab);
	this.p1Div = this.createAndAppendDiv('p1Div', this.playersDiv);
	this.p2Div = this.createAndAppendDiv('p2Div', this.playersDiv);

	this.p1Div.innerHTML = "Player 1";
	this.p2Div.innerHTML = "Player 2";

	$(this.p1Div).css('background-color', '#FFC8C8');
	$(this.p1Div).css('float', 'left');
	$(this.p1Div).css('width', '50%');
	$(this.p1Div).css('text-align', 'center');
	$(this.p1Div).css('border', '2px solid transparent');
	$(this.p2Div).css('background-color', '#E0E0FF');
	$(this.p2Div).css('width', 'auto');
	$(this.p2Div).css('overflow', 'hidden');
	$(this.p2Div).css('text-align', 'center');
	$(this.p2Div).css('border', '2px solid transparent');

	this.winnerDiv = this.createAndAppendDiv('winnerDiv', this.matchTab);
	$(this.winnerDiv).css('text-align', 'center');
	$(this.winnerDiv).css('width', '100%');

	this.runningTotalDiv = this.createAndAppendDiv('runningTotalDiv', this.matchTab);
	$(this.runningTotalDiv).css('text-align', 'center');
	$(this.winnerDiv).css('width', '100%');
	this.runningTotalDiv.innerHtml = "Running Total: $0";


	this.totalMatchesDiv = this.createAndAppendDiv('totalMatchesDiv', this.statsTab);

	$('#frame').contents().find('body').append(this.Tabs);
	$( this.Tabs ).tabs();
};

UI.prototype.setMode = function(mode) {
	this.mode = mode;
	this.modeDiv.innerHTML = this.modeStr + this.mode;
};

UI.prototype.getMode = function() {
	return this.mode;
};

UI.prototype.updateTotalMatches = function() {
	chrome.storage.local.get(["matches_v1"], function(results){
		var win = new UI();
		win.setTotalMatches(results.matches_v1.length);
	});
};

UI.prototype.setTotalMatches = function(matches) {
	this.totalMatchesDiv.innerHTML = this.totalMatchesStr + matches;
};

UI.prototype.createAndAppendDiv = function(div, parent) {
	var newDiv = document.createElement('div');
	newDiv.id = div;
	parent.appendChild(newDiv);
	return newDiv;
};

UI.prototype.setP1 = function(player) {
	this.p1 = player;
};

UI.prototype.setP2 = function(player) {
	this.p2 = player;
};

UI.prototype.setP1WL = function(wins, loss){
	this.p1Wins = wins;
	this.p1Loss = loss;
};

UI.prototype.setP2WL = function(wins, loss){
	this.p2Wins = wins;
	this.p2Loss = loss;
};

UI.prototype.setP1Score = function(score){
	this.p1Score = score;
};

UI.prototype.setP2Score = function(score){
	this.p2Score = score;
};

UI.prototype.setConf = function(conf){
	this.Conf = conf;
};

UI.prototype.setWinner = function(winner){
	this.Winner = winner;
	if( winner == this.p1){
		$(this.winnerDiv).css('background-color', '#FFC8C8');
		$(this.p1Div).css('border-color', 'red');
		$(this.p2Div).css('border-color', 'transparent');
	}
	else{
		$(this.winnerDiv).css('background-color', '#E0E0FF');
		$(this.p2Div).css('border-color', 'blue');
		$(this.p1Div).css('border-color', 'transparent');
	}
	this.winnerDiv.innerHTML = winner + ' ' + this.Conf + '%';
};

UI.prototype.resetWinnerDiv = function(){
	$(this.winnerDiv).css('background-color', '#94E994');
	$(this.p1Div).css('border-color', 'transparent');
	$(this.p2Div).css('border-color', 'transparent');
	this.winnerDiv.innerHTML = '';
};

UI.prototype.setRunningTotal = function(total){
	this.runningTotal = total;
};

UI.prototype.updateRunningTotalDiv = function(){

	if(this.runningTotal < 0){
		$(this.runningTotalDiv).css('background-color', '#EB99D6');
	}
	else{
		$(this.runningTotalDiv).css('background-color', '#FFFFB2');
	}

	this.runningTotalDiv.innerHTML = this.runningTotalStr + this.runningTotal;
};

UI.prototype.updateP1Div = function(){
	this.p1Div.innerHTML = this.p1;
	this.p1Div.innerHTML += '<br>';
	this.p1Div.innerHTML += this.p1Wins + '/' + this.p1Loss;
	this.p1Div.innerHTML += '<br>';
	this.p1Div.innerHTML += this.p1Score + ' salt';
	this.p1Div.innerHTML += '<br>';
};

UI.prototype.updateP2Div = function(){
	this.p2Div.innerHTML = this.p2;
	this.p2Div.innerHTML += '<br>';
	this.p2Div.innerHTML += this.p2Wins + '/' + this.p2Loss;
	this.p2Div.innerHTML += '<br>';
	this.p2Div.innerHTML += this.p2Score + ' salt';
	this.p2Div.innerHTML += '<br>';
};