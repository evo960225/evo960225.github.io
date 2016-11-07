$(function(){
	$('#editDiv').dialog({
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
		buttons:{
			'提交': function(){
				alert('正在提交Ajax呦...');
			},
			'取消': function(){
				$(this).dialog('close');
			}
				
			
		},

		
		beforeClose:function(e,ui){
			alert('確定要關閉嗎?');
		},

		maxWidth:350,
		minWidth:330,
		maxHeight:420,
		minHeight:400,
		autoOpen:false,
        modal: true,
        resizable: true,
        closeOnEscape: true,
        show:true,
		hide:true,
        title: "編輯事件",
		closeText: "X"
	});



	$('#event_div #event_footer #edit_button').click(function(){
		$('#editDiv').dialog('open');
	});

});