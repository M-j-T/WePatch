//誤字訂正
$(function(){
	//誤字脱字修正が選択されたとき
	var SelStr_correction;
	$(document).click(function(e){
		if(selectedFunc=="mistype"){
			SelStr_correction = window.getSelection().toString();//選択した文字列取得
			var selection = window.getSelection();
			//文字列が何かしら選択されたら
			if(SelStr_correction!=""){
				var target = $(event.target);//クリックした位置にあるオブジェクト要素取得
				selStr_corr_array.push(SelStr_correction);
				//すでにフォームが存在していたら追加はしない
				if(document.getElementById("id_form1_mistype") == null){
					desing_num_corr++;
					desing_id_corr='backChange_corec'+desing_num_corr;//選択した文字のid
					designString(desing_id_corr,"class_backChange_correction",'background-color: #ffff00;',selection,target);//選択した文字列に背景色をつける

			        //選択された文字列をパターンマッチし、それぞれにidを付与
					var replacement_word=SelStr_correction;//置換する語
					var replacement = new RegExp(preg_quote(replacement_word), "g");//メタ文字を判定&パターンマッチ
					var replacement2='<span class="match_word_correction">'+replacement_word+'</span>';//置換後
					$('body').html($('body').html().replace( replacement, replacement2 ));//置換
					var i=0;
					$('.match_word_correction').each(function(){
					    $(this).attr('id', 'matchNum'+Math.floor(i)+'');//id付与
					    i++;
					});
					var match_id=$('#backChange_corec'+desing_num_corr).children().attr("id");
					var kekka = match_id.split("matchNum");
					match_correc_idNum.push(parseInt(kekka[1]));
					console.log(match_correc_idNum);

					//フォーム出現
			        $('#backChange_corec'+desing_num_corr).append('<form name="form1" class="BADUI_form" id="id_form1_mistype" action=""><input name="textBox1" id="id_textBox1" type="text" value="'+SelStr_correction+'"/><button id="button_mystype">修正</button></form>');
		    	}
		    }
		}
	});

	//挿入したボタンに反応するようにする
	$(document).on("click","#button_mystype", function() {
		if(selectedFunc=="mistype"){
			var spantext=$('#'+desing_id_corr).text();
			var formValue= document.forms.id_form1_mistype.id_textBox1.value;
			correword_array.push(formValue);
			$('#'+desing_id_corr).html(spantext.replace(spantext,formValue));
			$('#id_form1_mistype').remove();
			$('#button_mystype').remove();
			$('#'+desing_id_corr).showBalloon({contents : selStr_corr_array[desing_num_corr-1]+'を修正しました',position : "top"});
			$('#'+desing_id_corr).showBalloon({hideDuration: 1350}).hideBalloon();
			$("#suppoFin").css('opacity','1.0');//一つ以上改善されたら透明度を1.0にする
			return false;
		}
    });
});