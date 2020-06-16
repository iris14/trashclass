<?php
/**
 * Created by PhpStorm.
 * User: lolo
 * Date: 2020/5/10
 * Time: 16:45
 */

include '../model/Feedback.php';

$openId = $_REQUEST['openId'];		//用户的openid
$title = $_REQUEST['title'];		//反馈标题
$way = $_REQUEST["contactWay"];		//用户的联系方式（仅限qq和电话）
$content = $_REQUEST["content"];		//反馈内容
//$openId = "o_TNc5U5mbvVZn3l-R8PSRAi5tyE";
//$title = "小程序的提示不明显";
//$way = "1604271506@qq.com";
//$content = "拍照识别看了好久才知道是哪个按钮";
if(!isset($openId) || !isset($title) || !isset($way) || !isset($content)){
    $data["status"]="error";
    $data["message"]="用户的openid、反馈标题、联系方式、反馈内容不全";
    echo json_encode($data);
}else{
    $feedback=new Feedback();
    $data=$feedback->insertUserFeedback($openId,$title,$way,$content);
    echo json_encode($data);
}
?>