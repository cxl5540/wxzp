<template>
    <div class="schooldetailfooter">
       
            <!-- <div style="background:#5cb85c;width: 100%">
                <router-link :to="{path:'Resume/',query:{type:'apply',job_id:this.msg,fid:this.fidd,ty:this.cls}}" slot="left">
                    <yd-icon name="download" color="#fff" size=".35rem"></yd-icon>
                    <div style='display: flex; justify-content: center;'>
                        <div style='width: 16px;margin-right: 6px'>
                            <img style='width: 100%' src="../../assets/icon/lijsq@3x.png" alt="">
                        </div>
                        <span style="color:#fff">立即申请</span>
                    </div>
                </router-link >
            </div> -->
            <div style="background:#5cb85c;width: 100%"  @click='submit'>
                    <div style='display: flex; justify-content: center;' class="senq">
                        <div style='width: 16px;margin-right: 6px'>
                            <img style='width: 100%' src="../../assets/icon/lijsq@3x.png" alt="">
                        </div>
                        <span style="color:#fff">立即申请</span>
                    </div>
            </div>
        
      <!--   <div style="border:1px solid rgb(42, 187, 79);width: 40%;background: #fff">
         <div style='display: flex; justify-content: center;'>
              <div style='width: 16px;margin-right: 6px;display: flex;align-items: center'>
                  <img style='width: 100%;vertical-align: middle;' src="../../assets/icon/woyzx@3x.png" alt="">
              </div>
              <span style="color:#5cb85c">我要咨询</span>
          </div>
      </div> -->
    </div>
</template>
<script>
    import { MessageBox} from 'mint-ui';
    export default {
       /* props:{
        msg: String
        },*/
        props:['msg','fidd','cls'],
        data () {
            return {
               
            }
        },
        beforeCreate () {
            //this.$dialog.toast({mes: `1`});
        },
        created () {
           /* this.findResume();*/
            //this.$dialog.toast({mes: `1`});
            console.log(this.msg)
        },
        mounted () {
           
        },
        methods:{
           findResume(){
          let params = new URLSearchParams();
            params.append('wx_openid',_const.openId);
            let _this = this; 
            this.$http.post(_const.requestUrl+'/v1/user/findResume',params).then(function ( res ){
              return;
              console.log(res);
              _const.base_id=res.list.base_id;
            });

         },
         submit(){
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
               _this.$router.push({path:'Resume/',query:{type:'apply',job_id:_this.msg,fid:_this.fidd,ty:_this.cls}})
              }
           //this.$router.push("SociologyIntro")
        });
         }

        }
    }
</script>
<style>
.schooldetailfooter{
    width: 100%;
    display: flex;
     display: -webkit-flex;
    position: fixed;
    bottom: 0;
    left: 0;

}
.senq{
   display: -webkit-flex;
}
.schooldetailfooter>div{
    text-align: center;
    padding: 0.26rem 0;
    box-sizing: border-box;
}
.schooldetailfooter span {
    font-size: 17px;
}
</style>