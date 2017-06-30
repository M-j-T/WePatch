$(function() {
	$(document).click(function(e){
		if(selectedFunc=="example_form"){
			//ボタン要素の挿入とid付与
			if(document.getElementById("annotation_example") == null){
				//アノテーションボタンをクリックで発生
				var i = 0;
				$('form input:text').each(function(){
				    $(this).attr('id', 'inputNum'+Math.floor(i)+'');//id付与
				    i=i+1;
				});
			}
		}
	});

	//フォーカスイン時
	$("form input:text").focusin(function(e) {
		if(selectedFunc=="example_form"){
			$(this).val("");
			$(this).css('color', 'black');//文字を灰色にする
		}else{
			if($(this).val().length>0){
				var idname = $(this).attr("id");//id取得
				var kekka = idname.split("inputNum");
				var id_num=parseInt(kekka[1]);
				for (var i=0; i<exam_idname.length; i++) {
					if(id_num==exam_idname[i]){
						$(this).val("");
					}
				}
			}
		}
	});

	//フォーカスアウト時
	$("form input:text").focusout(function(e) {
		$(this).css('color', 'black');//文字を灰色にする
		if(selectedFunc=="example_form"){
			$(".example_added").css('color', 'darkgray');//文字を灰色にする
			//何かしら文字が入力されていたら
			if($(this).val().length>0){
				$(this).attr('class', 'example_added');//クラス付与;
				var idname = $(this).attr("id");//id取得
				var kekka = idname.split("inputNum");
				var id_num=parseInt(kekka[1]);
				if(exam_idname[exam_idname.length-1]!=id_num){
					exam_idname.push(id_num);
					example_text.push($(this).val());//打ち込まれたテキスト情報取得
					$("#suppoFin").css('opacity','1.0');//一つ以上改善されたら透明度を1.0にする
				}
			}
		}else{
			var idname = $(this).attr("id");//id取得
			var kekka = idname.split("inputNum");
			var id_num=parseInt(kekka[1]);
			for (var i=0; i<exam_idname.length; i++) {
				if(id_num==exam_idname[i]){
					if($(this).val()==""){
						$(this).val(example_text[i]);
						$(this).css('color', 'darkgray');//文字を灰色にする
					}
				}
			}
		}
	});
});
