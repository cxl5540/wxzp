<template >
<div class="view_msg" style="height: 100%;">
    <div class="nav" >
       <i class="fa fa-angle-left"  @click='back' style="color:#04be02;font-size: 20px "></i>
       <span style="position: fixed;left: 50%;margin-left: -32px">{{title}}</span>
       <span  v-show=isShowView @click='updateResume' style="color:#04be02 ">首页</span>
        <span   @click='updateresume' style="color:#04be02 ">修改简历</span>
      
  </div>
  <div style="padding-left: 15px;margin-top: 58px">
     <div class="exp" style='padding-left: 0;margin-bottom: 0;'>
      <div style='display: flex;' class="itemexp">
          <div style="width: 18px;margin-right:6px">
            <img  style="width: 100%;vertical-align: middle;" src="../../assets/icon/gerxx@3x.png" alt="">
          </div>
          <span style='font-weight: bold;'>个人信息</span>
      </div>
     </div>
 </div> 
  <div class="msgdel">
      <div class="top itemexp" style="display: flex;">
        <div style='width: 70px'>
          <img style="width: 100%" src="../../assets/icon/toux1@3x.png" alt="">
        </div>
        <div style="margin-left: 20px;">
          <p style='font-size: 15px;color: #4c4c4c;margin-bottom: 10px'>{{resumeList.name}}</p>
          <p style="font-size: 13px;color: #808080"><span>{{resumeList.sex}}</span>  &nbsp;  <span>{{resumeList.age}}</span> &nbsp; <span>{{resumeList.nation_name}}</span> &nbsp;<span>{{resumeList.marriage_name}}</span></p>
        </div>
      </div>
      <div class="mid" style="padding: 0 15px 15px 15px;">
        <div>
          <span>手机号码:</span>
          <span>{{resumeList.mobile}}</span>
        </div>
        <div>
          <span>籍贯:</span>
          <span>{{resumeList.native_place}}</span>
        </div>
        <div>
          <span>户口所在地:</span>
          <span>{{resumeList.reg_address}}</span>
        </div>
        <div>
          <span>最高学历:</span>
            <span v-if='haveedu' >{{resumeList.top_education_name}}</span>  
           <span v-if='edu'>未设置</span>
               
        </div>
        <div>
          <span>期望月薪:</span>
          <span>{{resumeList.hope_salary}}</span>
        </div>
        <div>
          <span>现居住地:</span>
          <span>{{resumeList.current_address}}</span>
        </div>
        <div style="display: block;width: 100%;">
          <span>自我评价:</span>
          <p style="width: 100%;padding-top: 4px;word-wrap: break-word;" v-html='resumeList.evaluation'>{{resumeList.evaluation}}</p>
        </div>
      </div>
  </div>   
<ReumenShowExp ref="whateverChild" v-on:jobData='getJobData' v-on:proData='getProData' v-on:eduData='getEduData' v-on:trianData='getTrianData'
v-on:skillData='getSkillData' v-on:laguData='getLaguData'  v-on:awardData='getAwardData' v-on:certData='getCertData'></ReumenShowExp>
  <div style="padding-bottom: 20px;display: none">
      <yd-button style="height: 34px;border-radius: 6px;width: 94%;margin: 0px auto;font-size: 16px" type="primary" size="large"  v-show='updatebtn'  @click.native='updateresume' >修改简历</yd-button>
  </div>
  <div class="btns" v-show=isShowAplly>
     <div style="background:#5cb85c;width: 100%;padding: 10px;"  @click="submitResume()" >
          <span style='color: #fff' >提交简历</span>
     </div>
     <div style="border:1px solid #5cb85c;width: 40%;padding: 10px;display: none;" @click="editResume()">            
          <span style="color:#5cb85c;">修改简历</span>
     </div>
  </div>
   <select  slot="right" id="top_education" style="display: none;"></select>
   <select  slot="right" id="nations" style="display: none;"></select>
