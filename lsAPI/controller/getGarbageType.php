<?php
/**
 * Created by PhpStorm.
 * User: lolo
 * Date: 2019/11/18
 * Time: 23:47
 */
/**
 * 根据前端输入的垃圾，搜出对应的垃圾类别
 * @param $garbage
 * @return  array data  垃圾相应类别的数据
 */
include '../model/Garbage.php';

$garbageName = $_REQUEST['garbageName'];
//$garbageName= '湿纸巾';
if(isset($garbageName)){
    $garbage = new Garbage();
    $data = $garbage->SearchGarbage($garbageName);
}else{      //未输入搜索的垃圾名称时，返回的提示
    $data["status"] = "error";
    $data["message"] = "请输入垃圾名称";
    $data["data"] = null;
}
echo json_encode($data);
?>