<?php
/**
 * Created by PhpStorm.
 * User: lolo
 * Date: 2020/5/18
 * Time: 18:06
 */

include "../lib/DataBase.php";

// 漫画类
class Cartoon
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
     *  得到所有漫画的主题（修饰目录页）
     */
    public function getAllCartoonTopic(){
        $data = [];

        $sql = "select * from ls_cartoon_topic";       // 查询所有剧情测试的名称
        $sm =  $this ->db -> prepare($sql);
        $sm-> execute();
        $resList = $sm ->fetchAll (PDO::FETCH_ASSOC);
        if(!$resList){
            $data["status"] = "error";
        	$data["message"] = "请求失败！";
        	$data["data"] = null;
        	return $data;
        }

        $data["status"] = "ok";
        $data["message"] = "请求成功！";
        $data["data"] = $resList;
        return $data;
    }

    /**
     *  根据前端给的漫画主题id
     *  得到对应漫画主题的所有漫画
     */
    public function getCartoon($topicId){
        $data = [];

        $sql = "select cartoon_id,cartoon_img,c.topic_id,topic_name from ls_cartoon c join ls_cartoon_topic t on c.topic_id = t.topic_id where c.topic_id = ".$topicId;       // 查询对应漫画主题id的所有漫画
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