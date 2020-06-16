<?php
	
	header("Content-type:text/html; charset=utf-8" );
	include "../model/Sever.php";
	
	$sever = new Sever();
	$data = $sever ->ShowAllSever();
	echo json_encode($data);
?>