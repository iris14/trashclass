<?php
/**
 * Created by PhpStorm.
 * User: lolo
 * Date: 2020/5/18
 * Time: 18:19
 */

include '../model/Cartoon.php';

$topicId=$_REQUEST['topicId'];
//$topicId = 2;
if(!isset($topicId)){
    echo json_encode($data);
    $data["status"]="error";
    $data['message']="无法识别漫画主题id";
    $data['data']=null;
    echo json_encode($data);
}else{
    $cartoon=new Cartoon();
    $data=$cartoon->getCartoon($topicId);
    echo json_encode($data);
}
?>