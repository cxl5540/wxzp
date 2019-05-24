<template>
<div>
    <div class="nav" >
       <i class="fa fa-angle-left"  @click='back' style="color:#04be02 "></i>
       <span>完善基本信息</span>
       <span style="color:#04be02 "></span>
    </div>
  <div class="information">
        <yd-cell-group>
            <yd-cell-item>
                <span slot="left"><i class="fa musticon">*</i>&nbsp;姓名</span>
                <input slot="right" type="text" placeholder="请输入姓名" value="" v-model='uname' maxlength="10">
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left"><i class="fa musticon">*</i>&nbsp;手机号</span>
                <input slot="right" type="number" placeholder="请输入手机号" v-model='mobile' >
            </yd-cell-item>        
            <yd-cell-item>
                <span slot="left"><i class="fa musticon">*</i>&nbsp;身份证</span>
                <input slot="right" type="text" placeholder="请输入身份证" v-model='card_no' @blur="getcar()">
            </yd-cell-item>   
            <yd-cell-item>
                <span slot="left"><i class="fa musticon">*</i>&nbsp;邮箱</span>
                <input slot="right" type="text" placeholder="请输入邮箱" v-model='email'  maxlength="50">
            </yd-cell-item>
             <yd-cell-item>
                <span slot="left">性别</span>
                <input slot="right" type="text" placeholder="请输入邮箱" v-model='sex' disabled>
            </yd-cell-item>
             <yd-cell-item>
                <span slot="left">年龄</span>
                <input slot="right" type="text" placeholder="请输入邮箱" v-model='age' disabled>
            </yd-cell-item>
        <yd-cell-item>
            <span slot="left">籍贯</span>
            <input slot="right" type="text"  placeholder="请输入籍贯" v-model="native_place" maxlength="10">
        </yd-cell-item>
        <yd-cell-item arrow type="label">
            <span style="line-height: 1rem" slot="left"><i class="fa musticon">*</i>&nbsp;政治面貌</span>
            <select slot="right"  v-model="politics "  id="politics"  placeholder="请选择">
                 <option value="">请选择</option>
            </select>
        </yd-cell-item>
        <yd-cell-item arrow type="label" >
            <span style="line-height: 1rem" slot="left">婚姻状况</span>
            <select slot="right"  v-model="marriage" placeholder="请选择">
               <option value="">请选择</option>
                <option value="01">未婚</option>
                <option value="02">已婚</option>
                 <option value="03">丧偶</option>
                <option value="04">离异</option>
            </select>
        </yd-cell-item>
        <yd-cell-item arrow type="label" >
            <span style="line-height: 1rem" slot="left"  >民族</span>
            <select  slot="right" id="nations" v-model="nation" placeholder="请选择"  >
              <option value="">请选择</option>
            </select>
        </yd-cell-item>
        <yd-cell-item>
                <span slot="left">户口所在地</span>
                 <input slot="right" type="text" @click.stop="show1 = true" v-model="reg_address" readonly placeholder="请选择户籍所在地">
        </yd-cell-item>
        <yd-cityselect v-model="show1" :callback="result1" :items="district"></yd-cityselect>
        <yd-cell-item arrow type="label" >
            <span style="line-height: 1rem" slot="left"><i class="fa musticon">*</i>&nbsp;最高学历</span>
          <select  slot="right" id="top_education" v-model="top_education" placeholder="请选择">
            <option value="">请选择</option>
          </select>
        </yd-cell-item>
        <yd-cell-item arrow type="label">
            <span style="line-height: 1rem" slot="left"><i class="fa musticon">*</i>&nbsp;目前工作状况</span>
            <select slot="right" v-model="current_work_status" placeholder="请选择">
              <option value="">请选择</option>
                <option value="0">在岗</option>
                <option value="1">待岗</option>
            </select>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">期望月薪</span>
            <input slot="right" type="text" placeholder="请输入期望月薪" v-model="hope_salary" maxlength="10">
        </yd-cell-item>
       <yd-cell-item>
          <span slot="left"><i class="fa musticon">*</i>&nbsp;现居住地</span>
          <input slot="right"  type="text" placeholder="请输入现居住地" v-model="current_address" maxlength="50">
      </yd-cell-item> 

    </yd-cell-group>
            <div style="width: 94%;margin:10px auto">
              <span style="width: 21%;color: #4c4c4c">自我评价</span>
            </div>
            <yd-cell-item>
                <yd-textarea slot="right" placeholder="请输入自我评价" maxlength="500" v-model='evaluation'></yd-textarea>
            </yd-cell-item> 
    </div>
    <yd-button style="height: 34px;border-radius: 6px;width: 94%;margin: 26px auto;font-size: 16px" type="primary" size="large"  @click.native='saveResume' >保存</yd-button>
