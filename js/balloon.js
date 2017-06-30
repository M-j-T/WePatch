$(function(){
	//吹き出し機能が選択されたとき
	$(document).click(function(e){
		if(selectedFunc=="hukidashi"){
			var SelStr = window.getSelection().toString();//選択した文字列取得
			var selection = window.getSelection();
			//文字列が何かしら選択されたら
			if(SelStr!=""){
				var target = $(event.target);//クリックした位置にあるオブジェクト要素取得
				selStr_balloon_array.push(SelStr);
				//すでにフォームが存在していたら追加はしない
				if(document.getElementById("id_form_hukidashi") == null){
					desing_num_balloon++;
					var desing_id='backChange_ballon'+(desing_num_balloon);//選択した文字のid
					designString(desing_id,"class_backChange_balloon",'background-color: #00ffff;',selection,target,SelStr);
					//フォーム出現
			  		$('#backChange_ballon'+(desing_num_balloon)).append('<form name="form1" class="BADUI_form" id="id_form_hukidashi" action=""><input name="textBox1" id="id_textBox1" type="text"/><button id="id_button_hukidashi">決定</button></form>');

					//選択された文字列をパターンマッチし、それぞれにidを付与
					var replacement_word=SelStr;//置換する語
					var replacement = new RegExp(preg_quote(replacement_word), "g");//パターンマッチ
					var replacement2='<span class="match_word_balloon'+(desing_num_balloon-1)+'">'+replacement_word+'</span>';//置換後
					$('body').html($('body').html().replace( replacement, replacement2 ));//置換

		    		var i=0;
					$('.match_word_balloon'+(desing_num_balloon-1)).each(function(){
					    $(this).attr('id', 'matchNum'+Math.floor(i)+'');//id付与
					    i++;
					});
					var match_id=$('#'+desing_id).children().attr("id");
					var kekka = match_id.split("matchNum");
					match_balloon_idNum.push(parseInt(kekka[1]));
					console.log(match_balloon_idNum);
		    	}
		    }
		}
	});

	//挿入したボタンに反応するようにする
	$(document).on("click","#id_button_hukidashi", function() {
		comment_array.push(document.forms.id_form_hukidashi.id_textBox1.value);
		$('#id_form_hukidashi').remove();
		$('#id_button_hukidashi').remove();
		$("#suppoFin").css('opacity','1.0');//一つ以上改善されたら透明度を1.0にする
		return false;
    });

	var idnum
	//吹き出しを表示
	$(document).on('mouseenter','.class_backChange_balloon',function(){
		idnum=$(this).attr("id");
		var kekka = idnum.split("backChange_ballon");
		var num=parseInt(kekka[1]);
		var kekka2=idnum.split("_");
		var kekka3=kekka2[1].split(num);
		if(kekka3[0]=="ballon"){
	    	$('#'+idnum).showBalloon({contents : comment_array[num],position : "top"});
	    }
   	});
   	$(document).on('mouseleave','.class_backChange_balloon',function(){
	    $('#'+idnum).showBalloon().hideBalloon();
	});
});
