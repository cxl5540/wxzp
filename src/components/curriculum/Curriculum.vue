<template >
<div class="baseMsg" style="height: 100%;">
     <div class="nav" >
       <i class="fa fa-angle-left"  @click='back' style="color:#04be02 "></i>
       <span>完善简历</span>
       <span @click='yulan' style="color:#04be02 ">首页</span>
    </div>
   <router-link :to="{path:'/Dialog', query: {'name':this.name, 'mobile':this.mobile,'card_no':this.card_no,'email':this.email}}" slot="left">
  <div style="padding-left: 15px">
     <div class="exp" style='padding-left: 0; margin-top: 58px'>
         <div style='display: flex;line-height: 32px' class="jbxx">
             <div style="width: 18px;margin-right:6px">
               <img  style="width: 100%;vertical-align: text-top;" src="../../assets/icon/gerxx@3x.png" alt="">
             </div>
             <span style='font-weight: bold;'>基本信息</span>             
         </div>
         <div style='width: 11%'>
           <span style="line-height: 32px;color: #04be02">编辑</span>
         </div>
     </div>
   </div>  
    </router-link> 
    <div class="msg" style="padding-bottom: 10px">
     <div class="msg_item">
       <span class="sp_01">姓名</span>
       <span class="sp_02">{{name}}</span>
     </div>
     <div class="msg_item">
       <span class="sp_01">手机号</span>
       <span class="sp_02">{{mobile}}</span>
     </div>
     <div class="msg_item">
       <span class="sp_01">身份证</span>
       <span class="sp_02">{{card_no}}</span>
     </div>
     <div class="msg_item">
       <span class="sp_01">邮箱</span>
       <span class="sp_02">{{email}}</span>
     </div>    
   </div> 

</yd-layout> 
<Experience v-on:jobData='getJobData' v-on:proData='getProData' v-on:eduData='getEduData' v-on:trianData='getTrianData'
v-on:skillData='getSkillData' v-on:laguData='getLaguData'  v-on:awardData='getAwardData' v-on:certData='getCertData' v-on:msg='base_id'></Experience>
</yd-layout>

<yd-button style="height: 34px;border-radius: 6px;width: 94%;margin: 26px auto;font-size: 16px;display: none" type="primary" size="large"  @click.native='creatCurruclum' >保存简历</yd-button>
</div>
</template>

