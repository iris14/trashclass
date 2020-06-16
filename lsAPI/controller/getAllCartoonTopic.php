<?php
/**
 * Created by PhpStorm.
 * User: lolo
 * Date: 2020/5/18
 * Time: 18:10
 */

include '../model/Cartoon.php';

$cartoon = new Cartoon();
$data = $cartoon->getAllCartoonTopic();
echo json_encode($data);
?>