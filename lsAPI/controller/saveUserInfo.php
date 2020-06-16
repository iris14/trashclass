<?php
/**
 * Created by PhpStorm.
 * User: lolo
 * Date: 2019/11/19
 * Time: 1:00
 */

/**
 * 保存插入新用户的信息到数据库的表中
 * @param $garbage
 * @return  array data  保存结果
 */
header("Content-type:text/html; charset=utf-8");
include '../model/UserInfo.php';

function getOpenId(){
    $code = $_REQUEST["code"];
    $appid = "wx67de5fc43443c3da";
    $appSecret = "084a276af3e5ddf69405ae863c7939ce";
    $url = 'https://api.weixin.qq.com/sns/jscode2session?appid='.$appid.'&secret='.$appSecret.'&js_code='.$code.'&grant_type=authorization_code';
    $info = file_get_contents($url);        //发送HTTPS请求，获取微信服务器返回的数据（即获取微信服务器返回的网页$url内容）
    $json = json_decode($info);     //对返回的json格式的数据进行解码成php对象
    $arr = get_object_vars($json);      //返回由对象属性组成的关联数组
    return $arr;        //返回处理好的数据
}
$info = getOpenId();
$openid = $info["openid"];      //获取到openid

$nickName = $_REQUEST["nickName"];      //昵称
$avatarUrl = $_REQUEST["avatarUrl"];        //头像地址
$gender = $_REQUEST["gender"];      //性别
$province = $_REQUEST["province"];      //省份
$city = $_REQUEST["city"];      //城市
$country = $_REQUEST["country"];        //国家

$userInfo = new UserInfo();
$data = $userInfo->SaveUserInfo($openid,$nickName,$avatarUrl,$gender,$province,$city,$country);
echo json_encode($data);

?>