<?php
/**
 * Created by PhpStorm.
 * User: lolo
 * Date: 2020/1/13
 * Time: 21:34
 */

include '../model/Garbage.php';
/* 把getTypeMessage.php的内容和getAllGarbage.php的内容合并 */
$typeId=$_REQUEST['typeId'];
//$typeId = 2;
if(!isset($typeId)){
    $data["status"]="error";
    $data["message"]="无法找到类别";
    $data['data']=null;
    echo json_encode($data);
}else{
    $garbage=new Garbage();
    $data=$garbage->ShowTypeAndGarbage($typeId);
    echo json_encode($data);
}
?>