<script>
     import Experience from "./Experience";
     import Dialog from "./Dialog";
     import District from 'ydui-district/dist/jd_province_city_id.js';
      import { Toast,Indicator, MessageBox} from 'mint-ui';
    export default {
        components:{    
            Experience 
           },
        data () {
            return {              
               show1: false,
                model1: '',
                district: District,
               data:{
                    isShow:false,
                    value:'',
                    base_id: this.$route.params.base_id,                                                                                                          
                },
                jobData:'',
                 attrJob:'',
                 proData:'',
                 attrPro:'',
                 eduData:'',
                 attrEdu:'',
                 trianData:'',
                 attrTrian:'',
                 skillData:'',
                 attrSkill:'',
                 laguData:'',
                 attrLagu:'',
                 awardData:'',
                 attrAward:'',
                 certData:'',
                 attrCert:'',
                  name:'',
                  mobile:'',
                  card_no:'',
                  email:'',
                  user_id:'',
                  List:'',
                  base_id:'',
                  obj_id:'',
                  attrjobSave:[],
                  attrproSave:[],
                  attreduSave:[],
                  atttraintSave:[],
                  attrskillSave:[],
                  attrlaguSave:[],
                  attrawardSave:[],
                  atttcertSave:[], 
                                      
            }
        },
  
        beforeCreate () {
            //this.$dialog.toast({mes: `1`});
        },
        created () {
            //this.$dialog.toast({mes: `1`});
        this.findResume();
        },
        mounted () {
        
        },
       beforeRouteEnter (to, from, next) {
           let  baseMsg=JSON.parse(localStorage.getItem('baseMsg'));
           if(from.name=='baseInformation'){
            next(vm => {
              
                vm.bb();
              })
           }else{
            next(vm => {
             /* vm.base_id=_const.baseId*/
              //alert(vm.$route.query.base_id)
              next();
              })
           }
         },

        methods:{         
          result1(ret) {
                this.model1 = ret.itemName1 + ' ' + ' ' + ret.itemName2;
            },
          bb:function(){
            let name=this.$route.query.name;
            let mobile=this.$route.query.mobile;
            let card_no=this.$route.query.card_no;
            let email=this.$route.query.email;
            this.name=name;
            this.mobile=mobile;
             this.card_no=card_no;
            this.email=email;
         
         let self = this

          },
    getJobData:function(data){   //获取工作经验
        this.jobData=data[0];
        if (this.jobData.length!==0){
          var a=this.jobData;     
          var _aCopy = [].concat(JSON.parse(JSON.stringify(a)));
          var attr=[];
          for(var i =0;i<_aCopy.length;i++){
            let obj=_aCopy[i];        
            attr.push(obj);                
          }
          for (var i = 0; i < attr.length; i++) {
          delete attr[i].w_create_time;
          delete attr[i].w_update_time;
          delete attr[i].work_id;
          delete attr[i].base_id;         
        }
         this.attrJob=attr;
        }else{
          var attr="";
            this.attrJob=attr;
       }
       for(var i=0;i<this.attrJob.length;i++){
         let obj= new Object();
           obj["COMPANY"]=this.attrJob[i].company;
           obj["DATESTART"]=this.attrJob[i].start_time;
           obj["DATEEND"]=this.attrJob[i].end_time;
           obj["POSITION"]=this.attrJob[i].job_title;
           obj["JOBDESCRIPTION"]=this.attrJob[i].job_description;
           this.attrjobSave.push(obj);
      }
      console.log(this.attrjobSave);  
    },
    getProData:function(data){  //获取项目经验
      this.proData=data[0];
      if(this.proData.length!==0){
        var a=this.proData;
        var _aCopy = [].concat(JSON.parse(JSON.stringify(a))); 
        var attr=[];
        for(var i =0;i<_aCopy.length;i++){
          let obj=_aCopy[i];
          attr.push(obj);                   
        }      
        for (var i = 0; i < attr.length; i++) {
          delete attr[i].pro_create_time;
          delete attr[i].pro_update_time;
         delete attr[i].project_id;
          delete attr[i].base_id;
        }
       
        this.attrPro=attr;
      }else{
      var attr="";
          this.attrPro=attr;
      }

      for(var i=0;i<this.attrPro.length;i++){
       let obj= new Object();
         obj["DATESTART"]=this.attrPro[i].start_time;
         obj["ROLE"]=this.attrPro[i].job_title;
         obj["PROJECTNAME"]=this.attrPro[i].project_name;
         obj["DATEEND"]=this.attrPro[i].end_time;
         obj["MAINDUTY"]=this.attrPro[i].main_duty;
         obj["PDESCRIPTION"]=this.attrPro[i].project_description;
         this.attrproSave.push(obj);
      } 
      console.log(this.attrPro);
       console.log(this.attrproSave);      
    },
    getEduData:function(data){  //获取教育经历
      console.log(data);
      this.eduData=data[0];
      console.log(this.eduData);
      if(this.eduData.length!==0){
        var a=this.eduData;
        var _aCopy = [].concat(JSON.parse(JSON.stringify(a))); 
        var attr=[];
        for(var i =0;i<_aCopy.length;i++){
          let obj=_aCopy[i];
          attr.push(obj);                   
        }
        for (var i = 0; i < attr.length; i++) {
          delete attr[i].edu_create_time;
          delete attr[i].edu_update_time;
          delete attr[i].education_id;
           delete attr[i].base_id; 
        }
        
        this.attrEdu=attr;
      }else{
        var attr="";
          this.attrEdu=attr;
      }
    for(var i=0;i<this.attrEdu.length;i++){
       let obj= new Object();
         obj["MAJOR"]=this.attrEdu[i].profession;
         obj["DATESTART"]=this.attrEdu[i].join_shcool;
         obj["SCHOOL"]=this.attrEdu[i].shcool_name;
         obj["DIPLOMAS"]=this.attrEdu[i].eduction_degree;
         obj["DEGREE"]=this.attrEdu[i].eduction_record;
         obj["DATEEND"]=this.attrEdu[i].out_shcool;
         this.attreduSave.push(obj);
      }
      console.log()  
    },
    getTrianData:function(data){  //获取培训经历
      this.trianData=data[0];
      if(this.trianData.length!==0){
        var a=this.trianData;
        var _aCopy = [].concat(JSON.parse(JSON.stringify(a))); 
        var attr=[];
        for(var i =0;i<_aCopy.length;i++){
          let obj=_aCopy[i];
          attr.push(obj);                   
        }
        for (var i = 0; i < attr.length; i++) {
          delete attr[i].train_id;
          delete attr[i].train_create_time;
          delete attr[i].train_update_time;
          delete attr[i].base_id; 
        }
         
        this.attrTrian=attr;
      }else{
         var attr="";
          this.attrTrian=attr;
      }
    for(var i=0;i<this.attrTrian.length;i++){
       let obj= new Object();
         obj["DATESTART"]=this.attrTrian[i].start_time;
         obj["TRAININGNAME"]=this.attrTrian[i].train_company;
         obj["COURSEDESCRIPTION"]=this.attrTrian[i].class_description;
         obj["DATEEND"]=this.attrTrian[i].end_time;
         this.atttraintSave.push(obj);
    }
        
  },
    getSkillData:function(data){  //获取技能展示
      this.skillData=data[0];
      if(this.skillData.length!==0){
        var a=this.skillData;
        var _aCopy = [].concat(JSON.parse(JSON.stringify(a)));
        var attr=[];
        for(var i =0;i<_aCopy.length;i++){
          let obj=_aCopy[i];
          attr.push(obj);                   
        }
        for (var i = 0; i < attr.length; i++) {
          delete attr[i].professions_id;
          delete attr[i].professions_update_time;
          delete attr[i].professions_create_time;
          delete attr[i].base_id; 
        }
      
        this.attrSkill=attr;
      }else{
        var attr="";
          this.attrSkill=attr;
      }
    for(var i=0;i<this.attrSkill.length;i++){
       let obj= new Object();
         obj["PROFICIENCY"]=this.attrSkill[i].proficiency;
         obj["SKILLNAME"]=this.attrSkill[i].professions_title;
         this.attrskillSave.push(obj);
     } 
        
    },
    getLaguData:function(data){  //获取语言技能
      this.laguData=data[0];
      if(this.laguData.length!==0){
        var a=this.laguData;
        var _aCopy = [].concat(JSON.parse(JSON.stringify(a))); 
        var attr=[];
        for(var i =0;i<_aCopy.length;i++){
          let obj=_aCopy[i];
          attr.push(obj);                   
        }
        for (var i = 0; i < attr.length; i++) {
          delete attr[i].language_id;
          delete attr[i].language_update_time;
          delete attr[i].language_create_time;
          delete attr[i].base_id; 
        }
        
        this.attrLagu=attr;
      }else{
        var attr="";
          this.attrLagu=attr;
      }
       for(var i=0;i<this.attrLagu.length;i++){
       let obj= new Object();
         obj["LV"]=this.attrLagu[i].language_level;
         obj["LANGUAGE"]=this.attrLagu[i].language;
         obj["LISTENINGSPEAKING"]=this.attrLagu[i].hearspeak;
         obj["READINGWRITING"]=this.attrLagu[i].readwrite;
         this.attrlaguSave.push(obj);
     } 

        
    },

    getAwardData:function(data){  //获取获奖经历      
      this.awardData=data[0];
      if(this.awardData.length!==0){
         var a=this.awardData;
        var _aCopy = [].concat(JSON.parse(JSON.stringify(a))); 
        var attr=[];
        for(var i =0;i<_aCopy.length;i++){
          let obj=_aCopy[i];
          attr.push(obj);                   
        }
        for (var i = 0; i < attr.length; i++) {
          delete attr[i].award_proccess_id;
          delete attr[i].award_proccess_create_time;
          delete attr[i].award_proccess_update_time;
          delete attr[i].base_id; 
        }

        this.attrAward=attr;
      }else{
        var attr="";
          this.attrAward=attr;
      }
     for(var i=0;i< this.attrAward.length;i++){
       let obj= new Object();
         obj["DESCRIPTION"]= this.attrAward[i].mark;
         obj["DATE"]= this.attrAward[i].award_time;
          obj["REWARDNAME"]= this.attrAward[i].award_name;
         this.attrawardSave.push(obj);
     } 
       
    },
    getCertData:function(data){  //获取证书
      this.certData=data[0];
      if(this.certData.length!==0){
         var a=this.certData;
        var _aCopy = [].concat(JSON.parse(JSON.stringify(a))); 
        var attr=[];
        for(var i =0;i<_aCopy.length;i++){
          let obj=_aCopy[i];
          attr.push(obj);                   
        }
        for (var i = 0; i < attr.length; i++) {
          delete attr[i].award_create_time;
          delete attr[i].award_update_time;
          delete attr[i].award_id;
          delete attr[i].base_id; 
        }
        this.attrCert=attr;
      }else{
      var attr="";
          this.attrCert=attr;
       
      }
     for(var i=0;i<this.attrCert.length;i++){
       let obj= new Object();
         obj["NAME"]=this.attrCert[i].award_title;
         obj["DATE"]=this.attrCert[i].get_award_time;
         obj["ISSUER"]=this.attrCert[i].company;
         this.atttcertSave.push(obj);
      }
    },
    back:function(){
    if(this.$route.query.type=='base'){
       this.$router.push({path:'/'})

    }else{
      this.$router.go(-1);
    } 
        
  },
  findResume(){               //查找是否有简历
        var params = new URLSearchParams();
        params.append('wx_openid', _const.openId);
        let _this=this; 
         this.$http.post(_const.requestUrl+'/v1/user/findResume',params).then(function ( res ){      
          _this.user_id=res.list.user_id
          // localStorage.setItem('hasResume',res.data.data.status);
          if(res.list!==null){
             _this.List=res.list;
            _this.name=res.list.name;
            _this.mobile=res.list.mobile;
            _this.card_no=res.list.card_no;
            _this.email=res.list.email;
        /*   _this.base_id=_this.list.base_id;*/
           _const.base_id=res.list.base_id;
           _this.obj_id=res.list.object_id;
            console.log(_const.base_id);
            console.log(_this.obj_id);
            //  console.log(_this.base_id)
          }
                                  
        });
      }, 
    yulan(){
     this.$router.push({name:'home'});
    },
creatCurruclum: function () {
 
  if(this.check()){
     if(this.attreduSave.length==0){
        Toast('工作经历不能为空');
        return false;
      }
      if(this.attrjobSave.length==0){
        Toast('教育经历不能为空');
        return false;
      }
       let esbsex='';
        if(this.List.sex=='男'){
          esbsex='0'
        }else if(this.List.sex=='女') {
            esbsex='1'
        }
    let _this=this;
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
          "MODULE": "",
        },
        "LIST": [{
            "OBJECTID":_this.obj_id,
            "RESUMETYPE": "2",
            "MOBILEPHONE": _this.List.mobile,
            "SELFDESCRIPTION": _this.List.evaluation,
            "PROJECTEXP":_this.attrproSave,
            "WED": _this.List.marriage,
            "SKILLEXP": _this.attrskillSave,
            "EXPECTANTPAY": _this.List.hope_salary,
            "DOMICILEPLACE": _this.List.reg_address,
            "SEX":esbsex,
            "AWARDEXP": _this.attrawardSave,
            "EMAIL":_this.List.email,
            "IDCARDNO": _this.List.card_no,
            "NATIVEPLACE": _this.List.native_place,
            "CURRENTWORKINGSTATUS": _this.List.current_work_status,
            "TYPE": "1",
            "NAME": _this.List.name,
            "AGE": _this.List.age,
            "TRAININGEXP": _this.atttraintSave,
            "EDUCATIONEXP": _this.attreduSave,
            "CREDENTIALEXP":_this.atttcertSave,
            "LANGUAGEEXP": _this.attrlaguSave,
            "NOWRESIDENCE": _this.List.current_address,
            "FOLK": _this.List.nation,
            "POLITICALFACE": _this.List.politics,
            "WORKEXP": _this.attrjobSave,

          }
        ]
      }
    };
   console.log(data);
  let url =_const.testUrl+'/WP_CQP_SOA/APP_PUBLIC_SERVICES/Proxy_Services/TA_HR/HR_Recruit_03_SaveResume_PS';
       $.ajax({
        type:"post",
        url:url,
        data:JSON.stringify(data),
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
               Indicator.close();
           _this.$dialog.toast({
                mes:json_result.RESPONSE.HEAD.ERRORINFO,
                timeout: 1000,
              });
               return;
            }
            let databd = {
                 "user_id": _this.user_id,
                  "name": _this.List.name,
                  "card_no":_this.List.card_no,
                  "sex": _this.List.sex,
                  "age": _this.List.age,
                  "native_place":_this.List.native_place,
                  "nation": _this.List.nation,
                  "politics":_this.List.politics,
                  "reg_address":_this.List.reg_address,
                  "current_address": _this.List.current_address,
                  "top_education": _this.List.top_education,
                  "mobile": _this.List.mobile,
                  "email":  _this.List.email,
                  "marriage": _this.List.marriage,
                  "current_work_status": _this.List.current_work_status,
                  "hope_salary":_this.List.hope_salary,
                  "evaluation":_this.List.evaluation,
            };
             let urlbd =_const.requestUrl+ '/v1/user/saveResume';
                    $.post(urlbd,databd,function(res){      
                      _this.$dialog.toast({
                          mes: '保存成功',
                          timeout: 1000,
                          icon: 'success'
                        });               
                });
        },function(){
          Indicator.close();
            _this.$dialog.toast({
                  mes: 'ESB网络异常',
                  timeout: 1000,
                }); 
        });
     }
  },
    check(){
        if(this.List.name == '') {
          Toast({
            message: "姓名不能为空",
            duration: 1000
          });
          return false;
        }
        if(this.List.card_no == '') {
          Toast({
            message: "身份证不能为空",
            duration: 1000
          });
          return false;
        }
        if(this.List.mobile == '') {
          Toast({
            message: "手机号不能为空",
            duration: 1000
          });
          return false;
        }
        if(this.List.email == '') {
          Toast({
            message: "邮箱不能为空",
            duration: 1000
          });
          return false;
        }
        if(this.List.current_address == '') {
          Toast({
            message: "居住地不能为空",
            duration: 1000
          });
          return false;
        }
        if(this.List.top_education==''){
             Toast({
              message: "学历不能为空",
              duration: 1000
            });
            return false;
          }
        if(this.List.politics == '') {
          Toast({
            message: "政治面貌不能为空",
            duration: 1000
          });
          return false;
        }
        if(this.List.current_work_status == '') {

          Toast({
            message: "工作状态不能为空",
            duration: 1000
          });
          return false;
        }
        return true;

  },

                
  }
}
</script>
<style scoped lang="less">
.nav{
  font-size: 16px;
  display: flex;
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
.navbar{
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
.jbxx{
  display: -webkit-flex;
}
.baseMsg{
    font-size: 12px;
    color: #999;
     .exp{
    color: #4c4c4c;
    border-bottom: 1px solid #eee;
    display: flex; 
    display: -webkit-flex;
    justify-content: space-between;
    padding: 15px 15px;
    font-size: 15px;
       i{
    font-size: 15px;
     }
   }
   .msg{
    padding: 0 15px;
    div{
      padding: 6px 0;
      display: flex;
      display: -webkit-flex;
      .sp_01{
        text-align-last: justify;
        flex: 0.3;
      }
      .sp_02{
        flex: 1.4;
        padding-left: 15px;
      }
    }
   }
 
}



</style>