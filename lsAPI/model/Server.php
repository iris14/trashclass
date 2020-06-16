<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2020/2/8
 * Time: 15:33
 */

include "../lib/DataBase.php";

class Server
{

    public $db;
    public function __construct()
    {
        $dataBase=new DataBase();
        $this->db=$dataBase->db;
    }

    public function getServerType($server_type){
        $data=[];
        $sql="select * from ls_sever where `sever_type`=".$server_type;
        $sm = $this->db->prepare($sql);
        $sm->execute();
        $resList = $sm ->fetchAll (PDO::FETCH_ASSOC);
            if(!$resList){
                $data["status"] = "error";
                $data["message"] = "暂无数据";
                $data["data"] = null;
                return $data;
            }
            $data["status"] = "ok";
            $data["message"] = "请求成功";
            $data["data"] = $resList;
        return $data;
    }
    public function getServerContent($server_id){
        $data=[];
        $sql="select `sever_id`,`sever_type`,`sever_name`,`purpose`,`sever_img`,`sever_url` from ls_sever where sever_id=".$server_id;
        $sm=$this->db->prepare($sql);
        $sm->execute();
        $resList=$sm->fetchAll(PDO::FETCH_ASSOC);
        if(!$resList){
            $data['status']="error";
            $data["message"]="暂无数据";
            $data["data"]=null;
            return $data;
        }
        $data['status']='ok';
        $data['message']="请求成功";
        $data['data']=$resList;
        return $data;
    }
}