<template>
<div>
   <transition name="fade">
  <div v-if="graed.rightModel"  style=" position: absolute; z-index: 999;right: 0; height: 100%; width: 70%; background-color: #5CB85C;"  >
    <div  style="height:30% ">
      <div style="width: 94%;padding-top: 10px;text-align: right;">
        <div @click="close">
        <yd-icon name="error-outline" color="#FFF"></yd-icon>
        </div>
      </div>
        <div class="circle">
          <img style='width: 100%;' src="../../assets/icon/toux1@3x.png" alt="">
          <img :src="src">        
      </div> 
       <div class="circle" @click='header' style="display: none">
           <!-- <img style='width: 100%;' src="../../assets/icon/toux1@3x.png" alt=""> -->
           <img  style='width: 100%;height: 100%;" '  :src='avatar' alt="" >       
       </div>
    </div>
<div style="width: 100%;text-align: center;margin: 15px 0 50px;font-size: 18px;color: #fff">{{name}}</div>
    <div style=" width: 100%;">
   
      <div class="my_resum" style="width: 100%;padding-top: 15px"  @click='Judge'>
        <div class="title_list">
          <div style="display: flex;" class="anbtn">
            <div style="width: 18px">
              <img style='width: 100%;' src="../../assets/icon/wodjl@3x.png" alt="">
            </div>
            <span style="font-size:15px; color: #FFFFFF;padding-left: 5px">我的简历</span>
         </div>
        <i class="fa fa-angle-right" style="font-size: 20px;color: #fff"></i>
        </div>
      </div>
      <div class="send_resum" style="width: 100%;padding-top: 15px"  @click='sendRecord'>
        <div class="title_list">
          <div style="display: flex;" class="anbtn">
            <div style="width: 15px">
              <img style='width: 100%;' src="../../assets/icon/toudjl@3x.png" alt="">
            </div>
            <span style="font-size:15px; color: #FFFFFF;padding-left: 8px">投递记录</span>
         </div>
        <i class="fa fa-angle-right" style="font-size: 20px;color: #fff"></i>
        </div>
      </div>
    </div>
  </div>
      </transition>
  <div style="padding-top: 0.8rem;position: absolute;right: 1rem;">
    <div style="width: 20%; float: left">&nbsp;</div>
    <div style="width: 20%; float: left">&nbsp;</div>
    <div style="width: 20%; float: left">&nbsp;</div>
    <div style="width: 20%; float: left">&nbsp;</div>
    <div style="width: 20%; float: left;display: none;"  @click="ucenter">
       <yd-icon name="ucenter" color="#2ABB4F" size=".8rem"></yd-icon>
       <span></span>
       <span></span> 
    </div>
  </div>
  <!-- <div style="position: absolute; left: .5rem;top:1.2rem">
    <img src="../../assets/0106.png">
  </div> -->
 <input @change="fileChange($event)" type="file" id="upload_file" multiple style="display: none"/> 
</div>
</template>

