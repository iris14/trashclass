<?php
/**
 * Created by PhpStorm.
 * User: 佳佳
 * Date: 2020/1/7
 * Time: 20:01
 */
include '../model/Garbage.php';

$garbageId=$_REQUEST['grabageId'];
//$garbageId = 2;
if(!isset($garbageId)){
    $data["status"]="error";
    $data["message"]="没有获取到$garbageId";
    $data['data']=null;
    echo json_encode($data);
}else{
    $garbage=new Garbage();
    $data=$garbage->UpdataSearchNum($garbageId);
    echo json_encode($data);
}
?>