<?php
/**
 * Created by PhpStorm.
 * User: lolo
 * Date: 2019/11/16
 * Time: 21:01
 */
header("Content-type:text/html; charset=utf-8" );
//include "Config.php";

//数据库类
class DataBase
{
    public $USER_NAME = "trashclass_top";     //数据库的用户名
    public $PASSWORD = "trashclassDbPassword";     //数据库的密码
    public $PORT = "3306";      //端口
    public $DB_NAME = "trashclass_top";        //数据库名
    public $DBMS = "mysql";     //数据库系统
    public $HOST = "47.99.144.132";     //数据库的地址

    public $db;

    /**
     * db constructor.
     * @param $db
     */
    public function __construct()
    {
        $dsn = $this ->DBMS .':dbname='.$this ->DB_NAME.';host='.$this ->HOST ;
        $user  =  $this ->USER_NAME ;
        $password  =  $this ->PASSWORD ;
        try {
            $this->db = new  PDO ( $dsn ,$user , $password );
            $this ->db ->exec("set charset utf8");
        } catch ( PDOException $e ) {
            echo  'Connection failed: '  .  $e -> getMessage ();
        }

    }

}