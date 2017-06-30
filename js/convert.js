//フォーム入力文字自動変換
$(function() {
	$(document).click(function(e){
		if(selectedFunc=="convert_form"){
			//ボタン要素の挿入とid付与
			if(document.getElementById("annotation1") == null){
				//アノテーションボタンをクリックで発生
				//変換機能付与のボタンを挿入
				$("form input:text").after('<div id="annotation1"><button class="annotation_conv" style="color:snow;background-color:dodgerblue;">Convert</button>');
				$("form input:text").after('<div id="annotation1"><button class="annotation_conv2" style="color:snow;background-color:dodgerblue;">Remove</button>');
				var i = 0;
				$('form input:text').each(function(){
				    $(this).attr('id','inputNum'+Math.floor(i)+'');//id付与
				    i=i+1;
				});
				var i = 0;
				$('.annotation_conv,.annotation_conv2').each(function(){
				    $(this).attr('id','inputNum'+Math.floor(i)+'');//id付与
				    i=i+0.5;
				});
			}
		}else if(selectedFunc=="finish"){
			$('.annotation_conv').parent().remove();
			$(".function_conv").remove();
		}
	});

	//変換ボタン
  	var idname_conv;
	$(document).on("click",".annotation_conv", function() {
		idname_conv = $(this).attr("id");
		$('#'+idname_conv).after('<button class="function_conv" id="hankaku" style="color:snow;background-color:dodgerblue;">半角へ変換</button>');
		$('#'+idname_conv).after('<button class="function_conv" id="zenkaku" style="color:snow;background-color:dodgerblue;">全角へ変換</button>');
		//$('#'+idname_conv).after('<button id="back_annotation_conv" style="color:dimgray;background-color:lightcyan;margin-right:10px;">戻る</button>');
		$('#'+idname_conv).after('<br>');
		$(this,'#'+idname_conv).remove();
		$(".annotation_conv2",'#'+idname_conv).remove();
		var kekka = idname_conv.split("inputNum");//文字列を分割
		id_num_conv.push(parseInt(kekka[1]));
		return false;
	});

	//除去ボタン
  	var idname_conv;
	$(document).on("click",".annotation_conv2", function() {
		idname_conv = $(this).attr("id");
		$('#'+idname_conv).after('<br>');
		$('#'+idname_conv).after('<p>複数種類の除去する文字を指定可能(ex. /|-|ー と入力する)</p>');
		$('#'+idname_conv).after('<p>除去する文字を指定可能(ex. -(ハイフン), /(スラッシュ)など)</p>');
		$('#'+idname_conv).after('<form name="form1" class="" id="id_form_remove" action=""><input name="function_conv_input" id="id_form_remove_input" type="text" style="width:50px;"/><button id="id_form_remove_button">決定</button></form>');
		$('#'+idname_conv).after('<br>');
		$(this,'#'+idname_conv).remove();
		$(".annotation_conv",'#'+idname_conv).remove();
		var kekka = idname_conv.split("inputNum");//文字列を分割
		id_num_conv.push(parseInt(kekka[1]));
		return false;
	});

	//選択された変換機能
	$(document).on("click",".function_conv", function() {
		selectedFunc_conv.push($(this).attr("id"));
		console.log(selectedFunc_conv);
		$("#suppoFin").css('opacity','1.0');//一つ以上改善されたら透明度を1.0にする
		$('#'+idname_conv).css('box-shadow', '0 0 1px #1abc9c');
        $('#'+idname_conv).css('border','1px solid #1abc9c');
		$(".function_conv").remove();
		return false;
	});

	//削除する文字を指定
	$(document).on("click","#id_form_remove_button", function() {
		selectedFunc_conv.push(document.forms.form1.function_conv_input.value);
		console.log(selectedFunc_conv);
		$("#suppoFin").css('opacity','1.0');//一つ以上改善されたら透明度を1.0にする
		$('#'+idname_conv).css('box-shadow', '0 0 1px #1abc9c');
        $('#'+idname_conv).css('border','1px solid #1abc9c');
		$("#id_form_remove_input").remove();
		$("#id_form_remove_button").remove();
		return false;
	});

	//フォームがクリックされたときの動作
	$('form input:text').change(function(){
		//自動変換機能
		var txt = $(this).val();
		var txt2 = $(this).val();
		var idnum_click=$(this).attr("id");//クリックしたフォームのid取得
		var kekka_click = idnum_click.split("inputNum");//文字列を分割
		var num=parseInt(kekka_click[1]);//idの数字だけ取得

		var ballontxt;

		if(hashConvs[num]!=undefined){
			for (var i=0; i<hashConvs[num].length; i++) {
				if(hashConvs[num][i]=="hankaku"){
					//全角英数字を半角に変換する
					txt = txt.replace(/[Ａ-Ｚａ-ｚ０-９]/g,function(s){return String.fromCharCode(s.charCodeAt(0)-0xFEE0)});
				}else if(hashConvs[num][i]=="zenkaku"){
					//半角英数字を全角に変換する
					txt = txt.replace(/[A-Za-z0-9]/g,function(s){return String.fromCharCode(s.charCodeAt(0)+0xFEE0)});
				}else{
					//ユーザの指定した文字を除く
					regexp = new RegExp(hashConvs[num][i], 'g'),
					txt = txt.replace(regexp,"");
				}
			}
			$(this).val(txt);

			if(txt!=txt2){
				$('#'+idnum_click).showBalloon({contents : "修正しました",position : "top"});
				$('#'+idnum_click).showBalloon({hideDuration: 2500}).hideBalloon();
			}
		}
	});
});
