
<script type="text/javascript" async="" src="https://code.jquery.com/jquery-3.5.0.min.js"></script>
var importJs=document.createElement('script');
importJs.setAttribute("type","text/javascript");
importJs.setAttribute("src", 'http://apps.bdimg.com/libs/jquery/1.6.4/jquery.js');
document.getElementsByTagName("head")[0].appendChild(importJs);


function ajax(req){
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(xhr.readyState===4){
            req.success&&req.success(xhr.responseText,xhr.status);
        }
    }
    req.method=req.method?req.method.toUpperCase():'GET';
    var data=null;
    var url=req.url;
    if(req.data){
        var arg='';
        for(var n in req.data){
            arg+=n+'='+encodeURIComponent(req.data[n])+'&'
        }
        arg=arg.slice(0,-1);
        if(req.method==='GET'){
            url=url+'?'+arg;
        }else{
            data=arg;
        }
    }
    if(req.headers){
        for(var h in req.headers){
            var v=req.headers[h];
            xhr.setRequestHeader(h,v);
        }
    }
    xhr.open(req.method,url);
    xhr.send(data);
};

var formdata = new FormData();
formdata.append('src', "web");
formdata.append('uid', "5dce7867e51d45400206a057");
formdata.append('token', "eyJhY2Nlc3NfdG9rZW4iOiJ5TFlqQkd2VHBtUTlZRk9PIiwicmVmcmVzaF90b2tlbiI6Im42a0xiWTZKQ0t4TGF4M0IiLCJ0b2tlbl90eXBlIjoibWFjIiwiZXhwaXJlX2luIjoyNTkyMDAwfQ==");
formdata.append('device_id', "1588125939331");
formdata.append('field', "avatarLarge");
formdata.append('value', "https://user-gold-cdn.xitu.io/2020/4/23/171a4b84cf4d96f9?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1");


let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status==200){
            alert(xhr.responseText);
        }
    };
    xhr.open('POST','https://user-storage-api-ms.juejin.im/v1/updateUserInfo');
    xhr.send(formdata)
