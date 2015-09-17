var UI = function() {

	this.$window = $('<div>foobarbaz</div>')
               .html('<iframe style="border: 0px; " src="" width="100%" height="100%"></iframe>')
               .dialog({
                   autoOpen: false,
                   modal: true,
                   height: 400,
                   width: 400,
                   title: "Salt Bot UI"
               });
	this.$window.dialog('open');
 
};

