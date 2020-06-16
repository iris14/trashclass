<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2020/4/24
 * Time: 11:05
 */

require_once '../model/ImageApi.php';
require_once '../model/Garbage.php';

$imageApi=new ImageApi();

// 你的 APPID AK SK
const APP_ID = '19580675';
const API_KEY = 'tbfUwftjXGofi47YwxCOWZuD';
const SECRET_KEY = 'YpVkIflhM6ZAPQ7a4lm4QfODp8vYTvut';

$url = 'https://aip.baidubce.com/oauth/2.0/token?';
$post_data['grant_type'] = 'client_credentials';
$post_data['client_id'] = 'tbfUwftjXGofi47YwxCOWZuD';
$post_data['client_secret'] = 'YpVkIflhM6ZAPQ7a4lm4QfODp8vYTvut';
$o = "";
foreach ( $post_data as $k => $v )
{
    $o.= "$k=" . urlencode( $v ). "&" ;
}
$post_data = substr($o,0,-1);
$url=$url.$post_data;
$recieve = $imageApi->request_token($url);

//var_dump($recieve);


$token = $recieve['access_token'];
$url = 'https://aip.baidubce.com/rest/2.0/image-classify/v2/advanced_general?access_token=' . $token;

$img = $_REQUEST['img'];
//print_r($img.'<br>');
//echo gettype($img);
$bodys = array(
    'image' => $img
);

$res = $imageApi->request_post($url, $bodys);
$res=strstr($res,'{');
$res=json_decode($res,true);
$typeid=array(1=>'易腐垃圾',2=>'其他垃圾',3=>'可回收垃圾',4=>'有害垃圾',5=>'不属于日常生活垃圾');
if(isset($res['error_code'])){
    $data['status']='error';
    $data['message']="信息有误";
    $data['data']=null;
}else{
    $data['status']='ok';
    $data['message']="成功";
    $res=$res['result'];
    $max=0;
    $garbageType=new Garbage();
    for ($i=0;$i<count($res);$i++){
        $type=$garbageType->SearchImgGarbage($res[(int)$i]['keyword']);
        if($type!=false){
            $res[(int)$i]['typeid']=$type['type_id'];
            $res[(int)$i]['typename']=$typeid[(int)$type['type_id']];
        }else{
            $res[(int)$i]['typeid']=null;
            $res[(int)$i]['typename']=null;
        }
    }
    $data['data']=$res;
}

//var_dump($data);
echo json_encode($data);


