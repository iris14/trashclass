<?php
/**
 * Created by PhpStorm.
 * User: lolo
 * Date: 2020/4/27
 * Time: 17:42
 */

/**
 * 获取剧情测试题的相关信息
 * @param
 * @return  array data  剧情测试题的相关信息
 */
header("Content-type:text/html; charset=utf-8" );
include '../model/PlotTest.php';

$plotId = $_REQUEST['plotId'];
//$plotId = 1;
if(!isset($plotId)){
    $data["status"]="error";
    $data["message"]="无法找到剧情id";
    $data['data']=null;
    echo json_encode($data);
}
$plotTest = new PlotTest();
$data = $plotTest->getPlotTest($plotId);
echo json_encode($data);

?>