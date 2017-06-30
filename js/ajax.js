//改善終了時にデータベースに情報を送信する
$(document).on("click","#suppoFin", function() {
  if(formValue_wepra.length!=0||example_text.length!=0||selectedFunc_conv.length!=0||correword_array.length!=0||comment_array.length!=0){
    //日時情報取得
    var today = new Date();
    //ハッシュ値発行
    var make_hash=parseInt(today.getHours()+''+today.getSeconds()+''+today.getDay()+''+(Math.floor(Math.random()*900)+100));

    console.log("送信");
    console.log(wepra_top);
    console.log(wepra_left);
    console.log(formValue_wepra);
    console.log(page_wepra_id-1);
    //アノテーションボタンをクリックで発生
      $.ajax({ //ajaxによる非同期通信発生
        type: "POST", //POST送信でデータを受け渡す
        url: "https://nkmr.io/decoby/wepra_connect.php", //send.phpにデータを送る
        data:{
          'hash' : make_hash,
          'url' : get_origin_url,
          'page_wepra_id' : page_wepra_id-1,
          'wepra_top' : wepra_top,
          'wepra_left' : wepra_left,
          'comment' : formValue_wepra,
          'connect' : "catch"
        },
          success: function(data) {
              console.log("ok"); //phpからの帰り値をポップアップで表示
          },
          error: function(XMLHttpRequest,textStatus,errorThrown){
              console.log('エラーです！'); //エラーを表示
          }
      });

    console.log("送信");
    console.log(exam_idname);
    console.log(example_text);
    //改善終了ボタン押した時の動作
    $.ajax({ //ajaxによる非同期通信発生
      type: "POST", //POST送信でデータを受け渡す
      url: "https://nkmr.io/decoby/example_connect.php", //send.phpにデータを送る
      data:{
        'hash' : make_hash,
        'url' : get_origin_url,
        'form_id' : exam_idname,
        'example_text' : example_text,
        'connect' : "catch"
      },
        success: function(data) {
            console.log("ok"); //phpからの帰り値をポップアップで表示
        },
        error: function(XMLHttpRequest,textStatus,errorThrown){
            console.log('エラーです！'); //エラーを表示
        }
      });

    console.log("送信");
    console.log(id_num_conv);
    console.log(selectedFunc_conv);
    //アノテーションボタンをクリックで発生
    $.ajax({ //ajaxによる非同期通信発生
      type: "POST", //POST送信でデータを受け渡す
      url: "https://nkmr.io/decoby/convert_connect.php", //send.phpにデータを送る
      data:{
        'hash' : make_hash,
        'url' : get_origin_url,
        'form_id' : id_num_conv,
        'annotation' : selectedFunc_conv,
        'connect' : "catch"
      },
        success: function(data) {
            console.log("ok"); //phpからの帰り値をポップアップで表示
        },
        error: function(XMLHttpRequest,textStatus,errorThrown){
            console.log('エラーです！'); //エラーを表示
        }
      });

    console.log("送信");
    console.log(desing_num_corr-1);
    console.log(selStr_corr_array);
    console.log(match_correc_idNum);
    console.log(correword_array);

    //変換ボタンをクリックで発生
    $.ajax({ //ajaxによる非同期通信発生
      type: "POST", //POST送信でデータを受け渡す
      url: "https://nkmr.io/decoby/correction_connect.php", //send.phpにデータを送る
      data:{
        'hash' : make_hash,
        'url' : get_origin_url,
        'page_correction_id' : desing_num_corr-1,//ページ内での誤字訂正id
        'selword' : selStr_corr_array,//選択された文字列
        'match_correc_idNum' : match_correc_idNum,//マッチした中でも何個目のものか
        'correword' : correword_array,
        'connect' : "catch"
      },
        success: function(hoge) {
            console.log('ok'); //phpからの帰り値をポップアップで表示
        },
        error: function(XMLHttpRequest,textStatus,errorThrown){
            console.log('誤字脱字修正はエラーです！'); //エラーを表示
        }
    });

    //吹き出し解説送信
    console.log("送信");
    console.log(make_hash);
    console.log(desing_num_balloon-1);
    console.log(selStr_balloon_array);
    console.log(match_balloon_idNum);
    console.log(comment_array);

    //変換ボタンをクリックで発生
    $.ajax({ //ajaxによる非同期通信発生
      type: "POST", //POST送信でデータを受け渡す
      url: "https://nkmr.io/decoby/balloon_connect.php", //send.phpにデータを送る
      data: {
        'hash' : make_hash,
        'url' : get_origin_url,
        'page_balloon_id' : desing_num_balloon-1,//ページ内での吹き出しid
        'selword' : selStr_balloon_array,//選択された文字列
        'match_idNum' : match_balloon_idNum,//マッチした中でも何個目のものか
        'comment' : comment_array,
        'connect' : "catch"
      },
        success: function(hoge) {
            console.log('ok'); //phpからの帰り値をポップアップで表示
            //window.open("?tajimaId=#"+make_hash)
        },
        error: function(XMLHttpRequest,textStatus,errorThrown){
            console.log('吹き出しは送信エラーです！'); //エラーを表示
        }
      });
    window.open("#"+make_hash)
  }else{
    alert("Please improve after improving more than one.");
  }
});


