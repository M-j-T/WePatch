//URL取得
var host = location.host;
var pathname = location.pathname;
var get_origin_url=host+""+pathname;
var get_origin_href = window.location.href ;
//ハッシュ値取得
var get_hash = window.location.hash;
var match = get_hash.match(/#(.*?)(&|$)/);
if(match) {get_hash = decodeURIComponent(match[1]);}
//機能間共通変数
var selectedFunc="default";////機能選択ボタン
var send=0;//受信したかどうか
//ウェプラ変数、配列
var formValue_wepra=new Array();
var page_wepra_id=0;
var wepra_top=new Array();
var wepra_left=new Array();
//例付与変数、配列
var exam_idname=new Array();
var example_text=new Array();
var idnum_max;
//自動変換変数、配列
var hashConvs = {};//フォーム番号とフィルタの配列を紐付けしている連想配列
var formInfo_conv_array=new Array();//フォームごとに選択された機能の情報を格納
var selectedFunc_conv=new Array();//選択された変換機能
var id_num_conv=new Array();//idの数字部分を格納
var idname_conv;//選ばれたボタンのid格納
//誤字脱字訂正変数、配列
var desing_num_corr=0;//ページ内id用変数
var desing_id_corr;//選択した文字のid
var get_page_correction_id;//取得した吹き出しページ内id
var match_correc_idNum=new Array();
var selStr_corr_array = new Array();
var correword_array=new Array();
//吹き出し変数、配列
var desing_num_balloon=0;//ページ内id用変数
var get_page_balloon_id;//取得した吹き出しページ内id
var match_balloon_idNum=new Array();//何番目にマッチしたか
var selStr_balloon_array = new Array();//選択した文字列用配列
var comment_array = new Array();//解説文字列用配列
//タレコミ
var scsyox = 0;
var scsyoy = 0;
var scsyo_x;
var scsyo_y;
var scsyo_canvas;
var cvs;
var ctx;
var title_text;
var tipster_img;
var tipster_text;

$(function(){
  //ボタン設置åå
  $('body').append('<div class="button button-circle button-flat-action" id="suppoStart" style="border: solid 5px #FFFFFF;"><b>WePatch</b></div>');
  //ボタン押したら機能選択へ
  var idname;//選ばれたのはこのidでした
  var suppofunc_name=["tipster","suppoFin","wepra","mistype","hukidashi","example_form","convert_form"];
  var back_left;
  $(document).on("click","#suppoStart", function() {
    //初期化
    match_balloon_idNum=new Array();//何番目にマッチしたか
    selStr_balloon_array = new Array();
    comment_array = new Array();
    match_correc_idNum=new Array();
    selStr_corr_array = new Array();
    correword_array=new Array();
    selectedFunc_conv=new Array();//選択された変換機能
    id_num_conv=new Array();//idの数字部分を格納
    formInfo_conv_array=new Array();
    exam_example_text=new Array();//フォームごとに選択された機能の情報を格納
    exam_idname=new Array();
    example_text=new Array();
    get_example_text=new Array();
    formValue_wepra=new Array();
    wepra_top=new Array();
    wepra_left=new Array();
    //idname = $(this).attr("id");
    $("#suppoStart").remove();
    $('body').append('<div class="button button-circle button-flat-caution suppofunc" id="back" style="border: solid 5px #FFFFFF;"><b>Close</b></div>');
    $('body').append('<div class="button button-circle button-flat-primary suppofunc" id="tipster" style="border: solid 5px #FFFFFF;"><b>Tipster</b></div>');
    $('body').append('<div class="button button-circle button-flat-highlight suppofunc" id="suppoFin" style="border: solid 5px #FFFFFF;"><b>Share</b></div>');
    $('body').append('<div class="button button-circle button-flat-action suppofunc" id="wepra" style="border: solid 5px #FFFFFF;"><b>Wepra</b></div>');
    $('body').append('<div class="button button-circle button-flat-action suppofunc" id="mistype" style="border: solid 5px #FFFFFF;"><b>MISTYPE</b></div>');
    $('body').append('<div class="button button-circle button-flat-action suppofunc" id="hukidashi" style="border: solid 5px #FFFFFF;"><b>COMMENT</b></div>');
    $('body').append('<div class="button button-circle button-flat-action suppofunc" id="example_form" style="border: solid 5px #FFFFFF;"><b>EXAMPLE</b></div>');
    $('body').append('<div class="button button-circle button-flat-action suppofunc" id="convert_form" style="border: solid 5px #FFFFFF;"><b>FILTER</b></div>');
    back_left = document.getElementById("back").getBoundingClientRect().left;
    for (var i=0 ; i<=6 ; i++){
      TweenMax.to("#"+suppofunc_name[i], 0.3, { left: back_left-63*(i+1) });
    }
  });
  $(document).on("click","#suppoStart", function() {
    selectedFunc="start";
  });

  //設定ボタンが押されたとき
  $(document).on("click","#setting_button", function() {
    idname = $(this).attr("id");
    $("#suppoStart,#setting_button,#tipster").remove();
  });
  //戻るボタン
  $(document).on("click","#back", function() {
    for (var i=0 ; i<=6 ; i++){
      TweenMax.to("#"+suppofunc_name[i], 0.3, { left: back_left });
    }
    setTimeout(function(){$(".suppofunc").remove();},200);//遅延
    $('body').append('<div class="button button-circle button-flat-action" id="suppoStart" style="border: solid 5px #FFFFFF;"><b>WePatch</b></div>');
  });

  $(document).on("click","#tipster", function() {
    selectedFunc="tipster";
    $(".suppofunc").remove();
    $('body').append('<canvas id="world" width="'+screen.width+'" height="'+screen.height+'" style="top:0px;left:0px;position:fixed;"></canvas>');
    $('body').append('<div id="back_img" style="position:fixed;left:80%;top:55%;width:15%;height:40%;background-color:#32CD32;opacity:0.7;z-index:20;padding-top:1%;padding-left:1%;"></div>');
    $('#back_img').append('<div id="output_screen" style="width:94%;height:50%;background-color:#ffffff;"><img id="screen_image" ></div>');
    $('#back_img').append('<a href="http://tajima.nkmr.io/BADUI/chrome/tipsterSite/php/tipster_index_english.php" target="_blank" style="position:absolute;top:88%;left:10%;"><button type="button">Site</button></a>');
    $('#back_img').append('<button class="back" id="back_tipster" style="position:absolute;top:88%;left:65%;">back</button>');
    //$('body').append('<div id="output_screen"><img id="screen_image" style="position:fixed;left:70%;top:70%;"></div>');
    scsyo_canvas = document.getElementById("world");
    ctx = scsyo_canvas.getContext("2d");
  });
  $(document).on("click","#back_tipster", function() {
    $("#back_img").remove();
    $("#back_tipster").remove();
    $('body').append('<div class="button button-circle button-flat-caution suppofunc" id="back" style="border: solid 5px #FFFFFF;"><b>Close</b></div>');
    $('body').append('<div class="button button-circle button-flat-primary suppofunc" id="tipster" style="border: solid 5px #FFFFFF;"><b>Tipster</b></div>');
    $('body').append('<div class="button button-circle button-flat-highlight suppofunc" id="suppoFin" style="border: solid 5px #FFFFFF;"><b>Share</b></div>');
    $('body').append('<div class="button button-circle button-flat-action suppofunc" id="wepra" style="border: solid 5px #FFFFFF;"><b>Wepra</b></div>');
    $('body').append('<div class="button button-circle button-flat-action suppofunc" id="mistype" style="border: solid 5px #FFFFFF;"><b>MISTYPE</b></div>');
    $('body').append('<div class="button button-circle button-flat-action suppofunc" id="hukidashi" style="border: solid 5px #FFFFFF;"><b>COMMENT</b></div>');
    $('body').append('<div class="button button-circle button-flat-action suppofunc" id="example_form" style="border: solid 5px #FFFFFF;"><b>EXAMPLE</b></div>');
    $('body').append('<div class="button button-circle button-flat-action suppofunc" id="convert_form" style="border: solid 5px #FFFFFF;"><b>FILTER</b></div>');
    for (var i=0 ; i<=6 ; i++){
      TweenMax.to("#"+suppofunc_name[i], 0.3, { left: back_left-63*(i+1) });
    }
  });
});

//改善終了ボタン
var selecting=0
$(document).on("click",".suppofunc:not(#suppoFin)", function() {
  selectedFunc = $(this).attr("id");
  if(selecting==0){//機能が選択されている
    //一つも改善されてない
    if(formValue_wepra.length==0&&example_text.length==0&&selectedFunc_conv.length==0&&correword_array.length==0&&comment_array.length==0){
      $(".suppofunc:not(#"+selectedFunc+")").css('opacity','0.3');//一つ以上改善されたら透明度を1.0にする
    }else{//一つ以上改善されているiru
      $(".suppofunc:not(#"+selectedFunc+"),#suppoFin").css('opacity','0.3');//一つ以上改善されたら透明度を1.0にする
    }
    selecting=1;
  }else{//機能が選択されていない
    $(".suppofunc").css('opacity','1.0');//一つ以上改善されたら透明度を1.0にする
    if(formValue_wepra.length==0&&example_text.length==0&&selectedFunc_conv.length==0&&correword_array.length==0&&comment_array.length==0){
      $("#suppoFin").css('opacity','0.3');
    }else{
      $("#suppoFin").css('opacity','1.0');
    }
    //テプラを貼り付けていなければキャンセル
    if ($('#tepura_button')[0]) {
      $('#tepura'+page_wepra_id).remove();
    }
    selectedFunc="finish";
    selecting=0;
  }
});