<script>
import { MessageBox} from 'mint-ui';
export default {
    data () {
      return{
        graed:{
            rightModel:false,
            hasResume:'',
           
        },
         name:'',
         src:'',
         avatar:''
      }
    },
    created () {},
    mounted () {
   
    },
    methods: {
      Judge:function (){                                //我的简历
        $('.my_resum').css('background','#8DCD8D');
        $('.send_resum').css('background','');
                   //查找是否有简历
        console.log(_const.openId); 
        var params = new URLSearchParams();
        let _this=this;
        params.append('wx_openid',_const.openId);
         this.$http.post(_const.requestUrl+'/v1/user/findResume',params).then(function ( res ){ 
          console.log(res);
         let hasResume = res.status;
              console.log(hasResume);     
           if(hasResume==false){
                 MessageBox.confirm('', {
                  message: '您还没有简历,是否立即创建',
                  title: '提示',
                  showConfirmButton:true,
                  showCancelButton:true,
                  closeOnClickModal: false,
                  cancelButtonClass:'cancelButton',
                  confirmButtonClass:'confirmButton',
                  confirmButtonText:'立即创建',
                  cancelButtonText:'取消'
                }).then(action => {
                  if (action == 'confirm') {
                     _this.$router.push({path: '/baseInformation'})
                  }
                }).catch(err => {
                  if (err == 'cancel') {
                  }
                });
                /*_this.$router.push({path: '/baseInformation'})*/
              }else if(hasResume==true){
               /* _this.$router.push({path: '/Resume/view'})*/
               _const.base_id=res.list.base_id;
               _this.$router.push({name: 'Resume',query:{ type:'view'}})
              }
        });

                                               
    },
      sendRecord:function(){                         //投递记录
          $('.my_resum').css('background','');
          $('.send_resum').css('background','#8DCD8D');
           var params = new URLSearchParams();
        let _this=this;
        params.append('wx_openid',_const.openId);
         this.$http.post(_const.requestUrl+'/v1/user/findResume',params).then(function ( res ){ 
          console.log(res);
         let hasResume = res.status;
              console.log(hasResume);     
           if(hasResume==false){
                 MessageBox.confirm('', {
                  message: '您还没有简历,是否立即创建',
                  title: '提示',
                  showConfirmButton:true,
                  showCancelButton:true,
                  closeOnClickModal: false,
                  cancelButtonClass:'cancelButton',
                  confirmButtonClass:'confirmButton',
                  confirmButtonText:'立即创建',
                  cancelButtonText:'取消'
                }).then(action => {
                  if (action == 'confirm') {
                     _this.$router.push({path: '/baseInformation'})
                  }
                }).catch(err => {
                  if (err == 'cancel') {
                  }
                });
                /*_this.$router.push({path: '/baseInformation'})*/
              }else if(hasResume==true){
                _this.$router.push({name:'Sendrecord'})
              }
        });
         /* this.$router.push({name:'Sendrecord'})*/
      },
        ucenter () {
              var paramsu = new URLSearchParams();
                  paramsu.append('wx_openid',_const.openId);              
                    this.$http.post(_const.requestUrl+"/v1/user/addUser",paramsu).then(function ( res ) {
                    _const.userId=res.user_id
                    console.log(_const.userId)
                });        
           this.graed.rightModel = true;
            var params = new URLSearchParams();
              let _this=this;
              params.append('wx_openid',_const.openId);
               this.$http.post(_const.requestUrl+'/v1/user/findResume',params).then(function ( res ){
               console.log(res); 
                  if(res.list==null){
                    _this.name='游客'
                  }else{
                    _this.name=res.list.name;
                  }
               });
            
        },
        close () {
            this.graed.rightModel = false
        },
       header(){
        console.log(1);
         document.getElementById('upload_file').click();
       },
        fileChange(e){                     //上传照片
           var that=this;
            var file = e.target.files[0];
            var imgSize=file.size/1024;
            if(imgSize>200){
                alert('请上传大小不要超过200KB的图片')
            }else{
                var reader = new FileReader();
                reader.readAsDataURL(file); // 读出 base64
                reader.onloadend = function () {
                    // 图片的 base64 格式, 可以直接当成 img 的 src 属性值        
                    var dataURL = reader.result;
                    that.avatar=dataURL;
                    alert(dataURL);
                    // 下面逻辑处理
                    return;
                    $.ajax({
                        type:"post",
                        url:"/v1/userSet",
                        async:true,
                        data:{
                            avatar:dataURL,
                            avatar_wx:1,
                            token:token,
                            uid:uid,
                        },
                        success:function(e){
                            that.avatar=dataURL;
                            alert('修改成功');
                            $(".tsk").show().delay(1500).hide(0);
                        }
                    });
                };                                                             
          }
      }
    }
}
</script>
<style >
  .circle{
       /* width:3rem;
       height:3rem;
       background-color:#8DCD8D;
       border-radius:50%;
       -moz-border-radius:50%;
       -webkit-border-radius:50%;
       position: absolute;
       top:1.5rem; */
       width: 125px;
       height: 125px;
       margin: auto;
       border: 4px solid #8DCD8D;
        -moz-border-radius:50%;
       -webkit-border-radius:50%;
       overflow: hidden;
     }
  .circleInsert{
    width:2.8rem;
    height:2.8rem;
    background-color:#FFF;
    border-radius:50%;
    -moz-border-radius:50%;
    -webkit-border-radius:50%;
    position: absolute;
    padding: .2rem;
    top:.1rem;
    left:.1rem;
  }
  .line::after {
    height: 1px;
    position: absolute;
    z-index: 1;
    bottom: 0;
    left: 0;
    content: "";
    width: 100%;
    background-image: -webkit-linear-gradient(bottom,#e4e4e4 50%,transparent 0);
    background-image: linear-gradient(0deg,#e4e4e4 50%,transparent 0);
  }
  .anbtn{
     display: -webkit-flex;
  }
  .title_list{
     display: flex;
      display: -webkit-flex;
     justify-content: space-between;
     margin: 0px 15px 0px 26px;
     padding-bottom: 15px;
     border-bottom:#8DCD8D solid 1px;
  }
  .mint-msgbox{
    font-size: 14px;
  }
   .fade-enter-active, .fade-leave-active{
    transition: opacity 1s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0
  }

  .fade-enter-to, .fade-leave {
    opacity: 1;
  }
#animat{
   position: relative;
       }
        @keyframes living {
            0%{
                transform: scale(1);
                opacity: 0.5;  
            }
            50%{
                transform: scale(1.5);  
                opacity: 0;   /*圆形放大的同时，透明度逐渐减小为0*/

            }
            100%{
                transform: scale(1);
                opacity: 0.5;
            }
        }
        #animat span{
           position: absolute;
           top: 3px;
           left: 2px;
          display: inline-block;
            width: 30px;
            height: 30px;
            background:#04be02;
            border-radius: 50%;
            -webkit-animation: living 3s linear infinite;
            z-index: 99;
        }
        #animat span:nth-child(3){
            -webkit-animation-delay: 1.5s; /*第二个span动画延迟1.5秒*/
        }
</style>