//タレコミ情報をデータベース送信
$(document).on("click","#id_button_tipster_submit_form", function() {
  if(selectedFunc=="tipster"){
    $("#back_img").remove();
    $('body').append('<img border="0" src="http://tajima.nkmr.io/BADUI/chrome/images/job_benriya_nandemoya.png" width="100" height="100" class="BadSupButton" id="suppoStart" alt="設定">');
    $('body').append('<img border="0" src="http://tajima.nkmr.io/BADUI/chrome/images/job_tantei_woman.png" width="100" height="100" class="BadSupButton" id="tipster" alt="設定">');
    $('body').append('<img border="0" src="http://tajima.nkmr.io/BADUI/chrome/images/yajirushi04_hayai.png" width="25" height="32" id="setting_button" alt="設定">');

      //吹き出し解説送信
    console.log("送信");
    title_text="タイトル";
    console.log(title_text);
    console.log(tipster_img);
    console.log(tipster_text);

    //変換ボタンをクリックで発生
    $.ajax({ //ajaxによる非同期通信発生
      type: "POST", //POST送信でデータを受け渡す
      url: "https://nkmr.io/decoby/tipster_connect.php", //send.phpにデータを送る
      data: {
        'url' : get_origin_href,
        'title' : document.title,
        'screenshot' : tipster_img,//マッチした中でも何個目のものか
        'comment' : tipster_text,
        'connect' : "catch"
      },
        success: function(hoge) {
            console.log('ok'); //phpからの帰り値をポップアップで表示
        },
        error: function(XMLHttpRequest,textStatus,errorThrown){
            console.log('タレコミは送信エラーです！'); //エラーを表示
        }
      });
    }
});


//ウェプラ受信
$.ajax({ //ajaxによる非同期通信発生
  type: "POST", //POST送信でデータを受け渡す
  url: "https://nkmr.io/decoby/wepra_connect.php", //send.phpにデータを送る
  data:{
    'get_url' : get_origin_url,
    'get_hash' : get_hash,
    'connect' : "send"
  },
    success: function(data) {
      //console.log("ウェプラ受信成功");
      //データベースから取得したデータ
      for (var i=0; i<data.length; i++) {
        page_wepra_id=data[i].page_wepra_id;
        wepra_top=data[i].wepra_top;
        wepra_left=data[i].wepra_left;
        $('body').before('<div id="tepura'+page_wepra_id+'" class="tepura" style="top: '+wepra_top+'px;left: '+wepra_left+'px;"><strong><p id="attention'+page_wepra_id+'" class="wepra_attention" style="font-size: 100%;"></p></strong></div>');
        var attentiontext=$('#attention'+page_wepra_id).text();
        $('#attention'+page_wepra_id).html(attentiontext.replace(attentiontext,data[i].comment));
      }
      if(data.length!=0){
        page_wepra_id=parseInt(data[data.length-1].page_wepra_id);
        page_wepra_id++;
      }
    },
    error: function(XMLHttpRequest,textStatus,errorThrown){
        //console.log('ウェプラの受信エラーです！'); //エラーを表示
    }
});

