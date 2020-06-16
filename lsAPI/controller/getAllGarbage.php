<?php
/**
 * Created by PhpStorm.
 * User: 佳佳
 * Date: 2020/1/7
 * Time: 16:03
 */

include '../model/Garbage.php';

$typeId=$_REQUEST['typeId'];
//$typeId = 2;
if(!isset($typeId)){
    $data["typeStatus"]="error";
    $data['typeMessage']="无法识别垃圾类别";
    $data['typeData']=null;
    echo json_encode($data);
}else{
    $garbage=new Garbage();
    $data=$garbage->ShowAllGarbage($typeId);
    echo json_encode($data);
}
?>