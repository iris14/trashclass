<?php
/**
 * Created by PhpStorm.
 * User: lolo
 * Date: 2020/1/7
 * Time: 16:10
 */

/**
 * 显示四种垃圾类别的id和名称
 * @param $garbage
 * @return  array data  四种垃圾类别的id和名称
 */
include "../model/GarbageType.php";

$garbageType = new GarbageType();
$data = $garbageType->showGarbageType();
echo json_encode($data);
?>