//例付与受信
$.ajax({ //ajaxによる非同期通信発生
  type: "POST", //POST送信でデータを受け渡す
  url: "https://nkmr.io/decoby/example_connect.php", //send.phpにデータを送る
  data:{
    'get_url' : get_origin_url,
    'get_hash' : get_hash,
    'connect' : "send"
  },
    success: function(data) {
      //console.log("例付与受信成功");
      var i = 0;
      $('form input:text').each(function(){
          $(this).attr('id', 'inputNum'+Math.floor(i)+'');//id付与
          idnum_max=i;
          i=i+1;
      });
      //データベースから取得したデータ
      for (var i=0; i<data.length; i++) {
        example_text.push(data[i].example_text);
        exam_idname.push(data[i].exmaple_id);
        document.getElementById('inputNum'+data[i].exmaple_id).value = data[i].example_text;
        $('#inputNum'+data[i].exmaple_id).css('color', 'darkgray');//文字を灰色にする
      }
    },
    error: function(XMLHttpRequest,textStatus,errorThrown){
        console.log('エラーです！'); //エラーを表示
    }
});

//自動変換受信
$.ajax({ //ajaxによる非同期通信発生
  type: "POST", //POST送信でデータを受け渡す
  url: "https://nkmr.io/decoby/convert_connect.php", //send.phpにデータを送る
  data:{
    'get_url' : get_origin_url,
    'get_hash' : get_hash,
    'connect' : "send"
  },
    success: function(data) {
      //console.log("変換フィルタ受信成功");
      //すでにid付与されているのでしない
      /*var i = 0;
      $('form input:text').each(function(){
          formInfo_conv_array.push(0);
          $(this).attr('id', 'inputNum'+Math.floor(i)+'');//id付与
          i=i+1;
      });*/
      //データベースに保存した値を反映
      var formfilter_one=[];//連想配列に複数種類のフィルタを格納する配列
      for (var i=0; i<data.length; i++) {
        id_num_conv=data[i].form_id;
        //連想配列の長さが変わるかどうかチェックする
        var count=0; for(var j in hashConvs){count++;}
        hashConvs[id_num_conv]="";
        var count2=0; for(var j in hashConvs){count2++;}
        //違うフォームが対象になったら連想配列に入れる配列をリセットする
        if(count>0){
          if(count!=count2){
            var formfilter_one=[];//リセット
          }
        }

        var get_annotation=data[i].annotation;//フィルタの種類を取得

        formInfo_conv_array[id_num_conv]=get_annotation;
        formfilter_one.push(get_annotation);//フィルタの種類情報を配列に格納

        //連想配列にフィルタ情報の配列を格納
        hashConvs[id_num_conv] = formfilter_one;

        //フィルタにハイライトを付与
        $('#inputNum'+data[i].form_id).css('box-shadow', '0 0 1px #1abc9c');
        $('#inputNum'+data[i].form_id).css('border','1px solid #1abc9c');
      }
    },
    error: function(XMLHttpRequest,textStatus,errorThrown){
        console.log('エラーです！'); //エラーを表示
      }
});

