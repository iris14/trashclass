<?php
/**
 * Created by PhpStorm.
 * User: 佳佳
 * Date: 2020/1/8
 * Time: 15:56
 */

class Contact
{

    public $user;
    /**
     * 将数组按字母A-Z排序
     * @return [type] [description]
     */
    public function chartSort(){
        $user=$this->user;

        foreach ($user as $k => &$v) {
            $v['chart']=$this->getFirstChart( $v['gar_name'] );
        }
        $data=[];
        $data[0]['kind']='null';
        $data[0]['entitys']=[];
       for($i=0;$i<26;$i++){
            $subdata=[];
                $subdata['kind']=chr($i+65);
                $subdata['entitys']=[];
            array_push($data,$subdata);
        }
        foreach ($user as $k => $v) {
                if($v['chart']==null){
                    $data[0]['entitys'][]=$v;
                    continue;
                }
                $data[ord($v['chart'])-64]['entitys'][]=$v;
        }
        for($i=0;$i<count($data);$i++){
            if(empty($data[$i]['entitys'])){
//                unset($data[$i]);
//                array_values($data[$i]);
                array_splice($data,$i,1);
            }
        }
        $i=0;
        while($i<count($data)){
            if(empty($data[$i]['entitys'])){
                array_splice($data,$i,1);
            }else{
                $i++;
            }
        }

        return $data;
    }
    /**
     * 返回取汉字的第一个字的首字母
     * @param  [type] $str [string]
     * @return [type]      [strind]
     */
    public function getFirstChart($s){

        $s0 = mb_substr($s,0,3); //获取名字的姓
        $s = iconv('UTF-8','gb2312', $s0); //将UTF-8转换成GB2312编码*/
        $s2=mb_substr($s0,0,1,'utf-8');
//        return ord($s2);
//dump($s0);
        if (ord($s2)>128) { //汉字开头，汉字没有以U、V开头的
            $asc=ord($s{0})*256+ord($s{1})-65536;
            //A
            if($asc==-3898 or ($asc>=-20319 and $asc<=-20284))return "A";
            //B
            if($asc==-2351 or $asc==-4910 or $asc==-2908 or $asc==-2866 or ($asc>=-20283 and $asc<=-19776)) return "B";
            //C
            if($asc==-3383 or $asc==-8763 or ($asc>=-19775 and $asc<=-19219))return "C";
            //D
            if($asc>=-19218 and $asc<=-18711)return "D";
            //E
            if($asc==-2311 or ($asc>=-18710 and $asc<=-18527))return "E";
            //F
            if($asc==-8532 or $asc==-2844 or ($asc>=-18526 and $asc<=-18240))return "F";
            //G
            if($asc==-5681 or $asc==-5925 or $asc==-2132 or $asc==-8282 or ($asc>=-18239 and $asc<=-17760))return "G";
            //H
            if($asc==-8978 or $asc==-7482 or ($asc>=-17759 and $asc<=-17248))return "H";
            //I
            if($asc>=-17247 and $asc<=-17418)return "I";
            //J
            if($asc==-2326 or $asc==-2824 or $asc==-8966 or $asc==-5671 or $asc==-5210 or ($asc>=-17417 and $asc<=-16475))return "J";
            //K
            if($asc==-3342 or ($asc>=-16474 and $asc<=-16213))return "K";
            //L
            if($asc==-6914 or $asc==-3666 or $asc==-8516 or $asc==-4178 or ($asc>=-16212 and $asc<=-15641))return "L";
            //M
            if($asc==-2135 or $asc==-7512 or $asc==-9004 or $asc==-7195 or ($asc>=-15640 and $asc<=-15166))return "M";
            //N
            if($asc==-3932 or ($asc>=-15165 and $asc<=-14923))return "N";
            //O
            if($asc>=-14922 and $asc<=-14915)return "O";
            //P
            if($asc==-3148 or $asc==-3162 or $asc==-5951 or ($asc>=-14914 and $asc<=-14631))return "P";
            //Q
            if($asc==-9011 or $asc==-8975 or $asc==-3361 or $asc==-3385 or($asc>=-14630 and $asc<=-14150))return "Q";
            //R
            if($asc>=-14149 and $asc<=-14091)return "R";
            //S
            if($asc==-2131 or $asc==-6989 or ( $asc>=-14090 and $asc<=-13319))return "S";
            //T
            if($asc==-65536 or ($asc>=-13318 and $asc<=-12839))return "T";
            //W
            if($asc==-8789 or ($asc>=-12838 and $asc<=-12557))return "W";
            //X
            if($asc==-8519 or ($asc>=-12556 and $asc<=-11848))return "X";
            //Y
            if($asc==-8526 or $asc==-5930 or $asc==-2353 or $asc==-9025 or $asc==-5159 or $asc==-3888 or $asc==-5980 or ($asc>=-11847 and $asc<=-11056))return "Y";
            //Z
            if($asc==-3153 or $asc==-5927 or $asc==-2859 or $asc==-5701 or $asc==-2910 or ($asc>=-11055 and $asc<=-10247))return "Z";
        }
        else if(ord($s2)>=48 and ord($s2)<=57){ //数字开头
            switch($s2){
                case '1':return "Y";
                case '2':return "E";
                case '3':return "S";
                case '4':return "S";
                case '5':return "W";
                case '6':return "L";
                case '7':return "Q";
                case '8':return "B";
                case '9':return "J";
                case '0':return "L";
            }
        }else if(ord($s2)>=65 and ord($s2)<=90){ //大写英文开头
            return $s2;
        }else if(ord($s2)>=97 and ord($s2)<=122){ //小写英文开头
            return strtoupper($s2);
        }
        else
        {
            return $s2;
//中英混合的词语，不适合上面的各种情况，因此直接提取首个字符即可
        }

    }
    /**
     * 格式化打印函数
     * @param  [type] $str [description]
     * @return [type]      [description]
     */
    /*public function p($str){
        echo '<pre>';
        print_r($str);
        echo '</pre>';
    }*/

}
