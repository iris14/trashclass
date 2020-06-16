<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2020/1/31
 * Time: 14:19
 */

require '../QL/QueryList.php';

use QL\QueryList;

class Spider
{
    private $page,$num;
    private $ql,$jz,$img,$sentence;
    public $data;


    public function GetPhotoSentence(){
        $keynum=rand(1,5);
        $sentence=null;
        if($keynum==1){
            $sentence=$this->getEvironmentSentence();
        }
        if($keynum==2){
            $sentence=$this->getNatureSentence();
        }
        if($keynum==3){
            $sentence=$this->getEarthSentence();
        }
        if($keynum==4){
            $sentence=$this->getGreenSentence();
        }
        if($keynum==5){
            $sentence=$this->getQingShanSentence();
        }
        $photonum=rand(1,2);
        $img=null;
        $img=$this->getColorhubPhonto();
        if($photonum==1){
            $img=$this->getBurstPhoto();
        }
        if($photonum==2){
            $img=$this->getColorhubPhonto();
        }
        $data['status']='ok';
        $data['message']='请求成功';
        $data1=$sentence;
        $data1[0]['image']=$img[0]['image'];
        $data['data']= $data1[0];
        $data=json_encode($data);
        if(strstr($data,'\r\n')){
            $data=str_replace('\r\n','',$data);
        }
        if($photonum==2){
            $simg=substr($data,strpos($data,'"image'));
            $rimg=str_replace('\\','',$simg);
            $data=str_replace($simg,$rimg,$data);
        }
        return $data;
//        return $data;
    }

