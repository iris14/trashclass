<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2020/2/27
 * Time: 20:00
 */
header("Content-type:text/html; charset=utf-8" );
include "../model/Sever.php";

$severId = $_REQUEST["severId"];
$severType = $_REQUEST["severType"];
$severName = $_REQUEST["severName"];
$terrace = $_REQUEST["terrace"];
$purpose = $_REQUEST["purpose"];
$severImg = $_REQUEST["severImg"];

if(isset($severId)&&isset($severName)&&isset($severType)&&isset($severImg)&&isset($terrace)&&isset($purpose)){
    $sever = new Sever();
    $data = $sever -> UpdateSever($severId,$severType,$severName,$severImg,$terrace,$purpose);
    echo json_encode($data);
}else{
    $data["status"] = "error";
    $data["message"] = "删除记录失败！";
    $data["data"] = null;
    echo json_encode($data);
}