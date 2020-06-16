<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2020/4/24
 * Time: 12:26
 */

class ImageApi
{
    function request_token($url) {
        if (empty($url)) {
            return false;
        }
        $postUrl = $url;
        $curl = curl_init();//初始化curl
        curl_setopt($curl, CURLOPT_HTTPHEADER, array(
            "Connection: keep-alive",
            "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "content-type: application/json",
            "Upgrade-Insecure-Requests: 1",
            "DNT:1",
            "Accept-Language: zh-CN,zh;q=0.8,en-GB;q=0.6,en;q=0.4,en-US;q=0.2",
        ));
//        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);//要求结果为字符串且输出到屏幕上

//    curl_setopt($curl, CURLOPT_REFERER,"/oauth/2.0/token?grant_type=client_credentials&client_id=tbfUwftjXGofi47YwxCOWZuD&client_secret=YpVkIflhM6ZAPQ7a4lm4QfODp8vYTvut");
        curl_setopt($curl, CURLOPT_ENCODING, "gzip, deflate, br");
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($curl, CURLOPT_TIMEOUT,120);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);//302redirect
        // 针对https的设置
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 2);
        curl_setopt($curl, CURLOPT_URL,$postUrl);//抓取指定网页
        curl_setopt($curl,CURLOPT_USERAGENT,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36');
        $data = curl_exec($curl);//运行curl
        if (!$data) {
            var_dump(curl_getinfo($curl));
            print ('汪汪汪');
            return ;
        }
        return json_decode($data,true);
    }

    function request_post($url = '', $param = '') {
        if (empty($url) || empty($param)) {
            return false;
        }

        $postUrl = $url;
        $curlPost = $param;
        $curl = curl_init();//初始化curl
        curl_setopt($curl, CURLOPT_HEADER, array(
            "Connection: keep-alive",
            "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "content-type: application/json",
            "Upgrade-Insecure-Requests: 1",
            "DNT:1",
            "Accept-Language: zh-CN,zh;q=0.8,en-GB;q=0.6,en;q=0.4,en-US;q=0.2",

        ));//设置header
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);//要求结果为字符串且输出到屏幕上
        curl_setopt($curl, CURLOPT_POST, 1);//post提交方式
        curl_setopt($curl, CURLOPT_POSTFIELDS, $curlPost);
        curl_setopt($curl, CURLOPT_ENCODING, "gzip, deflate, br");
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($curl, CURLOPT_TIMEOUT,120);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);//302redirect
        // 针对https的设置
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 2);
        curl_setopt($curl, CURLOPT_URL,$postUrl);//抓取指定网页
        curl_setopt($curl,CURLOPT_USERAGENT,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36');
        $data = curl_exec($curl);//运行curl
        curl_close($curl);

        return $data;
    }

}