<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2020/2/8
 * Time: 16:13
 */
include "../model/Server.php";

$server_type=$_REQUEST['server_type'];

if(isset($server_type)){
    $server=new Server();
    $data=$server->getServerType($server_type);
}else{
    $data["status"] = "error";
    $data["message"] = "请输入服务类别";
    $data["data"] = null;
}
echo json_encode($data);