<template>
  <div>
   <div id="Loading">
      <div class="loader-inner ball-beat">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div id="app">
     <transition :name="transitionName" >
        <router-view class="child-view" ></router-view>
     </transition>
    </div>
  </div>
</template>
<script>
  import  '../static/js/global.js'
  import { Indicator,Toast } from 'mint-ui';
export default {
    name: 'app',
    data () {
    return {
      userId:'',
      transitionName:'slide-left',
      wxAccessUrl:'http://salwucenter.doufushop.com/weChat/weChatOauth2Controller/shareRedirect?',
      parameterBefore: 'state=0_0_0_xiaofeishang_',
      stateParameter:'test_',//分享地址
    }
  },
  watch: {
    '$route' (to, from) {
      let isBack = eval(sessionStorage.isBack)
      if (isBack) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = '  slide-left'
      }
      sessionStorage.isBack = false
    }
  },
    beforeCreate () {
  
    },
    created () {
     /* this.getUserId();*/
    /* this.isWeiXin();*/

    },
    mounted () {

      /*_const.getUserId();*/
 this.signAjax();
     
    },
    methods:{
      isWeiXin() {
        let ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == 'micromessenger') {
          return true;
        } else {
          return false;
        }
      },
  signAjax() {    //签名   
    Indicator.open({   //打开loading
            spinnerType: 'fading-circle'
        });
        var _this = this;
        var urlx1 =window.location.href.split('#')[0]
        console.log(urlx1)
        var url = _const.requestUrl+'/v1/jssdk/getWxConfig';
        var data = {
          url:urlx1,
        }
        $.post(url,data,function(response){
          var responseData = response.data.list;
            Indicator.close();
         wx.config({
          debug: false,
          appId: responseData.appId,
          timestamp: responseData.timestamp,
          nonceStr: responseData.nonceStr,
          signature: responseData.signature,
          jsApiList: [
            'onMenuShareAppMessage','onMenuShareTimeline','hideAllNonBaseMenuItem','hideMenuItems','hideOptionMenu','showOptionMenu','showMenuItems'
          ]
        });
     wx.hideOptionMenu();
     wx.ready(function() {

        wx.showMenuItems({
          menuList:[
                 'menuItem:share:appMessage',
                'menuItem:share:timeline',]
        });
          wx.onMenuShareTimeline({
            title: '重药招聘', // 分享标题
            link: 'http://ph.cq-p.com.cn/HR_WX/wx.php', // 分享链接'
            success: function() {
        
            },
            cancel: function() {
          
            }
          });
          //分享给朋友
          wx.onMenuShareAppMessage({
            title: '重药招聘', // 分享标题
            desc: '重药招聘信息', // 分享描述
            link:'http://ph.cq-p.com.cn/HR_WX/wx.php', // 分享链接'
            success: function() {
            },
            cancel: function() {
            }
          });

        });
        wx.error(function(res) {
          console.log(res)
        });
        }).error(function() { Toast("验签失败"); Indicator.close();});
      }

    }
}
</script>
<style>
  #Loading {
    top:50%;
    left:50%;
    position: absolute;
    -webkit-transform: translateY(-50%) translateX(-50%);
    transform: translateY(-50%) translateX(-50%);
    z-index: 100;
    display: none;
  }
  @-webkit-keyframes  ball-beat{
    50%{
      opacity: 0.2;
      -webkit-transform: scale(0.75);
      transform: scale(0.75);
    }
    100%{
      opacity: 1;
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }
  @keyframes ball-beat {
    50%{
      opacity: 0.2;
      -webkit-transform: scale(0.75);
      transform: scale(0.75);
    }
    100%{
      opacity: 1;
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }
  .ball-beat > div {
    background-color: #279fcf;
    width: 10px;
    height: 10px;
    border-radius: 100% !important;
    margin: 2px;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    display: inline-block;
    -webkit-animation: ball-beat 0.7s infinite linear;
    animation: ball-beat 0.7s infinite linear;
  }
  .ball-beat > div:nth-child(2n-1){
    -webkit-animation-delay: 0.35s !important;
    animation-delay: 0.35s !important;
  }
  .mint-indicator-wrapper{
    z-index: 99999!important;
  }
  .mint-indicator{
    /* display: none; */ 
  }
  .child-view {
    transition:all .4s ease;
    position: absolute;
    width: 100%;

  }
  .slide-left-enter,.slide-right-leave-active {
    opacity:0;
    -webkit-transform:translate(100%,0);
    transform:translate(100%,0);

  }
  .slide-left-leave-active,.slide-right-enter {
    opacity:0;
    -webkit-transform:translate(-100%,0);
    transform:translate(-100%,0);

  }
  .fa-angle-left{

    font-size: 20px;
  }
  .mint-cell{
  min-height: 60px !important;
}
.mint-cell-swipe-button{
  line-height: 58px !important;
}
.del{
  display: none;
}
.reload{
  display: none;
}
@media screen and (min-width:447px){
    ._v-container{
      display: none;
    }
    .mint-cell{
       min-height: 74px !important;
       padding-bottom: 10px;
       border-bottom: 1px solid #eee;
    }
    .yd-cell-item{
      border-bottom: 1px solid #eee;
    }
    .del{
      display: block !important;
    }
    .pclist{
      display: block  !important;
    }
    .reload{
      display: block;
    }
    .relodyd{
      display: none;
    }
    .yd-grids-3 a{
      display: inline-block;
      border: 1px solid #eee;
    }
    .schooldetailfooter{
      position: absolute;
      bottom: 0;
      width: 100%;
    }
}
</style>