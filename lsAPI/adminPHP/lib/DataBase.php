<?php

header("Content-type:text/html; charset=utf-8" );

class DataBase{
	
	private $DBMS = "mysql";
	private $DB_NAME = "a0919140825";
	private $HOST = "127.0.0.1";
	private $PORT = "3306";
	private $USER_NAME = "root";
	private $PASSWORD = "111111";
	
	public $db;
	
	public function __construct(){
		$dsn = $this ->DBMS.":dbname=".$this ->DB_NAME.";host=".$this ->HOST;
		$user = $this ->USER_NAME;
		$password = $this ->PASSWORD;
		try{
			$this ->db = new PDO($dsn,$user,$password);
            $this ->db ->exec("set charset utf8");
		}catch(PDOException $e){
			echo 'Connection failed:'.$e ->getMessage();
		}
	}
	
}

?>