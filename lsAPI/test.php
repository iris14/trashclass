<?php
require 'QL/QueryList.php';

use QL\QueryList;


//$ql = QueryList::run('Request',[
//    'target' => 'https://pixabay.com/zh/images/search/%E8%87%AA%E7%84%B6/?orientation=horizontal&pagi=2',
//    'Status Code'=>'200',
//    'method' => 'GET',
//    'user-agent'=>'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36',
//    'Upgrade-Insecure-Requests:'=>'1',
//    'referer'=>'https://pixabay.com/zh/images/search/%E8%87%AA%E7%84%B6/?orientation=horizontal',
//    'Referrer Policy'=>'no-referrer-when-downgrade',
//    'Remote Address'=>'104.18.82.97:443'
//]);
////'image'=>array('img','srcset','div.flex-grid>div.search_result>div.item>a')
//$img = $ql->setQuery(
//    array(
//
//        'image'=>array('div.flex-grid:eq(0)','text')
//    )
//)->data;

$page=rand(1,49);
$num=rand(1,35);
$ql=QueryList::run('Request',[
    'target'=>'https://www.colorhub.me/search?tag=%E7%8E%AF%E5%A2%83&ratio=2%3A3&page='.$page,
    'Status Code'=>'200',
    'Romote Address'=>'119.3.11.13:443',
    'method'=>'GET',
    'user-agent'=>'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36',
    'Upgrade-Insecure-Requests:'=>'1',
    'Referrer Policy'=>'no-referrer-when-downgrade'
]);
$img = $ql->setQuery(
    array(
        'image'=>array('img.card-img-top:eq('.$num.')','src','div.jscroll-inner>div.masonry>div.grid-item>div.card>a')
    )
)->data;
$img=json_encode($img);
$simg=substr($img,strpos($img,'"image'));
echo $simg;
echo str_replace('\\','',$simg);
//print_r($img);
//$panduan=false;
////
//while($panduan==false){
//    $keybord=rand(1,4);
//    $page=rand(1,87);
//    $num=rand(1,9);
//    $jz=QueryList::run('Request',[
//        'target'=>'https://www.dujuzi.cn/Home/JuZi/%E7%8E%AF%E5%A2%83-1-'.$page.'.html',
//        'Status Code'=>'200',
//        'Romote Address'=>'49.233.133.235:443',
//        'method'=>'GET',
//        'user-agent'=>'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36',
//        'Upgrade-Insecure-Requests:'=>'1',
//    ]);
//    $sentence= $jz->setQuery(
//        array(
//            'juzi'=>array('a.juzi:eq('.$num.')','title','div.feed-activity-list>div.feed-element.feed-element.well-minren-info'),
//            'zuozhe'=>array('div.juzi-zuozhe:eq('.$num.')','text','div.feed-activity-list>div.feed-element.feed-element.well-minren-info:eq(3)')
//        )
//    )->data;
//    $str=$sentence[0]['juzi'];
//    if(mb_strlen($str,'UTF8')<100){
//        $panduan=true;
//    }
//}
//
//$data=$sentence;
////$data[0]['image']=$img[0]['image'];
////$data= $data[0];
//$data=json_encode($data);
////if(strstr($data,'\r\n')){
////    $data=str_replace('\r\n','',$data);
////}
//echo $data;


//cdn.colorhub.me/Z9fkrtHyxce5h0xjP2uPaubBrJ9FP8MRDJgZwTS5t7I/fill/280/0/ce/0/bG9jYWw6Ly8vNzAv/MWMvNmM3YTVhNmYx/OTIxNjA1ZTZmYzMw/MzI2YTU2NjRhZjAx/MDFiNzAxYy5qcGVn.jpg
//cdn.colorhub.me/pxVDt23HNb57NpmU9nsEX6zFu4l0ER23MHrpPNGGdCo/fill/280/0/ce/0/bG9jYWw6Ly8vMTMv/N2YvZTY5ZjdiZmU0/MGU0YTM5NDMxYWE2/YjBiZDM1NTIwNTM0/YWIxMTM3Zi5qcGVn.jpg