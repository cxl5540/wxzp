<template>
  <div class="baseinforma">
    <div class="nav" >
       <i class="fa fa-angle-left"  @click='back' style="color:#04be02 "></i>
       <span>创建简历</span>
       <span style="color:#04be02 "></span>
    </div>
   <div class="content" style="margin-top: 52px">
      <yd-cell-group>
       <div class="item" style=" border-bottom: 1px solid #eee;">
         <i class="fa fa-user-o" style="color: #04be02;font-size:14px"></i>
           <yd-cell-item>
               <span slot="left"><i class="fa musticon">*</i>&nbsp;姓名:</span>
               <yd-input slot="right" type='text'  v-model="uname" max="20" placeholder="请输入姓名" maxlength="10"></yd-input>
           </yd-cell-item>
        </div>
        <div class="item">
       <i class="fa fa-mobile" style="color: #04be02;font-size: 22px"></i>  
           <yd-cell-item >
              <span slot="left"><i class="fa musticon">*</i>&nbsp;手机号:</span>
               <yd-input style='padding-left: 0.54rem' slot="right" v-model="mobile" regex="mobile" placeholder="请输入手机号"></yd-input>
           </yd-cell-item>
         </div>
         <div class="item">
      <i class="fa fa-id-card" style="color: #04be02;position: relative;left:-2px;"></i>  
           <yd-cell-item >
               <span style="position: relative;left: -3px "  slot="left"><i class="fa musticon">*</i>&nbsp;身份证:</span>
               <yd-input style='padding-left: 0.44rem'  slot="right"  placeholder="请输入身份证号" regex="/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/"  v-model='card_no'></yd-input>
           </yd-cell-item>
         </div>         
         <div class="item">
          <a style="color: #04be02">@</a> 
           <yd-cell-item>
               <span slot="left"><i class="fa musticon">*</i>&nbsp;邮箱:</span>
               <yd-input slot="right" type="text" placeholder="请输入邮箱" regex="email"  v-model='email'  maxlength="50"></yd-input>
           </yd-cell-item>
         </div>              
       </yd-cell-group>
        <div >
         <yd-button style="height: 34px;border-radius: 6px;width: 94%;margin: 26px auto;font-size: 16px" type="primary" size="large"  @click.native='submit' >保存</yd-button>
        </div>
    </div>
</div> 
</template>

<script>
  import { Toast,Indicator } from 'mint-ui';
