<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2020/2/27
 * Time: 15:41
 */
header("Content-type:text/html; charset=utf-8" );
include "../model/Sever.php";
$severImg = $_FILES['file'];

if(isset($_REQUEST['edit'])==true&&isset($_REQUEST['src'])){
    unlink($_REQUEST['src']);
}
if(!file_exists("../images")){
    mkdir("../images");
}
$path = "../view/img/".$severImg["name"];		//移动文件到这个位置(新位置)
$isUpload = move_uploaded_file($severImg["tmp_name"],$path);		//将上传的文件移动到新位置
if($severImg["name"] == '')
{
    $image = 'moren.jpg';
}
if($isUpload) {
    $sc_image = "img/" . $severImg["name"];
    $data["status"] = "ok";
    $data["message"] = "图片上传成功";
    $data["data"] = $sc_image;
}else{
        $data["status"] = "error";
        $data["message"] = "图片上传失败";
        $data["data"] = null;
    }
    echo json_encode($data);