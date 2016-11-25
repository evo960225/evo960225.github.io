$(function(){
    $('.loading').fadeOut(2500);
    setTimeout(function(){
	$('#initiateDiv').show(1000);
	$('#welcomeDiv').show(1000);
	},3200);


	$('#infoDiv').dialog({
		position: { 
			my: 'center',
			at: 'center',
			collision: 'fit',
			// ensure that the titlebar is never outside the document
			using: function(pos) {
				var topOffset = $(this).css(pos).offset().top;
				if (topOffset < 0) {
					$(this).css('top', pos.top - topOffset);
				}
			}
		},
		
		
		width:380,
		minwidth:350,
		maxHeight:400,
		minHeight:300,
		autoOpen:false,
        modal: true,
        resizable: false,
        closeOnEscape: true,
        show:true,
		hide:true,
		closeText: "X",
		background:'yellow'

	});

	$('#info').click(function(){
		$('#infoDiv').dialog('open');
	});

});


