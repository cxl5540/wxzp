<template>
  <div id="home">
  <yd-flexbox direction="vertical">
    <hometop></hometop>
    <homemiddle></homemiddle>
    <buttom></buttom>
  </yd-flexbox>
  </div>
</template>

<script>
import { Toast} from 'mint-ui';
import hometop from '../components/home/top.vue'
import homemiddle from '../components/home/homemiddle.vue'
import buttom from '../components/home/buttom.vue'
export default {
  name: 'home',
  data () {
          return {
            
          }
        },
  beforeCreate () {
  },
  created () {
    this.get();         //获取用户信息
    this.findResume();
  },
  mounted () {

  },
   methods:{
    get(){         
     let reg = new RegExp("(^|\\?|&)" + 'openId' + "=([^&]*)(\\s|&|$)","i");
      if(reg.test(window.location.href)){
          let openId=unescape(RegExp.$2.replace(/\+/g," "))
            _const.openId=unescape(RegExp.$2.replace(/\+/g," "))
            console.log(openId);
            console.log(_const.openId);
        }else{
            Toast({
                  message: "无openid",
                  duration: 1500
                });
            $('#Loading').css('display','none');
        }
      
      var url=_const.requestUrl+"/v1/user/addUser";
      var data={wx_openid:_const.openId};
        $.post(url,data,function(res){
                let user_id=res.data.user_id
              _const.userId=res.data.user_id
              _const.status =res.data.status;
        });
      return;
      var params = new URLSearchParams();
          params.append('wx_openid',_const.openId);
          alert(2)
            let _this = this
            this.$http.post(_const.requestUrl+"/v1/user/addUser",params).then(function ( res ) {
              let user_id=res.user_id
            _const.userId=res.user_id
            _const.status =res.status
        });
     },
      findResume(){
        var url=_const.requestUrl+'/v1/user/findResume';
        var data={wx_openid:_const.openId};
         $.post(url,data,function(res){
                if(res.data.list){
                 _const.base_id=res.data.list.base_id;
              }
        });
        return;
      let params = new URLSearchParams();
        params.append('wx_openid',_const.openId);
        let _this = this; 
        this.$http.post(_const.requestUrl+'/v1/user/findResume',params).then(function ( res ){
          if(res.list){
             _const.base_id=res.list.base_id;
          }
        
        });

     },
    },
  components: {
    hometop,
    homemiddle,
    buttom
  }
}
</script>