</div>

</template>
<script>
    import District from 'ydui-district/dist/jd_province_city_id.js';
    import { Toast,Indicator } from 'mint-ui';
    export default {
 
        data () {
            return {
                show1: false,
                 district: District,                
                  age:'',
                  uname:'',
                  mobile:'',
                  card_no:'',
                  email:'',
                  sex:'',
                  native_place:'',
                  nation:'',
                  politics: '',
                  reg_address:'',
                  current_address:'',
                  top_education:'',
                  marriage:'',
                  current_work_status:'',
                  hope_salary :'',
                  evaluation :'',
                  user_id:'',
                  baseList:[],
                  selectData:'',                                           
            }
        },
        beforeCreate () {
            //this.$dialog.toast({mes: `1`});
        },
        created () {
          this.baseinfor(); 
        },
        mounted () {
            this.show();
            this.getage();
          /* this.findResume();*/
          
        },
        methods:{
          getcar(){
             if(!(/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(this.card_no))) {
              Toast({
                message: "身份证输入有误",
                duration: 1000
              });
              return false;
            } else { 
              this.getage();
             
            }
          },
        baseinfor(){                                 //基础信息
          Indicator.open({   //打开loading
              spinnerType: 'fading-circle'
          });
            let data={
                "REQUEST": {
                  "HEAD": {
                    "BIZTRANSACTIONID": "SHR_GetBasicData",
                    "COUNT": "",
                    "CONSUMER": "",
                    "SRVLEVEL": "",
                    "ACCOUNT": "",
                    "PASSWORD": "",
                    "PAGENUM": "",
                    "PAGESIZE": "",
                    "MODULE": ""
                  },
                  "LIST": [
                  ]
                }
              };
            let url=_const.testUrl+'/WP_CQP_SOA/APP_PUBLIC_SERVICES/Proxy_Services/TA_HR/HR_Recruit_01_GetBasicData_PS';
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
                      _this.highsc=json_result.RESPONSE.LIST[0].DIPLOMAS
                      let highsc=json_result.RESPONSE.LIST[0].DIPLOMAS;
                      let politics=json_result.RESPONSE.LIST[0].POLITICALFACE;
                      var nation = $("#nations");               
                      let nations=json_result.RESPONSE.LIST[0].FOLK;
                      for ( var i=0;i<nations.length;i++) {
                          var name=nations[i].NAME; 
                          var num= nations[i].NUMBER;   
                          nation.append("<option value='"+num+"'>"+name+"</option>"); 
                        }

                      var politic = $("#politics");               
                      for ( var i=0;i<politics.length;i++) {
                          var name=politics[i].NAME; 
                          var num= politics[i].NUMBER;   
                          politic.append("<option value='"+num+"'>"+name+"</option>"); 
                        }  
                     var top_education = $("#top_education");          
                      for ( var i=0;i<highsc.length;i++) {
                      var name=highsc[i].NAME; 
                      var num= highsc[i].NUMBER;               
                     top_education.append("<option value='"+num+"'>"+name+"</option>");                              
                      }                      
                       setTimeout(function(){
                        _this.findResume();

                       },100)                      
                                                                                                 
               },function(){
                 _this.$dialog.toast({
                    mes: 'ESB网络异常',
                    timeout: 1000,
                  });
                   Indicator.close()
               }); 
                 
            },

            back(){
                this.$router.go(-1);
            },
             result1(ret) {
                this.reg_address = ret.itemName1 + ' ' + ' ' + ret.itemName2;
            },
           show:function(){
             $('.yd-cell-left').css('width','24%');
             $('.yd-cell-left').css('text-align-last','justify');
              this.uname=this.$route.query.name;
              this.mobile=this.$route.query.mobile;
              this.card_no=this.$route.query.card_no;
              this.email=this.$route.query.email; 
                          
          },

          getage(){
             var myDate = new Date();
              var month = myDate.getMonth() + 1;
                var day = myDate.getDate();
                var age = myDate.getFullYear() - this.card_no.substring(6, 10) - 1;
                if (this.card_no.substring(10, 12) < month || this.card_no.substring(10, 12) == month && this.card_no.substring(12, 14) <= day) {
                    age++;
                }
                this.age=age;
              if (parseInt(this.card_no.substr(16, 1)) % 2 == 1){
                this.sex='男';
              }else{
                this.sex='女';
              } 
          },
       findResume(){               //查找是否有简历
        var params = new URLSearchParams();
        params.append('wx_openid', _const.openId);
        let _this=this; 
         this.$http.post(_const.requestUrl+'/v1/user/findResume',params).then(function ( res ){
          /*_this.user_id=res.list.user_id;*/
          _this.baseList=res.list;
          console.log( _this.baseList);
          // localStorage.setItem('hasResume',res.data.data.status);
             _this.native_place=_this.baseList.native_place;
             _this.nation=_this.baseList.nation;
             _this.politics=_this.baseList.politics;
             _this.current_address=_this.baseList.current_address;
             _this.top_education=_this.baseList.top_education;
             _this.marriage=_this.baseList.marriage;
             _this.current_work_status=_this.baseList.current_work_status;
             _this.hope_salary=_this.baseList.hope_salary;
             _this.evaluation=_this.baseList.evaluation;
          /*   _this.age=_this.baseList.age;*/
             _this.reg_address=_this.baseList.reg_address;
           _this.user_id=_this.baseList.user_id;
             console.log(_this.top_education);
             console.log(  $("#top_education option[value='"+_this.top_education+"']").text());
             console.log(_this.nation);
             console.log(  $("#nations option[value='"+_this.nation+"']").text())                
                        
        });
      },    
      saveResume: function(){           //提交基础信息
        let esbsex='';
        if(this.sex=='男'){
          esbsex='0'
        }else if(this.sex=='女') {
            esbsex='1'
        }
        if(this.check()){
         let urls=_const.testUrl+'/WP_CQP_SOA/APP_PUBLIC_SERVICES/Proxy_Services/TA_HR/HR_Recruit_03_SaveResume_PS';
         let datas={
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
                  "SELFDESCRIPTION":this.evaluation,
                  "PROJECTEXP":'',
                  "WED": this.marriage,
                  "SKILLEXP": '',
                  "EXPECTANTPAY":this.hope_salary,
                  "DOMICILEPLACE":this.reg_address,
                  "SEX":esbsex,
                  "AWARDEXP":'',
                  "EMAIL":this.email,
                  "IDCARDNO": this.card_no,
                  "NATIVEPLACE":this.native_place,
                  "CURRENTWORKINGSTATUS": this.current_work_status,
                  "TYPE": "1",
                  "NAME": this.uname,
                  "AGE":  this.age,
                  "TRAININGEXP": '',
                  "EDUCATIONEXP": '',
                  "CREDENTIALEXP":'',
                  "LANGUAGEEXP": '',
                  "NOWRESIDENCE": this.current_address,
                  "FOLK": this.nation,
                  "POLITICALFACE":this.politics,
                  "WORKEXP": '',
                  /*"OBJECTID":'1'*/
                }
              ]
            }
          };
        let _this=this;

       $.ajax({
        type:"post",
        url:urls,
        data:JSON.stringify(datas),
        dataType:'text',
        beforeSend:function(){
          Indicator.open({   //打开loading
              spinnerType: 'fading-circle'
           });
         
          },
        }).then(function(res){
          Indicator.close();
            let str = res.split("<icp:MESSAGE>");
            let str_tmp = str[1].split("</icp:MESSAGE>");
            let json_result = JSON.parse(str_tmp[0]);
            console.log(json_result);
         if(json_result.RESPONSE.HEAD.RESULT=='1'){
           _this.$dialog.toast({
                mes: json_result.RESPONSE.HEAD,
                timeout: 1000,
              });
               return;
            }
            let data={
            "object_id":json_result.RESPONSE.LIST[0].OBJECTID,            
            "user_id":_this.user_id,  
            "name":_this.uname ,
            "card_no": _this.card_no,
            "sex": _this.sex,
            "age": _this.age,
            "native_place": _this.native_place,
            "nation":  _this.nation,
            "politics":_this.politics,
            "reg_address":_this.reg_address,
            "current_address": _this.current_address,
            "top_education": _this.top_education,
            "mobile": _this.mobile,
            "email":  _this.email,
            "marriage": _this.marriage,
            "current_work_status":  _this.current_work_status,
            "hope_salary":_this.hope_salary,
            "evaluation":_this.evaluation, 
    
      };
          let url =_const.requestUrl+'/v1/user/saveResume';
            $.post(url,data,function(res){
              setTimeout(function(){
                    _this.$dialog.toast({
                      mes: '保存成功',
                      timeout: 1000,
                      icon: 'success'
                    });                   
                  },2000);

             _this.$router.go(-1);
            console.log(res);

          });

        },function(){
            _this.$dialog.toast({
              mes: 'ESB网络异常',
              timeout: 1000,
            });
              Indicator.close(); 
        });
      }

         
      },
      check(){

        if(this.uname.length == 0) {
          Toast({
            message: "姓名不能为空",
            duration: 1500
          });
          return false;
        }
        if(this.uname.length>10) {
          Toast({
            message: "姓名不超过10字",
            duration: 1500
          });
          return false;
        }
        if(this.mobile.length == 0) {
          Toast({
            message: "手机号不能为空",
            duration: 1500
          });
          return false;
        } else {
          if(!(/^1[34578]\d{9}$/.test(this.mobile))) {
            Toast({
              message: "手机号码有误",
              duration: 1500
            });
            return false;
          } else {
           
          }
        }

        if(this.card_no.length == 0) {
          Toast({
            message: "身份证不能为空",
            duration: 1500
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
              duration: 1500
            });
            return false;
          } else {
            if(!(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(this.email))) {
              Toast({
                message: "邮箱格式有误",
                duration: 1500
              });
              return false;
            } else {
             
          }
          if(this.top_education==''){
             Toast({
              message: "学历不能为空",
              duration: 1500
            });
            return false;
          }

          if(this.politics==''){
            Toast({
              message: "政治面貌不能为空",
              duration: 1500
            });
            return false;
          }
          if(this.current_work_status == '') {
            Toast({
              message: "工作状态不能为空",
              duration: 1500
            });
            return false;
          }
           if(this.native_place.length>15) {
            Toast({
              message: "籍贯不超过15",
              duration: 1500
            });
            return false;
          }
          if(this.current_address.length ==0) {
            Toast({
              message: "居住地不能为空",
              duration: 1500
            });
            return false;
          }
           if(this.current_address.length >50) {
            Toast({
              message: "居住地字数不得超过50",
              duration: 1500
            });
            return false;
          }
          return true;
        }        
    }
         
    },
   
 }
</script>
<style scoped lang="less">
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
.information input,select{
    box-sizing: border-box;
    padding-left: 0.8rem;

}

.information {
  margin-top: 52px;
}


.information span{
  width: 100%;
  text-align: justify;
  -webkit-text-align-last:justify;
}

input::-webkit-input-placeholder {
     color: #999;
     font-size: 12px;
     text-align: right;
 }
 select::-webkit-select-placeholder {
     color: #999;
     font-size: 12px;
     text-align: right;
 }
 .aa{
    text-align: right;
 }
input:disabled{
  color: #555;
  -webkit-text-fill-color:#555;
     -webkit-opacity:1;
}
.musticon{
  position: relative;
  top: 6px;
  color: red;
  font-size: 20px;
}
</style>