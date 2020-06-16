<?php

include "../lib/DataBase.php";	

class Sever{
	
	public $db;
	
	/* 构造函数 */
	public function __construct(){
		/* 连接数据库 */
		$dataBase = new DataBase();
		$this ->db = $dataBase ->db;
	}
	
	/**
     * 查询服务表中所有记录
     * @param 
     * @return  array data  
     */
	public function ShowAllSever(){
		$data=[];
		
		$sql = "select * from ls_sever";
		$sth = $this ->db ->prepare($sql);
		$sth ->execute();
		$resList = $sth ->fetchAll(PDO::FETCH_ASSOC);
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
     * 添加一条记录
     * @param 
     * @return  array data  
     */
	public function AddAllProperty($severType,$severName,$terrace,$purpose,$severImg){
		$data = [];
		
		$sql = "insert into ls_sever (`sever_type`,`sever_name`,`terrace`,`purpose`,`sever_img`) values('".$severType."','".$severName."','".$terrace."','".$purpose."','".$severImg."')";
		$count = $this ->db ->exec($sql);
		if(!$count){
			$data["status"] = "error";
			$data["message"] = "插入信息失败";
			$data["data"] = null;
			return $data;
		}
		$data["status"] = "ok";
		$data["message"] = "请求成功";
		$data["data"] = null;
		return $data;
	}
	
	/**
     * 删除一条记录
     * @param 
     * @return  array data  
     */
	public function DelSever($severId){
    $data = [];

    $sql = "delete from ls_sever where sever_id = ".$severId;
    $count = $this ->db ->exec($sql);
    if(!$count){
        $data["status"] = "error";
        $data["message"] = "删除记录失败";
        $data["data"] = null;
        return $data;
    }
    $data["status"] = "ok";
    $data["message"] = "请求成功";
    $data["data"] = null;
    return $data;
}
    /**
     * 查看具体记录
     * @param
     * @return  array data
     */
    public function getServerContent($server_id){
        $data=[];
        $sql="select `sever_id`,`sever_type`,`sever_name`,`terrace`,`purpose`,`sever_img` from ls_sever where sever_id=".$server_id;
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

    /**
     * 更新一条记录
     * @param
     * @return  array data
     */
    public function UpdateSever($severId,$severType,$severName,$severImg,$Terrace,$Purpose){
        $data = [];

        $sql = "update ls_sever set sever_type=".$severType.", sever_name=".$severName.",sever_img=".$severImg.",terrace=".$Terrace.",purpose=".$Purpose." where sever_id = ".$severId;
        $count = $this ->db ->exec($sql);
        if(!$count){
            $data["status"] = "error";
            $data["message"] = "更新记录失败";
            $data["data"] = null;
            return $data;
        }
        $data["status"] = "ok";
        $data["message"] = "请求成功";
        $data["data"] = null;
        return $data;
    }

	
}
	
?>