</div>
</template>
<script src="//static.ydcss.com/uploads/ydui/ydui.citys.js"></script>
<script>
    import ReumenShowExp from "./ReumenShowExp";
    import Curriculum from "./Curriculum";
    import { Toast,Indicator, MessageBox} from 'mint-ui';
    var content=Curriculum ;
    export default {
        components:{    
            ReumenShowExp,
            Curriculum 
           },
        data () {
            return {
               title:'',
               resumeList:[],
               resumeListsave:[],
               isShowAplly: false,
               isShowView: false,
               updatebtn:false,
               edu:false,
               haveedu:false,
               data:{
                    isShow:false,
                    value:'',
                    base_id: this.$route.params.base_id                                    
                },
                jobData:[],                
                  age:'',
                  name:'',
                  mobile:'',
                  card_no:'',
                  email:'',
                  selectedsex:'',
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
                  JobData:'',
                  ProData:'',
                  EduData:'',
                  TrianData:'',
                  SkillData:'',
                  LaguData:'',
                  AwardData:'',
                  CertData:'',
                  object_id:'',


            }
        },
        beforeCreate () {
            //this.$dialog.toast({mes: `1`});
        },
        created () {
           Indicator.open({   //打开loading
              spinnerType: 'fading-circle',
            });
        },
        mounted () { 
             this.baseinfor();
             this.hideBtn();
        },
        beforeRouteEnter (to, from, next) {
         
           if(from.name=='home'){
            next(vm => {
               vm.title='我的简历';
               next();
              })
           }else{
             next(vm => {
               vm.title='我的简历';
               next();
              })
           }
         },
        methods:{
        getJobData(data){
          this.JobData=data;         
        },
        getProData(data){
        this.ProData=data;
        },
        getEduData(data){
        this.EduData=data;
        },
        getTrianData(data){
          this.TrianData=data;        
        },
        getSkillData(data){
        this.SkillData=data;
        },
        getLaguData(data){
        this.LaguData=data;
        },
        getAwardData(data){
        this.AwardData=data;
        },
        getCertData(data){
        this.CertData=data;
        },
  
      back:function(){ 
        this.$router.go(-1);
      },
      updateresume(){
        this.$router.push({name:'Curriculum',params:{type:'view',obj_id:this.object_id}}); 
      },     
      editResume:function(){ //修改简历

         this.$router.push({name:'Curriculum',params:{type:'edit'}}) 
      },    
      hideBtn: function (){
        if(this.$route.query.type=='view'){
          this.isShowView=false;
          this.updatebtn=true;         
        }else if(this.$route.query.type=='apply'){
          this.isShowAplly=true;
           this.updatebtn=false;
        }
      },    
      updateResume:function(){
        this.$router.push({name:'home'})
      },
         baseinfor(){
            Indicator.open({   //打开loading
              spinnerType: 'fading-circle',
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
                          /*  Indicator.close()*/
                         _this.$dialog.toast({
                              mes: json_result.RESPONSE.HEAD.ERRORINFO,
                              timeout: 1000,
                            });
                             return;
                          }
                      _this.highsc=json_result.RESPONSE.LIST[0].DIPLOMAS
                      let highsc=json_result.RESPONSE.LIST[0].DIPLOMAS;
                      var nation = $("#nations");               
                      let nations=json_result.RESPONSE.LIST[0].FOLK;
                      for ( var i=0;i<nations.length;i++) {
                          var name=nations[i].NAME; 
                          var num= nations[i].NUMBER;   
                          nation.append("<option value='"+num+"'>"+name+"</option>"); 
                        }
                     var top_education = $("#top_education");          
                      for ( var i=0;i<highsc.length;i++) {
                      var name=highsc[i].NAME; 
                      var num= highsc[i].NUMBER;               
                     top_education.append("<option value='"+num+"'>"+name+"</option>");                              
                      } 
                      
                       setTimeout(function(){
                          Indicator.open({   //打开loading
                            spinnerType: 'fading-circle',
                          });
                        _this.findeResume();

                        },50)                      
                                                                                                 
               },function(){
                 _this.$dialog.toast({
                    mes: 'ESB网络异常',
                    timeout: 1000,
                  });
               }); 
                 
            },    
   findeResume:function (){
      let params = new URLSearchParams();
        params.append('wx_openid',_const.openId);
        let _this = this; 
        this.$http.post(_const.requestUrl+'/v1/user/findResume',params).then(function ( res ){
          _const.base_id=res.list.base_id;
          _this.resumeList=res.list;
          _this.object_id=res.list.object_id;      
          
          if(_this.resumeList.top_education==''){
            _this.edu=true;
            _this.haveedu=false;
          }else{
             _this.edu=false;
             _this.haveedu=true; 
          }
          if(_this.resumeList.reg_address==''){
            _this.resumeList.reg_address='未设置';
          }
          if(_this.resumeList.hope_salary==''){
            _this.resumeList.hope_salary='未设置';
          }
          if(_this.resumeList.native_place==''){
            _this.resumeList.native_place='未设置';
          }
          if(_this.resumeList.evaluation==''){
            _this.resumeList.evaluation='无';
          }
          if(_this.resumeList.current_address==''){
            _this.resumeList.current_address='未设置';
          }

          if(_this.resumeList.marriage=='1'){
            _this.resumeList.marriage_name='未婚'
          }else if(_this.resumeList.marriage=='2'){
            _this.resumeList.marriage_name='已婚'
          }else if(_this.resumeList.marriage=='3'){
             _this.resumeList.marriage_name='丧偶'
          }else if(_this.resumeList.marriage=='4'){
             _this.resumeList.marriage_name='离异'
          }
          if(_this.resumeList.current_work_status=='0'){
              _this.resumeList.current_work_status_name='在岗'
          }else if(_this.resumeList.current_work_status=='1'){
              _this.resumeList.current_work_status_name='待岗'
          }
          if(_this.resumeList.evaluation){
            _this.resumeList.evaluation=_this.resumeList.evaluation.replace(/\n|\r\n/g,"<br/>");
          }
         console.log(  $("#top_education option[value='"+_this.resumeList.top_education+"']").text());
         _this.resumeList.top_education_name= $("#top_education option[value='"+_this.resumeList.top_education+"']").text();
         _this.resumeList.nation_name= $("#nations option[value='"+_this.resumeList.nation+"']").text();

        });


     },

submitResume:function(){ //提交申请
if(this.check()){
 let jobExp = this.JobData ; //工作经验
 if(this.JobData==0){
  jobExp=""; 
 }else{
   for (var i = 0; i < jobExp.length; i++) {
          delete jobExp[i].w_create_time;
          delete jobExp[i].w_update_time;         
         jobExp[i].old_work_id=  jobExp[i].work_id;
          delete jobExp[i].work_id;

        }    
  }

let attrjob=[];
for(var i=0;i<jobExp.length;i++){
   let obj= new Object();
     obj["COMPANY"]=jobExp[i].company;
     obj["DATESTART"]=jobExp[i].start_time;
     obj["DATEEND"]=jobExp[i].end_time;
     obj["POSITION"]=jobExp[i].job_title;
     obj["JOBDESCRIPTION"]=jobExp[i].job_description.replace(/<br\/>/g, "\n");
     attrjob.push(obj);
}

  let proExp = this.ProData ; //项目
  if(proExp.length==0){
   proExp="";
  }else{
    for (var i = 0; i < proExp.length; i++) {
        delete proExp[i].pro_create_time;
        delete proExp[i].pro_update_time;
         proExp[i].old_project_id=  proExp[i].project_id;
        delete proExp[i].project_id;
      } 
    }

  let attrpro=[];
    for(var i=0;i<proExp.length;i++){
       let obj= new Object();
         obj["DATESTART"]=proExp[i].start_time;
         obj["ROLE"]=proExp[i].start_time;
         obj["PROJECTNAME"]=proExp[i].project_name;
         obj["DATEEND"]=proExp[i].end_time;
         obj["MAINDUTY"]=proExp[i].main_duty.replace(/<br\/>/g, "\n");;
         obj["PDESCRIPTION"]=proExp[i].project_description.replace(/<br\/>/g, "\n");;
         attrpro.push(obj);
    }

 let trianExp = this.TrianData ; //培训
 if(trianExp.length==0){
  trianExp="";
 }else{
   for (var i = 0; i < trianExp.length; i++) {
      delete trianExp[i].train_create_time;
      delete trianExp[i].train_update_time;
     trianExp[i].old_train_id=  trianExp[i].train_id;
     delete trianExp[i].train_id;
    }
 }
   let attrtrian=[];
    for(var i=0;i<trianExp.length;i++){
       let obj= new Object();
         obj["DATESTART"]=trianExp[i].start_time;
         obj["TRAININGNAME"]=trianExp[i].train_company;
         obj["COURSEDESCRIPTION"]=trianExp[i].class_description.replace(/<br\/>/g, "\n");;
         obj["DATEEND"]=trianExp[i].end_time;
         attrtrian.push(obj);
    }
 
  let eduExp = this.EduData ; //教育
  if(eduExp.length==0){
   eduExp ="";
  }else{
      for (var i = 0; i < eduExp.length; i++) {
      delete eduExp[i].edu_create_time;
      delete eduExp[i].edu_update_time;
     eduExp[i].old_education_id=  eduExp[i].education_id;
    delete eduExp[i].education_id;
    } 
  }

   let attredu=[];
    for(var i=0;i<eduExp.length;i++){
       let obj= new Object();
         obj["MAJOR"]=eduExp[i].profession;
         obj["DATESTART"]=eduExp[i].join_shcool;
         obj["SCHOOL"]=eduExp[i].shcool_name;
         obj["DIPLOMAS"]=eduExp[i].eduction_degree;
         obj["DEGREE"]=eduExp[i].eduction_record;
         obj["DATEEND"]=eduExp[i].out_shcool;
         attredu.push(obj);
    }


   let certExp = this.CertData ; //资格证书
   if(certExp.length==0){
    certExp="";
        }else{
          for (var i = 0; i < certExp.length; i++) {
          delete certExp[i].award_create_time;
          delete certExp[i].award_update_time;
         certExp[i].old_award_id=  certExp[i].award_id;
          delete certExp[i].award_id;
      }
   }

   let attcert=[];
    for(var i=0;i<certExp.length;i++){
       let obj= new Object();
         obj["NAME"]=certExp[i].award_title;
         obj["DATE"]=certExp[i].get_award_time;
         obj["ISSUER"]=certExp[i].company;
         attcert.push(obj);
    }

 let laguExp = this.LaguData ; //语言技能
 if(laguExp.length==0){
  laguExp="";
        }else{
            for (var i = 0; i < laguExp.length; i++) {
          
            delete laguExp[i].language_update_time;
            delete laguExp[i].language_create_time;
            laguExp[i].old_language_id=  laguExp[i].language_id;
            delete laguExp[i].language_id;
          }
        }

   let attlagu=[];
    for(var i=0;i<laguExp.length;i++){
       let obj= new Object();
         obj["LV"]=laguExp[i].language_level;
         obj["LANGUAGE"]=laguExp[i].language;
         obj["LISTENINGSPEAKING"]=laguExp[i].hearspeak;
         obj["READINGWRITING"]=laguExp[i].readwrite;
         attlagu.push(obj);
    }     

  let skillExp = this.SkillData ; //技能展示
  if(skillExp.length==0){
    skillExp="";
        }else{
            for (var i = 0; i < skillExp.length; i++) {
        /*    delete skillExp[i].professions_id;*/
            delete skillExp[i].professions_update_time;
            delete skillExp[i].professions_create_time;
             skillExp[i].old_professions_id=  skillExp[i].professions_id;
            delete skillExp[i].professions_id;
          }
        }

  let attskill=[];
    for(var i=0;i<skillExp.length;i++){
       let obj= new Object();
         obj["PROFICIENCY"]=skillExp[i].proficiency;
         obj["SKILLNAME"]=skillExp[i].professions_title;
         attskill.push(obj);
    }      

  let awardExp = this.AwardData ; //获奖经历
  if( awardExp.length==0){
    awardExp="";
        }else{
            for (var i = 0; i < awardExp.length; i++) {
         /*   delete awardExp[i].award_proccess_id;*/
            delete awardExp[i].award_proccess_create_time;
            delete awardExp[i].award_proccess_update_time;
            awardExp[i].old_award_proccess_id=  awardExp[i].award_proccess_id;
            delete awardExp[i].award_proccess_id;
          } 
        }
  let attaward=[];
    for(var i=0;i<awardExp.length;i++){
       let obj= new Object();
         obj["DESCRIPTION"]=awardExp[i].mark.replace(/<br\/>/g, "\n");;
         obj["DATE"]=awardExp[i].award_time;
          obj["REWARDNAME"]=awardExp[i].award_name;
         attaward.push(obj);
    }
   if(attrjob.length==0){
    Toast('工作经历不能为空')
    return false;
   }
   if(attredu.length==0){
    Toast('教育经历不能为空')
    return false;
   } 
   let savesex='';
   if(this.resumeList.sex=='男'){
    savesex='0'
   }else if(this.resumeList.sex=='女'){
     savesex='1'
   }  
  let urlcheck=  _const.requestUrl+'/v1/resume/checkResume';
   let paramscheck = new URLSearchParams();
       paramscheck.append('fid',this.$route.query.fid);
       paramscheck.append('user_id',this.resumeList.user_id);
       let _this=this;
       this.$http.post(urlcheck,paramscheck).then(function ( res ) {
        console.log(res);
        if(res.status==false){
           Indicator.close();
            Toast({message:res.msg,duration: 3000});
            return;
      }else{        
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
            "RECURITMENTID":_this.$route.query.fid,
            "RESUMETYPE":_this.$route.query.ty,
            "MOBILEPHONE":_this.resumeList.mobile,
            "SELFDESCRIPTION":_this.resumeList.evaluation.replace(/<br\/>/g, "\n"),
            "PROJECTEXP":attrpro,
            "WED": _this.resumeList.marriage,
            "SKILLEXP": attskill,
            "EXPECTANTPAY": _this.resumeList.hope_salary,
            "DOMICILEPLACE": _this.resumeList.reg_address,
            "SEX": savesex,
            "AWARDEXP":attaward,
            "EMAIL":_this.resumeList.email,
            "IDCARDNO":_this.resumeList.card_no,
            "NATIVEPLACE": _this.resumeList.native_place,
            "CURRENTWORKINGSTATUS": _this.resumeList.current_work_status,
            "TYPE": "2",
            "NAME": _this.resumeList.name,
            "AGE": _this.resumeList.age,
            "TRAININGEXP": attrtrian,
            "EDUCATIONEXP":attredu,
            "CREDENTIALEXP":attcert,
            "LANGUAGEEXP": attlagu,
            "NOWRESIDENCE": _this.resumeList.current_address,
            "FOLK": _this.resumeList.nation,
            "POLITICALFACE":_this.resumeList.politics,
            "WORKEXP": attrjob,
          }
        ]
      }
    };
 let url=_const.testUrl+'/WP_CQP_SOA/APP_PUBLIC_SERVICES/Proxy_Services/TA_HR/HR_Recruit_03_SaveResume_PS';
  
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
          console.log(res);
            Indicator.close();
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
             let datas = {
                    "data": [
                    { 
                      "fid":_this.$route.query.fid,
                      "object_id":obj_id,
                      "jobs_id":_this.$route.query.job_id,
                      "user_id": _this.resumeList.user_id,
                      "name": _this.resumeList.name,
                      "card_no": _this.resumeList.card_no,
                      "sex": _this.resumeList.sex,
                      "age": _this.resumeList.age,
                      "native_place": _this.resumeList.native_place,
                      "nation":  _this.resumeList.nation,
                      "politics":_this.resumeList.politics,
                      "reg_address":_this.resumeList.reg_address,
                      "current_address": _this.resumeList.current_address,
                      "top_education": _this.resumeList.top_education,
                      "mobile": _this.resumeList.mobile,
                      "email":  _this.resumeList.email,
                      "marriage": _this.resumeList.marriage,
                      "current_work_status": _this.resumeList.current_work_status,
                      "hope_salary":_this.resumeList.hope_salary,
                      "evaluation":_this.resumeList.evaluation,
                      "resume_work": jobExp,
                      "resume_education": eduExp,
                      "resume_project": proExp,
                      "resume_train": trianExp,
                      "resume_award": certExp,
                      "resume_language": laguExp,
                      "resume_professions": skillExp,
                      "resume_award_proccess": awardExp
                    }
                  ]
                };  
                

              let urls =_const.requestUrl+'/v1/resume/submitResume';
                  $.post(urls,datas,function(res){
                  console.log(res);
                  if(res.data.status==false){
                     Indicator.close();
                     _this.$dialog.toast({
                            mes:res.data.msg,
                            timeout: 1000,                         
                          });
                  }else if (res.data.status==true) {
                       _this.$dialog.toast({
                            mes: '申请成功',
                            timeout: 1000,
                            icon: 'success'
                          });
                    setTimeout(function(){
                     _this.$router.go(-1);
                    },1000);
                  } 

               });

        },function(){
              _this.$dialog.toast({
                  mes: '网络异常',
                  timeout: 1000,
                });
           });
         }
       })

       } 

  },


  toggle: function(){
      this.data.isShow = !this.data.isShow;
  },
  check(){
        if(this.resumeList.name == '') {
          Toast({
            message: "姓名不能为空",
            duration: 1500
          });
          return false;
        }
        if(this.resumeList.length == '') {
          Toast({
            message: "手机号不能为空",
            duration: 1500
          });
          return false;
        }
        if(this.resumeList.card_no == '') {
          Toast({
            message: "身份证不能为空",
            duration: 1500
          });
          return false;
        }
        if(this.resumeList.email == '') {
          Toast({
            message: "邮箱不能为空",
            duration: 1500
          });
          return false;
        }
        if(this.resumeList.current_address == '') {
          Toast({
            message: "居住地不能为空",
            duration: 1500
          });
          return false;
        }
        if(this.resumeList.top_education==''){
             Toast({
              message: "学历不能为空",
              duration: 1500
            });
            return false;
          }
        if(this.resumeList.politics == '') {
          Toast({
            message: "政治面貌不能为空",
            duration: 1500
          });
          return false;
        }
        if(this.resumeList.current_work_status == '') {
          Toast({
            message: "工作状态不能为空",
            duration: 1500
          });
          return false;
        }
        return true;

  },
               
}
    }
