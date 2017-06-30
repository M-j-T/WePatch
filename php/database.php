<?php
	//javascriptの値を代入する
	$s_width = '<script src="http://tajima.nkmr.io/BADUI/chrome/db_sample.js">
  	document.write(a);
  	</script>';

  	echo $s_width;

/*
	$db = new SQLite3('dataInfo2.db');
	$results = $db->query('select * from value');
	$results2 = $db->query('select column,usertime from value order by id asc;');
	//最新の行を取得
	while( $data = $results2->fetchArray() )  {
		$newColumn=$data["column"];//新しい行の情報を取得
		$_SESSION["usertime"] = $data["usertime"];//最新のユーザの入力時間を取得
	}

	//最新１０行分のデータを取得してjavascriptに送る
	$arraycolumn=array();
	$arraysValue=array();
	$pov=0;//買った回数
	$change=0;//パターンが変わった回数
	$profit=-1;//利益
	$profitDif=0;//損益の差
	$paturn="non";
	$pre_yama;//２つ前の山
	$pre_tani;//２つ前の谷
	while( $data = $results->fetchArray() )  {
		if($data["column"]>$newColumn-$period){
			array_push($arraycolumn,$data["column"]);
			array_push($arraysValue,$data["sValue"]);
			$newUsertime=$data["usertime"];
			$newGettime=$data["gettime"];
			$sign=$data["sign"];
			$position=$data["position"];
			$sValue=$data["sValue"];
			$sheet=$data["sheet"];
			if($data["column"]==$newColumn-2){
				$pre_yama=$data["yama"];
				$pre_tani=$data["tani"];
			}
			$yama=$data["yama"];
			$tani=$data["tani"];
			if($profit!=-1){
				if($data["paturn"]!=$paturn){
					$change++;
					if($data["profit"]>=$profit){
						$pov++;
					}
				}
				$profitDif=$profitDif+($data["profit"]-$profit);// 利益を加算
			}
			$profit=$data["profit"];
			$paturn=$data["paturn"];
		}
	}
	//PHP側で取り出したいキーの配列を文字列化
	$titles = '';
	foreach ($arraycolumn as $key => $value) {
	    $titles .= ','.$arraycolumn[$key];
	}
	$arraycolumn = substr($titles,1);  //先頭にのこったカンマを取り除く

	$titles2 = '';
	foreach ($arraysValue as $key => $value) {
	    $titles2 .= ','.$arraysValue[$key];
	}
	$arraysValue = substr($titles2,1);  //先頭にのこったカンマを取り除く
	*/
?>