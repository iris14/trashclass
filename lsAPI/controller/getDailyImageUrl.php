<?php
/**
 * Created by PhpStorm.
 * User: qiao
 * Date: 2020/4/27
 * Time: 17:45
 */

/**
 * 获取每日一句的相关信息
 * @param
 * @return  array data  每日一句的相关信息
 */
header("Content-type:text/html; charset=utf-8" );
include '../model/Daily.php';

$Daily = new Daily();
$data = $Daily->getImageUrl();
echo json_encode($data);
?>