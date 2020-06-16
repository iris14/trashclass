<?php
/**
 * Created by PhpStorm.
 * User: lolo
 * Date: 2020/4/27
 * Time: 15:23
 */

include "../lib/DataBase.php";

// 剧情测试类
class PlotTest
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
     *  得到所有剧情的名称、简介、头像
     */
    public function getPlotNames(){
        $data = [];
//      $data["data"] = [];

//      $sql = "select count(*) as total from ls_plot";     // 计算取出的总数
//      $sm =  $this ->db -> prepare($sql);
//      $sm-> execute();
//      $totalList = $sm ->fetchAll (PDO::FETCH_ASSOC);

        $sql = "select * from ls_plot";       // 查询所有剧情测试的名称
        $sm =  $this ->db -> prepare($sql);
        $sm-> execute();
        $resList = $sm ->fetchAll (PDO::FETCH_ASSOC);
        if(!$resList){
            $data["status"] = "error";
        	$data["message"] = "请求失败！";
        	$data["data"] = null;
        	return $data;
        }

//      $showSize = 4;      // 每次显示4个（一个蝴蝶）
//      $sizeSum = $totalList[0]["total"] / $showSize;       // 计算有多少个蝴蝶
//      for($i=0; $i<$sizeSum; $i++) {      // 循环把每个蝴蝶的数据弄成一个数组，放进一个大数组中
//          $offset = $i * $showSize;
//          $plotList = array_slice($resList, $offset, $showSize);      // 取出四条记录成为一个数组
//          array_push($data["data"], $plotList);       // 将上面的数组，放进大数组 $data["data"] 中
//      }

        $data["status"] = "ok";
        $data["message"] = "请求成功！";
        $data["data"] = $resList;
        return $data;
    }

    /**
     *  得到对应剧情名的所有剧情测试题
     */
    public function getPlotTest($plotId){
        $data = [];

        $sql = "select test_id,test_question,test_answer,science,t.plot_id,plot_name from ls_plot_test t join ls_plot p on t.plot_id = p.plot_id where t.plot_id = ".$plotId;       // 查询对应剧情id的所有剧情测试题
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