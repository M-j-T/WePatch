$(function(){
    $(document).on("mousedown","#world", function(e) {
		var railhead = e.target.getBoundingClientRect();
		scsyox = e.clientX-railhead.left;
		scsyoy = e.clientY-railhead.top;
		    $('#world').bind('mousemove',function(e){
		    if(selectedFunc=="tipster"){
				var railhead = e.target.getBoundingClientRect();
				scsyo_x = e.clientX-railhead.left;
				scsyo_y = e.clientY-railhead.top;
				ctx.clearRect(0,0,scsyo_canvas.width,scsyo_canvas.height);
				ctx.strokeRect(scsyox,scsyoy,scsyo_x-scsyox,scsyo_y-scsyoy);
				}
	    });
    });

    $(document).on("mouseup","#world", function(e) {
		$('#world').unbind('mousemove');
		ctx.clearRect(0,0,scsyo_canvas.width,scsyo_canvas.height);
		$("#world").remove();
		screenshot();//スクリーンショットを実行
    });
});

function screenshot() {
    //var element = $(selector)[0];
    html2canvas(document.body, { onrendered: function(canvas) {
        tipster_img = canvas.toDataURL('image/png');
        $('#screen_image')[0].src = tipster_img;
        $('#screen_image').wrap('<div id="wrapOutput_screen" style="width:94%;height:50%;overflow:hidden;position:relative;""></div>');
        $('#output_screen').append('<form name="form1" class="tipster_form" id="id_tipster_form" action="" style="position:absolute;top:55%;left:0%;"><textarea wrap="soft" rows="4"  cols="18" name="tipster_form" id="id_tipster_form_textBox1"></textarea><button id="id_button_tipster_form" type="button">Explanation</button></form>');
    }});
}
function erase_screenshot() {
    $('#screen_image')[0].src = "";
}


//挿入したボタンに反応するようにする
$(document).on("click","#id_button_tipster_form", function() {
	if(selectedFunc=="tipster"){
		tipster_text= document.forms.id_tipster_form.id_tipster_form_textBox1.value;
		$('#wrapOutput_screen').after('<p id="tipster_text">'+(tipster_text)+'</p>');
		$("#id_tipster_form").remove();
		$('#tipster_text').after('<form name="form2" class="tipster_submit_form" id="id_tipster_submit_form" action="" enctype="multipart/form-data" style="position:absolute;top:70%;left:40%;"><button id="id_button_tipster_submit_form" style="color:#FFFFFF;background-color:blue;border-style: none;-moz-border-radius:3px;-webkit-border-radius:3px;border-radius:3px;">Send</button></form>');
		return false;
	}
});
//挿入したボタンに反応するようにする
$(document).on("click","#id_button_tipster_submit_form", function() {
	if(selectedFunc=="tipster"){
		$("#id_tipster_submit_form,#tipster_text,#wrapOutput_screen").remove();
		return false;
	}
});