var mo=function(e){e.preventDefault();};
function long_time(val,key){
  Date.prototype.format=function(fmt) {
    var o = {
      "M+" : this.getMonth()+1, //月份
      "d+" : this.getDate(), //日
      "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时
      "H+" : this.getHours(), //小时
      "m+" : this.getMinutes(), //分
      "s+" : this.getSeconds(), //秒
      "q+" : Math.floor((this.getMonth()+3)/3), //季度
      "S" : this.getMilliseconds() //毫秒
    };
    var week = {
      "0" : "\u65e5",
      "1" : "\u4e00",
      "2" : "\u4e8c",
      "3" : "\u4e09",
      "4" : "\u56db",
      "5" : "\u4e94",
      "6" : "\u516d"
    };
    if(/(y+)/.test(fmt)){
      fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    if(/(E+)/.test(fmt)){
      fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "\u661f\u671f" : "\u5468") : "")+week[this.getDay()+""]);
    }
    for(var k in o){
      if(new RegExp("("+ k +")").test(fmt)){
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
      }
    }
    return fmt;
  }


  var t=val;
  var d=	new Date();
  d.setTime(t);

  if(key==1){
    var s=d.format('yyyy/MM/dd');
  }else if(key==2){
    var s=d.format('yyyy年 MM月 dd日');
  }else if(key==3){
    var s=d.format('yyyy-MM-dd');
  }else if(key==4){
    var s=d.format('yyyyMMdd');
  }else{
    var s=d.format('yyyy-MM-dd HH:mm:ss');
  }
  return s;
}


function setCookie(c_name,value,expiredays) {
  var exdate=new Date()
  exdate.setDate(exdate.getDate()+expiredays)
  document.cookie=c_name+ "=" +escape(value)+
    ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}

function getCookie(c_name) {
  if (document.cookie.length>0)
  {
    var  c_start=document.cookie.indexOf(c_name + "=")
    if (c_start!=-1)
    {
      c_start=c_start + c_name.length+1
      var c_end=document.cookie.indexOf(";",c_start)
      if (c_end==-1) c_end=document.cookie.length
      return unescape(document.cookie.substring(c_start,c_end))
    }
  }
  return ""
}

function clearCookie(){
  var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
  if (keys) {
    for (var i = keys.length; i--;)
      document.cookie=keys[i]+'=0;expires=' + new Date( 0).toUTCString()
  }
}