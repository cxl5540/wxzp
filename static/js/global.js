import axios from "axios"

const config = {
   requestUrl:'http://wxzp.cq-p.com.cn:9500',
    testUrl:'http://esb.cq-p.com.cn:7001',
    userId:'',
    openId:'',
    status:'',
    base_id:'',
    user:'',
    baseId:''
}

var bindToGlobal=function(obj, key){
   if (typeof window[key] === 'undefined') {
         window[key] = {};
     }

     for (let i in obj) {
         window[key][i] = obj[i]
     } 
}
bindToGlobal(config,'_const')