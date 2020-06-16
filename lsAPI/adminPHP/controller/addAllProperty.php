<?php

	header("Content-type:text/html; charset=utf-8" );
	include "../model/Sever.php";

	$severType = $_REQUEST["severType"];
	$severName = $_REQUEST["severName"];
	$terrace = $_REQUEST["terrace"];
	$purpose = $_REQUEST["purpose"];
	$severImg = $_REQUEST["severImg"];
//print_r($_FILES);
//	$data = array('status'=>"error",'message'=>"提交失败");
//if(!file_exists("../images")){
//    mkdir("../images");
//}

	if(isset($severType) && isset($severName) && isset($terrace) && isset($purpose) && isset($severImg)){
//		$path = "../images".$severImg["name"];		//移动文件到这个位置(新位置)
//		$isUpload = move_uploaded_file($severImg["tmp_name"],$path);		//将上传的文件移动到新位置
//		if($severImg["name"] == '')
//		{
//			$image = 'moren.jpg';
//		}
//		if($isUpload){
//			$sc_image = "images/".$severImg["name"];
//		}else{
//			$data["status"] = "error";
//		    $data["message"] = "图片上传失败";
//		    $data["data"] = null;
//		}
		$sever = new Sever();
		$data = $sever ->AddAllProperty($severType,$severName,$terrace,$purpose,$sc_image);
		echo json_encode($data);
	}else{
		$data["status"] = "error";
	    $data["message"] = "信息输入不完整";
	    $data["data"] = null;
		echo json_encode($data);
	}


?>