<?php
/**
 * Created by PhpStorm.
 * User: lolo
 * Date: 2019/11/18
 * Time: 23:47
 */

/**
 * 获取垃圾热搜前十
 * @param $garbage
 * @return  array data  垃圾热搜前十的信息
 */
header("Content-type:text/html; charset=utf-8" );
include '../model/Garbage.php';

$garbage = new Garbage();
$data = $garbage->HotSearch();
echo json_encode($data);

?>