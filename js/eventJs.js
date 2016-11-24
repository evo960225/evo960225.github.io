$(function(){
	$('#insertDiv').dialog({
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
		/*buttons:{
			'提交': function(){
				alert('正在提交Ajax呦...');
				$(this).dialog('insert');
			},
			'取消': function(){
				$(this).dialog('close');
			}
				
			
		},*/

		
		/*beforeClose:function(e,ui){
			alert('確定要關閉嗎?');
		},*/

		maxWidth:400,
		minWidth:350,
		maxHeight:400,
		minHeight:330,
		autoOpen:false,
        modal: true,
        resizable: true,
        closeOnEscape: true,
        show:true,
		hide:true,
        title: "新增事件",
		closeText: "X"
	});




	$('#insert_button').click(function(){
		$('#insertDiv').dialog('open');
	});




	$('#deleteDiv').dialog({
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
		

		maxWidth:400,
		minWidth:350,
		maxHeight:250,
		minHeight:230,
		autoOpen:false,
        modal: true,
        resizable: true,
        closeOnEscape: true,
        show:true,
		hide:true,
        title: "刪除事件",
		closeText: "X"
	});



	$('#delete_button').click(function(){
		$('#deleteDiv').dialog('open');
	});


	$('#ensureDiv').dialog({
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
		
		maxWidth:200,
		minWidth:150,
		maxHeight:180,
		minHeight:150,
		autoOpen:false,
        modal: true,
        resizable: true,
        closeOnEscape: true,
        show:true,
		hide:true,
        title: "網頁訊息",
		closeText: "X"
	});



	$('#modifyDiv').dialog({
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

	
		maxWidth:400,
		minWidth:350,
		maxHeight:400,
		minHeight:330,
		autoOpen:false,
        modal: true,
        resizable: true,
        closeOnEscape: true,
        show:true,
		hide:true,
        //title: "修改事件", 
		closeText: "X"
	});



	$('#searchDiv').dialog({
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
	
		maxWidth:400,
		minWidth:350,
		maxHeight:250,
		minHeight:200,
		autoOpen:false,
        modal: true,
        resizable: true,
        closeOnEscape: true,
        show:true,
		hide:true,
        title: "搜尋事件",
		closeText: "X"
	});




	$('#search_button').click(function(){
		
		$('#searchDiv').dialog('open');
		
	});



});
