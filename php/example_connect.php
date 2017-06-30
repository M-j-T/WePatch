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
        $array_length=count($_POST["form_id"]);
        for ($count=0;$count<=$array_length-1;$count++){
            try {
            	$example_id=0;
                $pdo = new PDO($dsn, $username, $password,$options);
                $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                foreach($pdo->query("SELECT * FROM form_example order by example_id desc limit 1") as $row){
                    $example_id=$row['example_id']+1;
                }
                //プリペアドステートメント
                $sql = $pdo->prepare("INSERT INTO form_example VALUES(?, ?, ?, ?, ?, ?, ?)");

                 //index.htmlで受け取った値を代入
                $user_id = 0;//送信したユーザのid
                $support_id = $_POST["hash"];//支援したurl
                $url = $_POST["url"];;//支援したurl
                $send_time = date("Y/m/j H:i:s");//日時
                $form_id = $_POST["form_id"][$count];//吹き出しのid
                $example_text = $_POST["example_text"][$count];//解説の文字列

                $sql->bindParam(1, $example_id);
                $sql->bindParam(2, $support_id);
                $sql->bindParam(3, $user_id);
                $sql->bindParam(4, $url);
                $sql->bindParam(5, $send_time);
                $sql->bindParam(6, $form_id);
                $sql->bindParam(7, $example_text);
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
            foreach($pdo->query('select * from form_example where url="'.$_POST["get_url"].'" and support_id="'.$_POST["get_hash"].'" order by example_id asc') as $row){
                array_push($arr,array("exmaple_id" => $row[5], "example_text" => $row[6]));
            }
            echo json_encode($arr);
        }catch(PDOException $e){
            print 'Connection faild: '.$e->getMessage();
            die();
        }
        $pdo = null;
    }
?>