<?php
/**
 * Created by PhpStorm.
 * User: lolo
 * Date: 2020/5/10
 * Time: 15:03
 */

include "../lib/DataBase.php";

// 剧情测试类
class Feedback
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
     *  根据前端给的用户open_id，查询用户在数据库中当天的反馈是否超过三条，超过则表示今日已反馈超过三次，明日才能继续反馈（主要是怕恶意反馈）
     */
    public function insertUserFeedback($openId,$title,$way,$content){
        $data = [];
		
		$nowtime = date("Y-m-d");		// 表示当前时间的某年某月某日
		// 查询用户当天的提交反馈次数
        $sql = "select count(*) as num from ls_feedback where open_id = '".$openId."' and feedback_time like '".$nowtime."%'";
        $sm = $this ->db ->prepare($sql);
        $sm ->execute();
        $resList = $sm ->fetchAll(PDO::FETCH_ASSOC);
//      var_dump($resList);
//      $resList[0]["num"];
        if($resList){
        	// 判断用户当天提交的反馈次数是否在0-2次，是则可以插入，不是则不能插入
        	if($resList[0]["num"] >=0 && $resList[0]["num"] <3){
        		$time = date("Y-m-d h:i:sa");
        		$iql = "insert into ls_feedback (`open_id`,`feedback_title`,`contact_way`,`feedback_content`,`feedback_time`) values('".$openId."','".$title."','".$way."','".$content."','".$time."')";
        		$count = $this ->db ->exec($iql);		//插入条数
        		if(!$count){
	                $data["status"] = "error";
	                $data["message"] = "插入反馈信息失败";
	                return $data;
        		}else{
        			$data["status"] = "ok";
	                $data["message"] = "插入反馈信息成功";
	                return $data;
        		}
        	}else{
        		$data["status"] = "over";
                $data["message"] = "用户今日反馈已达三条，明天才能继续反馈";
                return $data;
        	}
        }else{
        	$data["status"] = "error";
            $data["message"] = "暂无数据";
            return $data;
        }
    }
}