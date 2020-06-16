<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2020/1/31
 * Time: 14:23
 */

include '../model/Spider.php';

$phosen=new Spider();
$data=$phosen->GetPhotoSentence();
echo $data;