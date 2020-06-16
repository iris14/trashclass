<?php
/**
 * Created by PhpStorm.
 * User: lolo
 * Date: 2019/11/19
 * Time: 0:42
 */

include_once '../lib/DataBase.php';

/* 用户信息类 */
class UserInfo
{
    public $db;

    public function __construct()
    {
        $database = new DataBase();
        $this->db = $database->db;
    }

    public function SaveUserInfo($openId,$nickName,$avatarUrl,$gender,$province,$city,$country){
        $data = [];
//        '123','LoLo','http://xxx','女','福建','泉州','中国'
        $sql = "SELECT * FROM ls_user WHERE open_id = '".$openId."' LIMIT 1";      //查询用户表中是否存在此用户
        $sm = $this->db->prepare($sql);
        $sm->execute();
        $resList = $sm ->fetchAll (PDO::FETCH_ASSOC);
        if($resList){       //若用户在表中存在，返回用户数据给前端
            $data["status"] = "ok";
            $data["message"] = "请求成功！！";
            $data["data"] = $resList;
            return $data;
        }else{      //否则，先在表中插入用户信息，再返回用户数据给前端
            $sql = "INSERT INTO ls_user VALUES('".$openId."','".$nickName."','".$avatarUrl."','".$gender."','".$province."','".$city."','".$country."')";
            $count = $this->db->exec($sql);
            if(!$count){
                $data["status"] = "error";
                $data["message"] = "插入用户信息失败";
                $data["data"] = null;
                return $data;
            }
            $sql = "SELECT * FROM ls_user WHERE open_id = '".$openId."' LIMIT 1";      //查询用户表中是否存在此用户（刚插入的）
            $sm = $this->db->prepare($sql);
            $sm->execute();
            $resList = $sm ->fetchAll (PDO::FETCH_ASSOC);
            if(!$resList){
                $data["status"] = "error";
                $data["message"] = "从数据表中获取用户信息失败";
                $data["data"] = null;
                return $data;
            }
        }
        $data["status"] = "ok";
        $data["message"] = "请求成功";
        $data["data"] = $resList;
        return $data;
    }
}