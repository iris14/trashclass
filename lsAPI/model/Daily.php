<?php
/**
 * Created by PhpStorm.
 * User: qiao
 * Date: 2020/5/8
 * Time: 15:23
 */

include "../lib/DataBase.php";

// 每日一句类
class Daily
{
    public $db;     // 连接数据库的 PDO 对象

    /**
     * PlotTest constructor.
     * @param
     */
    public function __construct()
    {
        $dataBase = new DataBase();
        $this->db = $dataBase->db;
    }
    
    
    /**
     *  随机得到数据库中的图片
     */
    public function getImageUrl(){
        $data = [];
        $imageIdMax = 0;
        
        $sql2 = "SELECT MAX(imageId) as imageIdMax FROM ls_daily";       // 得到每日一句数据库中imageId的最大值
        $sm2 =  $this ->db -> prepare($sql2);
        $sm2-> execute();
        $resList2 = $sm2 ->fetchAll (PDO::FETCH_ASSOC);
        if(!$resList2){
            $imageIdMax = 0;
        }else{
        	$imageIdMax = $resList2[0]["imageIdMax"];
        }
        
//      var_dump ($resList2);
//      echo $imageIdMax;
        if($imageIdMax){
        	$imageId =  rand(1, $imageIdMax) ;       	
        }else{
        	$data["status"] = "error";
            $data["message"] = "暂无数据";
            $data["data"] = null;
            return $data;
        }
        
        $sql = "SELECT * FROM ls_daily where imageId = ".$imageId;       // 查询对应图片id的绝对路径图片地址
        $sm =  $this ->db -> prepare($sql);
        $sm-> execute();
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
}