</script>
<style scoped lang='less'>
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
 .itemexp{
    display: flex;
     display: -webkit-flex;
 }
section{
  background: #fff !important;
}

::-webkit-input-placeholder { /* WebKit browsers */
    color:    #999;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color:    #999;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
    color:    #999;
}
:-ms-input-placeholder { /* Internet Explorer 10+ */
    color:    #999;
}
.projectExperience{
    margin: 0.5rem 0;
}
.exp{
    color: #4c4c4c;
    border-bottom: 1px solid #eee;
    display: flex; 
     display: -webkit-flex;
    justify-content: space-between;
    font-size: 15px;

   }
          i{
    font-size: 15px;
     }
  .mid>div{
    font-size: 12px;
    color: #808080;
    margin: 15px 0;
    display: flex;
     display: -webkit-flex;
    width: 100%;   
  }
  .mid>div>span{
    letter-spacing: 1px;
  }
  .mid>div>span:nth-child(1){
    flex: 0.4;
  }
    .mid>div>span:nth-child(2){
    flex: 0.6;
  }
  .top{
    align-items: center;
    padding: 15px 15px 0 15px;
  }
   .view_msg div{
    background: #fff;
   }
   .btns{
    width: 100%;
     display: flex;
      display: -webkit-flex;
     text-align: center;
     font-size: 17px;
      position: fixed;
    bottom: 0;
    left: 0;
   }
   .navbar{
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
   }
   .mint-toast{
    width: 80% !important;
   }    
</style>