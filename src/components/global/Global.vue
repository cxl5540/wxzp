<template>
  
</template>

<script>

export default {
  data () {
          return {
            wx_openid:'',
            userId:'',
          }
        },
 
  mounted () {
    this.getUserId();
    this.getOpenid();
  },
   methods:{
     getOpenId(){
          var url='http://ph.cq-p.com.cn/HR_WX/index.html?openId=oiRNv5pTPQjIEELGNcS5xuHzxZiw&code=001rQE5L0mTU9628y94L0SIC5L0rQE5a';
            if (url.indexOf("?") != -1) {    
              var str = url.substr(1);
              
             var strs = str.split("=");
             var  a = strs[1].split("&");
             var bb= a.pop();
             var wx_openid= a.join(''); 
              console.log( wx_openid);          
            }         
        } ,

    getUserId () {
          var params = new URLSearchParams();
          params.append('wx_openid', 'fcqgi');
            let _this = this
            this.$http.post("http://192.168.197.58:80/v1/user/addUser",params).then(function ( res ) {
           _this.userId=res.data.data.user_id
        });
      }
    },
  components: {
  
  }
}
</script>