//誤字脱字ajax
$.ajax({ //ajaxによる非同期通信発生
  type: "POST", //POST送信でデータを受け渡す
  url: "https://nkmr.io/decoby/correction_connect.php", //send.phpにデータを送る
  data:{
    'get_url' : get_origin_url,
    'get_hash' : get_hash,
    'connect' : "send"
  },
    success: function(data) {
      //console.log("誤字修正受信成功");
      //データベースから取得したデータを配列に格納
      for (var i=0; i<data.length; i++) {
        selStr_corr_array.push(data[i].selword);
        correword_array.push(data[i].correword);
        match_correc_idNum.push(parseInt(data[i].match_idNum));
        console.log(data[i].selword);
        console.log(data[i].correword);
        console.log(data[i].page_correction_id);
        var replacement_word=data[i].selword;//置換する語
        var replacement = new RegExp(preg_quote(replacement_word), "g");//パターンマッチ
        var replacement2='<span class="match_word_correction'+data[i].page_correction_id+'">'+replacement_word+'</span>';//置換後
        $('body').html($('body').html().replace( replacement, replacement2 ));//置換
        var j=0;
        $('.match_word_correction'+data[i].page_correction_id).each(function(){
            if(j==data[i].match_idNum){
              $(this).addClass('class_backChange_correction');
              $(this).attr('id', 'backChange_corec'+data[i].page_correction_id);
            $('#backChange_corec'+data[i].page_correction_id).css("background-color","#ffff00");
            var spantext=$('#backChange_corec'+data[i].page_correction_id).text();
            $('#backChange_corec'+data[i].page_correction_id).html(spantext.replace(spantext,data[i].correword));
            $('#backChange_corec'+data[i].page_correction_id).removeClass("match_word_correction"+data[i].page_correction_id);
          }
            j++;
        });
        if(data.length!=0){
          desing_num_corr=parseInt(data[data.length-1].page_correction_id);
          desing_num_corr++;
      }
    }
    },
    error: function(XMLHttpRequest,textStatus,errorThrown){
        console.log('誤字脱字修正は受信エラーです！'); //エラーを表示
    }
});

//吹き出し解説ajax
$.ajax({ //ajaxによる非同期通信発生
  type: "POST", //POST送信でデータを受け渡す
  url: "https://nkmr.io/decoby/balloon_connect.php", //send.phpにデータを送る
  data:{
    'get_url' : get_origin_url,
    'get_hash' : get_hash,
    'connect' : "send"
  },
    success: function(data) {
      //console.log("吹き出し受信成功");
      //データベースから取得したデータを配列に格納
      for (var i=0; i<data.length; i++) {
        selStr_balloon_array.push(data[i].selword);
        comment_array.push(data[i].comment);
        match_balloon_idNum.push(parseInt(data[i].match_idNum));
        console.log(data[i].selword);
        console.log(data[i].comment);
        console.log(data[i].page_balloon_id);
        console.log(data[i].match_idNum);
        //データベースの値を参考にして吹き出しを付与
        var replacement_word=data[i].selword;//置換する語
        var replacement = new RegExp(preg_quote(replacement_word), "g");//パターンマッチ
        var replacement2='<span class="match_word_balloon'+data[i].page_balloon_id+'">'+replacement_word+'</span>';//置換後
        $('body').html($('body').html().replace( replacement, replacement2 ));//置換
        var j=0;
        $('.match_word_balloon'+data[i].page_balloon_id).each(function(){
            if(j==data[i].match_idNum){
              $(this).addClass('class_backChange_balloon');
              $(this).attr('id', 'backChange_ballon'+data[i].page_balloon_id);
            $('#backChange_ballon'+data[i].page_balloon_id).css("background-color","#00ffff");
            $('#backChange_ballon'+data[i].page_balloon_id).removeClass("match_word_balloon"+data[i].page_balloon_id);
          }
            j++;
        });
      }
      if(data.length!=0){
        desing_num_balloon=parseInt(data[data.length-1].page_balloon_id);
        desing_num_balloon++;
      }
    },
    error: function(XMLHttpRequest,textStatus,errorThrown){
        console.log('吹き出しは受信エラーです！'); //エラーを表示
    }
});