    public function getEvironmentSentence(){
    $panduan=false;
    while($panduan==false){
        $page=rand(1,87);
        $num=rand(1,9);
        $jz=QueryList::run('Request',[
            'target'=>'https://www.dujuzi.cn/Home/JuZi/%E7%8E%AF%E5%A2%83-1-'.$page.'.html',
            'Status Code'=>'200',
            'Romote Address'=>'49.233.133.235:443',
            'method'=>'GET',
            'user-agent'=>'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36',
            'Upgrade-Insecure-Requests:'=>'1',
        ]);
        $sentence= $jz->setQuery(
            array(
                'juzi'=>array('a.juzi:eq('.$num.')','title','div.feed-activity-list>div.feed-element.feed-element.well-minren-info'),
                'zuozhe'=>array('div.juzi-zuozhe:eq('.$num.')','text','div.feed-activity-list>div.feed-element.feed-element.well-minren-info:eq(3)')
            )
        )->data;
        $str=$sentence[0]['juzi'];
        if(mb_strlen($str,'UTF8')<120){
            $panduan=true;
        }
    }
    return $sentence;
    }
    public function getNatureSentence(){
        $panduan=false;
        while($panduan==false){
            $page=rand(1,323);
            $num=rand(1,9);
            $jz=QueryList::run('Request',[
                'target'=>'https://www.dujuzi.cn/Home/JuZi/%E8%87%AA%E7%84%B6-1-'.$page.'.html',
                'Status Code'=>'200',
                'Romote Address'=>'49.233.133.235:443',
                'method'=>'GET',
                'user-agent'=>'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36',
                'Upgrade-Insecure-Requests:'=>'1',
            ]);
            $sentence= $jz->setQuery(
                array(
                    'juzi'=>array('a.juzi:eq('.$num.')','title','div.feed-activity-list>div.feed-element.feed-element.well-minren-info'),
                    'zuozhe'=>array('div.juzi-zuozhe:eq('.$num.')','text','div.feed-activity-list>div.feed-element.feed-element.well-minren-info:eq(3)')
                )
            )->data;
            $str=$sentence[0]['juzi'];
            if(mb_strlen($str,'UTF8')<120){
                $panduan=true;
            }
        }
        return $sentence;
    }
    public function getEarthSentence(){
        $panduan=false;
        while($panduan==false){
            $page=rand(1,88);
            $num=rand(1,9);
            $jz=QueryList::run('Request',[
                'target'=>'https://www.dujuzi.cn/Home/JuZi/%E5%9C%B0%E7%90%83-1-'.$page.'.html',
                'Status Code'=>'200',
                'Romote Address'=>'49.233.133.235:443',
                'method'=>'GET',
                'user-agent'=>'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36',
                'Upgrade-Insecure-Requests:'=>'1',
            ]);
            $sentence= $jz->setQuery(
                array(
                    'juzi'=>array('a.juzi:eq('.$num.')','title','div.feed-activity-list>div.feed-element.feed-element.well-minren-info'),
                    'zuozhe'=>array('div.juzi-zuozhe:eq('.$num.')','text','div.feed-activity-list>div.feed-element.feed-element.well-minren-info:eq(3)')
                )
            )->data;
            $str=$sentence[0]['juzi'];
            if(mb_strlen($str,'UTF8')<120){
                $panduan=true;
            }
        }
        return $sentence;
    }
    public function getGreenSentence(){
        $panduan=false;
        while($panduan==false){
            $page=rand(1,22);
            $num=rand(1,9);
            $jz=QueryList::run('Request',[
                'target'=>'https://www.dujuzi.cn/Home/JuZi/%E7%BB%BF%E8%89%B2-1-'.$page.'.html',
                'Status Code'=>'200',
                'Romote Address'=>'49.233.133.235:443',
                'method'=>'GET',
                'user-agent'=>'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36',
                'Upgrade-Insecure-Requests:'=>'1',
            ]);
            $sentence= $jz->setQuery(
                array(
                    'juzi'=>array('a.juzi:eq('.$num.')','title','div.feed-activity-list>div.feed-element.feed-element.well-minren-info'),
                    'zuozhe'=>array('div.juzi-zuozhe:eq('.$num.')','text','div.feed-activity-list>div.feed-element.feed-element.well-minren-info:eq(3)')
                )
            )->data;
            $str=$sentence[0]['juzi'];
            if(mb_strlen($str,'UTF8')<120){
                $panduan=true;
            }
        }
        return $sentence;
    }
    public function getQingShanSentence(){
        $panduan=false;
        while($panduan==false){
            $page=rand(1,20);
            $num=rand(1,9);
            $jz=QueryList::run('Request',[
                'target'=>'https://www.dujuzi.cn/Home/JuZi/%E9%9D%92%E5%B1%B1-1-'.$page.'.html',
                'Status Code'=>'200',
                'Romote Address'=>'49.233.133.235:443',
                'method'=>'GET',
                'user-agent'=>'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36',
                'Upgrade-Insecure-Requests:'=>'1',
            ]);
            $sentence= $jz->setQuery(
                array(
                    'juzi'=>array('a.juzi:eq('.$num.')','title','div.feed-activity-list>div.feed-element.feed-element.well-minren-info'),
                    'zuozhe'=>array('div.juzi-zuozhe:eq('.$num.')','text','div.feed-activity-list>div.feed-element.feed-element.well-minren-info:eq(3)')
                )
            )->data;
            $str=$sentence[0]['juzi'];
            if(mb_strlen($str,'UTF8')<120){
                $panduan=true;
            }
        }
        return $sentence;
    }
    public function getColorhubPhonto(){
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
        return $img;
    }
    public function getBurstPhoto(){
        $page=rand(1,33);
        $num=rand(1,30);
        $ql = QueryList::run('Request',[
            'target' => 'https://burst.shopify.com/photos/search?q=nature',
            'Status Code'=>'200',
            'method' => 'GET',
            'user-agent'=>'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36',
            'Upgrade-Insecure-Requests:'=>'1',
            'params'=>['page'=>$page,'q'=>'nature','utf8'=>'%E2%9C%93']
        ]);

        $img = $ql->setQuery(
            array(
                'image'=>array('img:eq('.$num.')','data-srcset','div.grid__item--desktop-up-third>div.photo-tile>a.photo-tile__image-wrapper>div.ratio-box')
            )
        )->data;
        return $img;
    }
}