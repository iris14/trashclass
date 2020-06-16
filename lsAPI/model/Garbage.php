<?php
/**
 * Created by PhpStorm.
 * User: lolo
 * Date: 2019/11/16
 * Time: 21:31
 */
include "../lib/DataBase.php";
include "../model/Contact.php";

//垃圾类
class Garbage
{
  public $db ;      //作为连接数据库的PDO对象

    /**
     * Garbage constructor.
     * 构造函数自动调用
     * 此时用来连接数据库
     */
    public function __construct()
    {
        $dataBase =new  DataBase();
        $this->db =$dataBase ->db;
    }

    /**
     * 得到热搜的数据
     * @return  array data  四种垃圾类别的各自的前三热搜
     */
    public function  HotSearch(){

        $data = [];
        $data["data"] = [];

//        $sql = "SELECT `gar_name` , `search_num` FROM ls_garbage ORDER BY  `search_num`  DESC LIMIT 0 ,10";
//        $sql = "SELECT `gar_name` , `search_num`,`type_name` FROM ls_garbage g JOIN ls_type t on g.type_id=t.type_id ORDER BY  `search_num`  DESC LIMIT 0 ,10";
//        $sql = "SELECT a.* FROM ls_garbage a LEFT JOIN ls_garbage b ON a.type_id=b.type_id AND a.search_num<b.search_num GROUP BY a.gar_id,a.type_id,a.search_num HAVING COUNT(b.gar_id)<3 ORDER BY a.type_id,a.search_num DESC";

       /* 获取四种垃圾类别的各自的前三热搜 */
        for($i=1;$i<=4;$i++){
           $sql = "SELECT `gar_id`,g.type_id,`gar_name`,`search_num`,`type_name` FROM ls_garbage g JOIN ls_type t on g.type_id=t.type_id WHERE g.type_id='".$i."' order by search_num desc limit 3";
           $sm =  $this ->db -> prepare($sql);
           $sm-> execute();
//           $sm->setFetchMode(PDO::FETCH_ASSOC);    // 设置结果集为关联数组
           /* 通过拼接四次查询得到的结果，拼成json格式，一个结果集占一个大元素，每个结果集中有三个小元素 */
           while($row = $sm ->fetchAll (PDO::FETCH_ASSOC)){
               array_push($data["data"],$row);
           }
       }
        if (!$data["data"] || !$data["data"][0] || !$data["data"][1] || !$data["data"][2] || !$data["data"][3]){
            $data["status"] = "error";
            $data["message"] = "暂无数据！";
            $data["data"] = null;
            return $data;
        }
//        $resList = $sm ->fetchAll (PDO::FETCH_ASSOC);
        $data["status"] = "ok";
        $data["message"] = "请求成功！";
//        $data["data"] = $resList;
        return $data;
    }

    /**
     * 根据输入的垃圾，搜出对应的所有的垃圾
     * @param $garbage
     * @return  array data  模糊查询对应的所有垃圾的垃圾id，垃圾名
     */
    public function SearchGarbage($garbageName){
        $data = [];

        $sql = "select `gar_id`,`gar_name` from ls_garbage WHERE `gar_name` like '%".trim($garbageName)."%'";
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
    /**
     * 根据输入的图像识别名称，搜出对应的垃圾
     * @param $garbage
     * @return  array data  模糊查询对应的所有垃圾的垃圾id，垃圾名
     */
    public function SearchImgGarbage($garbageName){
        $data = [];

        $sql = "select `gar_id`,`gar_name`,`type_id` from ls_garbage WHERE `gar_name` ='".$garbageName."'";
        $sm = $this->db->prepare($sql);
        $sm->execute();
        $resList = $sm ->fetchAll (PDO::FETCH_ASSOC);
        if(!$resList){
            return false;
        }
        $data=$resList[0];

        return $data;
    }


    
    /* 
     * 通过typeid同时显示垃圾类别所对应的类别信息和所有垃圾信息
     * 即和比你上面的ShowAllGarbage函数和下面的ShowTypeMessage函数
     */
    public function ShowTypeAndGarbage($typeid){
		$data = [];
		$data["data"] = [];
		$data["data"]["type"]=[];
        $data["data"]["garbage"]=[];
		$sql = "select `type_name`,`type_introduce`,`throw_requirement`,`img_url` from ls_type where type_id=".$typeid;
		$sm = $this->db->prepare($sql);
    	$sm->execute();
    	if(!$sm){
    		$data["status"]="error";
            $data["message"]="暂无数据";
            $data["data"]=null;
            return $data;
    	}else{
    		$TypeList=$sm->fetchAll(PDO::FETCH_ASSOC);
    		array_push($data["data"]["type"],$TypeList);
            $sql1="select * from ls_garbage where type_id=".$typeid." order by convert(gar_name using gbk) asc ";
    		$sm1=$this->db->prepare($sql1);
	        $sm1->execute();
//	        if(!$sm1){
//	            $data["status"]="error";
//	            $data["message"]="暂无数据";
//	            $data["data"]=null;
//	            return $data;
//	        }else{
                $GarbageList=$sm1->fetchAll(PDO::FETCH_ASSOC);
                $contact=new Contact();
                $contact->user=$GarbageList;
                $GarbageList=$contact->chartSort();
                array_push($data["data"]["garbage"],$GarbageList);
//	        }
    	}
    	$data["status"]="ok";
        $data["message"]="请求成功";
    	return $data;
    }


    //搜索指定的垃圾次数加1
    public function UpdataSearchNum($garbageId){
        $data=[];

        $sql="select `search_num`,`gar_name`,`type_name`,g.type_id,`type_introduce`,`throw_requirement`,`img_url` from ls_garbage g join ls_type t on g.type_id=t.type_id where gar_id=".$garbageId;
        $sm=$this->db->prepare($sql);
        $sm->execute();
        if(!$sm){
            $data["status"]="error";
            $data["message"]="暂无数据";
            $data["data"]=null;
            return $data;
        }
        $result=$sm->fetch(PDO::FETCH_ASSOC);
        $data["status"]="ok";
        $data["message"]="请求成功";
        $data["data"] = $result;

        $searchNum=$result["search_num"];
        $searchNum=$searchNum+1;
        $sql1="update ls_garbage set search_num =' ".$searchNum."'where gar_id=".$garbageId;
        $count=$this->db->exec($sql1);
        if(!$count){
            $data["updateStatus"]="error";
            $data["updateMessage"]="更新失败";
            return $data;
        }
        $data["updateStatus"]="ok";
        $data["updateMessage"]="更新成功";

        return $data;
    }
}