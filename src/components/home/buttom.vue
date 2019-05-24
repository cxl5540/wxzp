<template>

  <div  class="btn" >
    <!-- <div style='display: flex;justify-content: space-between;text-align: center;display: none;' class="scbtn">
      <div style=" width: 50%"  @click="shcoolIntro">
        <img slot="icon" style="height:1.125rem" src="../../assets/010402.png">
      </div>
      <div style=" width: 50%"  @click="SociologyIntro">
        <img slot="icon" style="height: 1.125rem" src="../../assets/010404.png">
      </div>
    </div> -->
     <div  class="mun">
        <yd-button type="primary" shape="circle" @click.native="shcoolIntro">校园招聘</yd-button>
        <yd-button type="danger" shape="circle"  @click.native="SociologyIntro">社会招聘</yd-button>
        <yd-button type="warning" shape="circle"  @click.native='myresum'>我的简历</yd-button>
        <yd-button type="hollow" shape="circle" style='background:#3786E3;color: #fff'  @click.native='record'>投递记录</yd-button>
    </div>
  </div>
</template>
<script>
  import { MessageBox} from 'mint-ui';
export default {
    data () {
        return {

        }
    },
    created () {},
      mounted () {
  
      },
    methods:{        
        shcoolIntro () {
            this.$router.push("ShcoolList")
          return;
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
                _this.$router.push({path:"/ShcoolList"})
              }
           // this.$router.push("ShcoolList")
        });
      },

        SociologyIntro () {
            this.$router.push("SociologyIntro")
          return;
           var params = new URLSearchParams();
            let _this=this;
            params.append('wx_openid',_const.openId);
             this.$http.post(_const.requestUrl+'/v1/user/findResume',params).then(function ( res ){ 
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
               _this.$router.push("/SociologyIntro")
              }
           //this.$router.push("SociologyIntro")
        });
      },
      myresum(){
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
              }else if(hasResume==true){
                _const.base_id=res.list.base_id;
               _this.$router.push({name: 'Resume',query:{ type:'view'}})
              }
        });
       },
       record(){
         let _this=this;
           var params = new URLSearchParams();
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
              }else if(hasResume==true){
                _this.$router.push({name:'Sendrecord'})
              }
        });
       }
    }
}
</script>
<style scoped lang='less'>
.btn{
  position: absolute;
  bottom: 22px;
  left: 50;
  width: 100%;
  padding-top: 14px;
  border-top: 2px dashed #eee;

}
.scbtn{
   display: -webkit-flex;
}
.mun{
  padding: 16px 0;
  width: 100%;
  display: flex;
  display: -webkit-flex;
  justify-content: space-around;
}
/* .yd-btn{
  margin: 0 8px;
 }  */ 
</style>