export default {
   name: 'baseInformation',
  data () {
    return{
      uname:'',
      mobile:'',
      card_no:'',
      email:'',
    }         
 },
  beforeCreate () {
  },
  created () {
    
  },
  mounted () {
  },

   methods:{
    back:function(){
      this.$router.go(-1);
    },
   submit:function () {             //提交创建档案
      let url =_const.testUrl+'/WP_CQP_SOA/APP_PUBLIC_SERVICES/Proxy_Services/TA_HR/HR_Recruit_03_SaveResume_PS';
       if(this.check()){
       Indicator.open({   //打开loading
          spinnerType: 'fading-circle'
         });
         let data={
            "REQUEST": {
              "HEAD": {
                "BIZTRANSACTIONID": "SHR_SaveResume",
                "COUNT": "",
                "CONSUMER": "",
                "SRVLEVEL": "",
                "ACCOUNT": "",
                "PASSWORD": "",
                "PAGENUM": "",
                "PAGESIZE": "",
                "MODULE": ""
              },
              "LIST": [{
                  "RESUMETYPE": "2",
                  "MOBILEPHONE": this.mobile,
                  "SELFDESCRIPTION": '',
                  "PROJECTEXP":'',
                  "WED": '',
                  "SKILLEXP": '',
                  "EXPECTANTPAY":'',
                  "DOMICILEPLACE":'',
                  "SEX":'',
                  "AWARDEXP":'',
                  "EMAIL":this.email,
                  "IDCARDNO": this.card_no,
                  "NATIVEPLACE":'',
                  "CURRENTWORKINGSTATUS": '',
                  "TYPE": "4",
                  "NAME": this.uname,
                  "AGE": '',
                  "TRAININGEXP": '',
                  "EDUCATIONEXP": '',
                  "CREDENTIALEXP":'',
                  "LANGUAGEEXP": '',
                  "NOWRESIDENCE":'',
                  "FOLK": '',
                  "POLITICALFACE": '',
                  "WORKEXP": '',
                  /*"OBJECTID":'1'*/
                }
              ]
            }
          };
          console.log(JSON.stringify(data))
      let url =_const.testUrl+'/WP_CQP_SOA/APP_PUBLIC_SERVICES/Proxy_Services/TA_HR/HR_Recruit_03_SaveResume_PS';
      let _this=this;
           $.ajax({
              type:"post",
              url:url,
              data:JSON.stringify(data),
              dataType:'text',
              }).then(function(res){
                let str = res.split("<icp:MESSAGE>");
                let str_tmp = str[1].split("</icp:MESSAGE>");
                let json_result = JSON.parse(str_tmp[0]);
                console.log(json_result);
               
                  if(json_result.RESPONSE.HEAD.RESULT=='1'){
                      Indicator.close();
                       _this.$dialog.toast({
                            mes: json_result.RESPONSE.HEAD.ERRORINFO,
                            timeout: 1000,
                          });
                           return;
                        }
                let obj_id=json_result.RESPONSE.LIST[0].OBJECTID;
                console.log(obj_id);
                 var params = new URLSearchParams();
                  params.append('object_id',obj_id);
                    params.append('user_id',_const.userId);
                    params.append('name', _this.uname);
                    params.append('mobile', _this.mobile);
                    params.append('card_no', _this.card_no);
                    params.append('email', _this.email); 
           _this.$http.post(_const.requestUrl+'/v1/user/addResume',params).then(function ( res ) {
                      _const.base_id=res.base_id
                   setTimeout(function(){
                      _this.$dialog.toast({
                      mes: '保存成功',
                      timeout: 1000,
                      icon: 'success'
                    });
                   _this.$router.push({path:'Curriculum/edit',
                    query:{
                            base_id:res.base_id,
                            name:_this.uname,
                            mobile:_this.mobile,
                            card_no:_this.card_no,
                            email:_this.email,
                            type:'base'            
                          }
                        });
                   },1000)
                },function(){
              _this.$dialog.toast({
                mes: '本地网络异常',
                    timeout: 1000,
                  });
              });           
          },function(){
              _this.$dialog.toast({
                mes: 'ESB网络异常',
                timeout: 1000,
              });
          });
       }        
   },


      check(){
        if(this.uname.length == 0) {
          Toast({
            message: "姓名不能为空",
            duration: 1000
          });
          return false;
        }
        if(this.uname.length == 0) {
          Toast({
            message: "姓名不能为空",
            duration: 1000
          });
          return false;
        }
        if(this.uname.length>10) {
          Toast({
            message: "姓名不超过10字",
            duration: 1000
          });
          return false;
        }
        if(this.mobile.length == 0) {
          Toast({
            message: "手机号不能为空",
            duration: 1000
          });
          return false;
        } else {
          if(!(/^1[34578]\d{9}$/.test(this.mobile))) {
            Toast({
              message: "手机号码有误",
              duration: 1000
            });
            return false;
          } else {
           
          }
        }

        if(this.card_no.length == 0) {
          Toast({
            message: "身份证不能为空",
            duration: 1000
          });
          return false;
        } else {
          if(!(/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(this.card_no))) {
            Toast({
              message: "身份证输入有误",
              duration: 1000
            });
            return false;
          } else {   
          }
        }
      if(this.email.length == 0) {
            Toast({
              message: "邮箱不能为空",
              duration: 1000
            });
            return false;
          } else {
            if(!(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(this.email))) {
              Toast({
                message: "邮箱格式有误",
                duration: 1000
              });
              return false;
            } else {
            return true;   
          }
        }
         if(this.sex.length == 0) {
            Toast({
              message: "性别不能为空",
              duration: 1000
            });
            return false;
          }
           if(this.native_place.length>15) {
            Toast({
              message: "籍贯不超过15",
              duration: 1000
            });
            return false;
          }
           if(this.current_address.length >50) {
            Toast({
              message: "居住地字数不得超过50",
              duration: 1000
            });
            return false;
          }
          return true;        
    }    
 },
  components: {

  }
}
</script>
<style scoped lang='less' >

.content span{
    display: inline-block;
    width: 100%;
    font-size: 14px;
} 

 .yd-input{
   padding-left: 0.8rem;
}

.yd-cell-item{
  width: 100%;

}
.item{
  display:flex;
  display: -webkit-flex;
  align-items: center;
  margin-left: 15px;
  border-bottom: 1px solid #eee;
}
.nav{
  font-size: 16px;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  padding: 15px 15px;
  border-bottom: 1px solid #eee;
   position: fixed; 
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  background: #fff;
  color: #4c4c4c;
}
.musticon{
  position: relative;
  top: 6px;
  color: red;
  font-size: 20px;
}
</style>
