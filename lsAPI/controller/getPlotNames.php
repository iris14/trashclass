<?php
/**
 * Created by PhpStorm.
 * User: lolo
 * Date: 2020/4/27
 * Time: 16:40
 */

/**
 * 获取剧情测试的所有名称
 * @param
 * @return  array data  剧情测试的所有名称
 */
header("Content-type:text/html; charset=utf-8" );
include '../model/PlotTest.php';

$plotTest = new PlotTest();
$data = $plotTest->getPlotNames();
echo json_encode($data);

?>