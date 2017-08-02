<?php
	header('Content-type: text/html; charset=UTF-8');

	$dsn = 'mysql:host=localhost;unix_socket=/tmp/mysql.sock;dbname=BADUI_tajima_db;charset=utf8';
	$username = 'XXXXXXX';
	$password = 'XXXXXXX';
    $options=array(
        PDO::MYSQL_ATTR_INIT_COMMAND=>'SET NAMES utf8'
    );

    if($_POST["connect"]=="catch"){
    	//挿入
        try {
        	$tipster_id=0;
            $pdo = new PDO($dsn, $username, $password,$options);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            foreach($pdo->query("SELECT * FROM tipster_english order by tipster_id desc limit 1") as $row){
                $tipster_id=$row['tipster_id']+1;
            }
            //プリペアドステートメント
            $sql = $pdo->prepare("INSERT INTO tipster_english VALUES(?, ?, ?, ?, ?, ?, ?)");

            //index.htmlで受け取った値を代入
            $user_id = 0;//送信したユーザのid
            $url = $_POST["url"];;//支援したurl
            $send_time = date("Y/m/j H:i:s");//日時
            $title = $_POST["title"];//吹き出しのid
            $screenshot = $_POST["screenshot"];//吹き出しのid
            $comment = $_POST["comment"];//解説の文字列

            $sql->bindParam(1, $tipster_id);//吹き出し全体のid
            $sql->bindParam(2, $user_id);//支援したユーザid
            $sql->bindParam(3, $url);//url
            $sql->bindParam(4, $send_time);//送信時間
            $sql->bindParam(5, $title);//送信時間
            $sql->bindParam(6, $screenshot);//スクリーンショット情報
            $sql->bindParam(7, $comment);//BADUIの文章情報
            $sql->execute();
        }catch(PDOException $e){
            print 'Connection failed: '.$e->getMessage();
            die();
        }
        $pdo = null;
    }
?>
