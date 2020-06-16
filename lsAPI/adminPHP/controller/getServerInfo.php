<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2020/2/8
 * Time: 15:48
 */
include "../model/Sever.php";

$server_id=$_REQUEST['server_id'];

if(isset($server_id)){
    $server=new Sever();
    $data=$server->getServerContent($server_id);
}else{
    $data["status"] = "error";
    $data["message"] = "请输入服务id";
    $data["data"] = null;
}
echo json_encode($data);