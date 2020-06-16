<?php
/**
 * Created by PhpStorm.
 * User: lolo
 * Date: 2020/1/7
 * Time: 15:55
 */

include "../lib/DataBase.php";

class GarbageType
{
    public $db;

    public function __construct(){
        $database = new DataBase();
        $this->db = $database->db;
    }

    /**
     * 得到四种垃圾类别的名称
     * @return  array data  四种垃圾类别的名称和id
     */
    public function showGarbageType(){
        $data = [];

        $sql = "select type_id,type_name from ls_type limit 0,4";
        $sm = $this->db->prepare($sql);
        $sm->execute();
        $resList = $sm ->fetchAll (PDO::FETCH_ASSOC);
        if(!$resList){
            $data['status'] = "error";
            $data['message'] = "暂无数据";
            $data['data'] = null;
            return $data;
        }
        $data['status'] = "ok";
        $data['message'] = "请求成功！";
        $data['data'] = $resList;
        return $data;
    }
}