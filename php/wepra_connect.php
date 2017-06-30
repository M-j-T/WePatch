<?php
	header('Content-type: text/html; charset=UTF-8');

	$dsn = 'mysql:host=localhost;unix_socket=/tmp/mysql.sock;dbname=BADUI_tajima_db;charset=utf8';
	$username = 'nakamura-lab';
	$password = 'n1k2m3r4fms';
    $options=array(
        PDO::MYSQL_ATTR_INIT_COMMAND=>'SET NAMES utf8'
    );

    if($_POST["connect"]=="catch"){
    	//挿入
        $array_length=count($_POST["comment"]);
        for ($count=0;$count<=$array_length-1;$count++){
            try {
            	$wepra_id=0;
                $pdo = new PDO($dsn, $username, $password,$options);
                $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                foreach($pdo->query("SELECT * FROM wepra order by wepra_id desc limit 1") as $row){
                    $wepra_id=$row['wepra_id']+1;
                }
                //プリペアドステートメント
                $sql = $pdo->prepare("INSERT INTO wepra VALUES(?, ?, ?, ?, ?, ?, ?, ? ,?)");

                //index.htmlで受け取った値を代入
                $user_id = 0;//送信したユーザのid
                $support_id = $_POST["hash"];//支援したurl
                $url = $_POST["url"];;//支援したurl
                $send_time = date("Y/m/j H:i:s");//日時
                $page_wepra_id = ($_POST["page_wepra_id"]-($array_length-1))+$count;//のid
                $wepra_top = $_POST["wepra_top"][$count];//吹き出しのid
                $wepra_left = $_POST["wepra_left"][$count];//吹き出しのid
                $comment = $_POST["comment"][$count];//解説の文字列

                $sql->bindParam(1, $wepra_id);//吹き出し全体のid
                $sql->bindParam(2, $support_id);//支援全体のid
                $sql->bindParam(3, $user_id);//支援したユーザid
                $sql->bindParam(4, $url);//url
                $sql->bindParam(5, $send_time);//送信時間
                $sql->bindParam(6, $page_wepra_id);//ページ内での吹き出しid
                $sql->bindParam(7, $wepra_top);//選択した文字列
                $sql->bindParam(8, $wepra_left);//マッチした中でも何個目のものか
                $sql->bindParam(9, $comment);//解説文字列
                $sql->execute();
            }catch(PDOException $e){
                print 'Connection failed: '.$e->getMessage();
                die();
            }
            $pdo = null;
        }
    }else if($_POST["connect"]=="send"){
        //読み込み
        try{
            $pdo = new PDO($dsn, $username, $password,$options);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            header("Content-Type: application/json; charset=utf-8");

            $arr=array();
            foreach($pdo->query('select * from wepra where url="'.$_POST["get_url"].'" and support_id="'.$_POST["get_hash"].'" order by page_wepra_id asc') as $row){
                array_push($arr,array("page_wepra_id" => $row[5], "wepra_top" => $row[6], "wepra_left" => $row[7], "comment" => $row[8]));
            }
            echo json_encode($arr);
        }catch(PDOException $e){
            print 'Connection faild: '.$e->getMessage();
            die();
        }
        $pdo = null;
    }
?>