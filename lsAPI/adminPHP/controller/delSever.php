<?php
	
	header("Content-type:text/html; charset=utf-8" );
	include "../model/Sever.php";
	
	$severId = $_REQUEST["severId"];
	
	if(isset($severId)){
		$sever = new Sever();
		$data = $sever ->DelSever($severId);
		echo json_encode($data);
	}else{
		$data["status"] = "error";
	    $data["message"] = "删除记录失败！";
	    $data["data"] = null;
		echo json_encode($data);
	}
	
?>