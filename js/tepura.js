var tepura_pita=0;
$(function(){
  $(document).on("click","#wepra", function() {
    if(selectedFunc=="wepra"){
      var target = $(event.target);//クリックした位置にあるオブジェクト要素取>得
      //テプラ的なのを挿入
      $("#suppoFin").before('<div id="tepura'+page_wepra_id+'" class="tepura_drag"><strong><p id="attention'+page_wepra_id+'" class="attention_drag" style="font-size: 130%;"></p></strong></div>');
      //テプラの中にフォーム挿入
      $('#tepura'+page_wepra_id).append('<form name="form1" id="tepura_form" action=""><input name="textBox1" id="tepura_textBox" type="text" value="" /><button id="tepura_button">Paste</button>');
      draggable(document.getElementById('tepura'+page_wepra_id),tepura_pita);
      draggable(document.getElementById('tepura_form'),tepura_pita);
      draggable(document.getElementById('tepura_button'),tepura_pita);
      if($('attention').text()!=""){
        return e.preventDefault();
      }
    }
  });

  //挿入したボタンに反応するようにする
  $(document).on("click","#tepura_button", function() {
    var attentiontext=$('#attention'+page_wepra_id).text();
    formValue_wepra.push(document.forms.tepura_form.tepura_textBox.value);
    console.log(page_wepra_id);
    console.log(attentiontext);
    console.log(formValue_wepra);
    console.log(formValue_wepra[page_wepra_id]);
    $("#suppoFin").css('opacity','1.0');//一つ以上改善されたら透明度を1.0にする
    $('#attention'+page_wepra_id).html(attentiontext.replace(attentiontext,formValue_wepra[page_wepra_id]));
    $('#tepura_form').empty();
    $('#tepura_button').empty();

    // 要素の位置を取得する
    var element = document.getElementById( "tepura"+page_wepra_id ) ;
    var rect = element.getBoundingClientRect() ;
    tepura_pita=1;
    // 座標を計算する
    wepra_top.push(rect.top+window.pageYOffset);  // 要素のX座標
    wepra_left.push(rect.left+window.pageXOffset); // 要素のY座標
    draggable(document.getElementById('tepura'+page_wepra_id),tepura_pita);
    $('#tepura'+page_wepra_id).css({
        'top':(rect.top+window.pageYOffset)+'px',
        'left':(rect.left+window.pageXOffset)+'+px',
        'position':'absolute',
        'opacity':0.5
      });
    page_wepra_id++;

    return false;
  });
});

function draggable(target,tepura_pita) {
  target.onmousedown = function() {
    //if(tepura_pita==0){
      document.onmousemove = mouseMove;
    //}
  };
  document.onmouseup = function() {
    document.onmousemove = null;
  };
  function mouseMove(e) {
    var event = e ? e : window.event;
    if(selectedFunc=="wepra"){
      target.style.top = event.clientY-25 + 'px';
      target.style.left = event.clientX-100 + 'px';
    }else{
      target.style.top = 0 + 'px';
      target.style.left = 0 + 'px';
    }
  }
}
