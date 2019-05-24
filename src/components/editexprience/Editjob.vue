<template>
<div>
   <div class="nav" >
       <i class="fa fa-angle-left"  @click='back' style="color:#04be02 "></i>
       <span>{{title}}</span>
       <span @click='submit' style="color:#04be02 ">保存</span>
    </div>
   <div class="information">
        <yd-cell-group>
            <yd-cell-item arrow >
                <span slot="left">开始时间</span>
                <yd-datetime type="date" start-year='1990'  :init-emit="false" v-model="start_time" slot="right" placeholder="请选择"></yd-datetime>
            </yd-cell-item>
            <yd-cell-item arrow>
                <span slot="left">结束时间</span>
                 <yd-datetime type="date"  start-year='1990' :init-emit="false" v-model="end_time" slot="right" placeholder="请选择"></yd-datetime>
            </yd-cell-item>  
            <yd-cell-item>
                <span slot="left">公司名称</span>
                <input slot="right" type="text" name="card_no"  v-model='company'  placeholder="请输入公司名称"   maxlength="20">
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">所任职位</span>
                <input slot="right" type="text" name="email"  v-model='job_title'  placeholder="请输入所任职位"   maxlength="20">
            </yd-cell-item>

            <div style="width: 94%;margin:10px auto">
              <span style="width: 21%;color: #4c4c4c">工作描述</span>
            </div>
            <yd-cell-item>
                <yd-textarea slot="right" placeholder="请输入工作描述" maxlength="500" v-model='job_description'></yd-textarea>
            </yd-cell-item>                   
        </yd-cell-group>
    </div>
</div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  name: 'Editjob',
  data () {
      return {
        jobList:[],
         baselist:[],
        title:'',
        jobDtat:'',
        Status:'',
        start_time:'',
        end_time:'',
        company:'',
        job_title:'',
        job_description:'',
        time:'',      
      }
        },
  beforeCreate () {
  },
  created () {
     this.getNowFormatDate();
    this.findResume();
  },
  mounted () {
   
    if(this.$route.query.type==='edit'){
      this.show();
      this.title='编辑工作经历';
    }else if(this.$route.query.type==='add'){
      var myDate = new Date();
      this.title='添加工作经历';
      this.end_time=this.time;
    }   
  },
   methods:{
     findResume(){               //查找是否有简历
        var params = new URLSearchParams();
        params.append('wx_openid', _const.openId);
        let _this=this; 
         this.$http.post(_const.requestUrl+'/v1/user/findResume',params).then(function ( res ){
          _this.baselist=res.list
           console.log( _this.baselist)
      })},
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      var currentdate1=year;
       var currentdate2= month;
      this.time= currentdate;
    },

    back:function(){     
    this.$router.go(-1);
      },
    show:function(){
      this.jobDtat=this.$route.query.jobTable;
      this.company=this.jobDtat.company;
      this.job_title=this.jobDtat.job_title;
      this.job_description=this.jobDtat.job_description;
      this.end_time=this.formatDate(this.jobDtat.end_time);
      this.start_time=this.formatDate(this.jobDtat.start_time);
      this.work_id=this.jobDtat.work_id;
      console.log(this.jobDtat)
   
    },
    submit:function(){
       
        var params = new URLSearchParams();
        params.append('company', this.company);
        params.append('job_title',this.job_title);
        params.append('job_description', this.job_description);
        params.append('start_time', this.start_time);
        params.append('end_time', this.end_time);
       if(this.$route.query.type==='edit'){             //修改
         if(this.check()){
        params.append('work_id', this.work_id);
        let _this = this;
        this.$http.post(_const.requestUrl+'/v1/user/editWork',params).then(function ( res ){ 
              console.log(res);
              setTimeout(function(){                 
                _this.$dialog.toast({
                      mes: '保存成功',
                     timeout: 1000,
                      icon: 'success'
                  });
                  _this.getJobData();
             },1000); 
               _this.$router.back(-1);
          });
          }          
       }else if(this.$route.query.type==='add'){        //添加 

        if(this.check()){
            params.append('base_id',_const.base_id);
            let _this = this;
            this.$http.post(_const.requestUrl+'/v1/user/addWork',params).then(function ( res ){
              console.log(res);
              setTimeout(function(){                 
                _this.$dialog.toast({
                      mes: '添加成功',
                     timeout: 1000,
                      icon: 'success'
                  });
                _this.getJobData();
             },1000); 
               _this.$router.go(-1);   
            });
        }      

       }
    },
     getJobData:function(){    //获取
        var paramsList=new URLSearchParams(); 
             paramsList.append('base_id',_const.base_id);
              let _this = this;
            this.$http.post(_const.requestUrl+'/v1/user/worklist',paramsList).then(function ( res ){
              _this.jobList.push(res.list.data);
               let attrproSave=[];
           for(var i=0;i<_this.jobList[0].length;i++){
           let obj= new Object();
             obj["COMPANY"]=_this.jobList[0][i].company;
             obj["DATESTART"]=_this.jobList[0][i].start_time;
             obj["DATEEND"]=_this.jobList[0][i].end_time;
             obj["POSITION"]=_this.jobList[0][i].job_title;
             obj["JOBDESCRIPTION"]=_this.jobList[0][i].job_description;
            attrproSave.push(obj);
          }
          setTimeout(function(){
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
                "OBJECTID": _this.$route.query.objid,
                  "RESUMETYPE": "2",
                  "MOBILEPHONE": _this.baselist.mobile,
                  "SELFDESCRIPTION": _this.baselist.evaluation,
                  "PROJECTEXP":'',
                  "WED": _this.baselist.marriage,
                  "SKILLEXP": '',
                  "EXPECTANTPAY":'',
                  "DOMICILEPLACE":'',
                  "SEX":'',
                  "AWARDEXP":'',
                  "EMAIL":_this.baselist.email,
                  "IDCARDNO":_this.baselist.card_no,
                  "NATIVEPLACE":_this.baselist.native_place,
                  "CURRENTWORKINGSTATUS":_this.baselist.current_work_status,
                  "TYPE": "1",
                  "NAME": _this.baselist.name,
                  "AGE":  '',
                  "TRAININGEXP":'',
                  "EDUCATIONEXP":'',
                  "CREDENTIALEXP":'',
                  "LANGUAGEEXP":'',
                  "NOWRESIDENCE":_this.baselist.current_address,
                  "FOLK": _this.baselist.nation,
                  "POLITICALFACE":_this.baselist.politics,
                  "WORKEXP":attrproSave,
                  /*"OBJECTID":'1'*/
                }
              ]
            }
          };
            console.log(datas)
             $.ajax({
              type:"post",
              url:urls,
              data:JSON.stringify(datas),
              dataType:'text',
              }).then(function(res){
                console.log(res)
              })

            },100)
                              
         });
    },
     check(){
      if(this.start_time.length == 0) {
          Toast({
            message: "请选择开始时间",
            duration: 1000
          });
          return false;
        }
       if(this.end_time.length == 0) {
        Toast({
          message: "请选择结束时间",
          duration: 1000
        });
        return false;
      }
       if(this.company.length == 0) {
        Toast({
          message: "公司名称不能为空",
          duration: 1000
        });
        return false;
      }
     if(this.company.length >20) {
        Toast({
          message: "公司名称不超过20字",
          duration: 1000
        });
        return false;
      }
      if(this.job_title.length == 0) {
        Toast({
          message: "所任职位不能为空",
          duration: 1000
        });
        return false;
      }
      if(this.job_title.length >30) {
        Toast({
          message: "职位不能超过30字",
          duration: 1000
        });
        return false;
      }
       if(this.job_description.length == 0) {
        Toast({
          message: "工作描述不能为空",
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
<style scoped >
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
.information{
  margin-top: 52px;
}
.information input,select{
    padding-left: 0.8rem;

}

.yd-cell-left{
  width: 20%;
}
.information span{
    display: inline-block;
    width: 100%;
    text-align-last:justify;
    font-size: 14px;

}

.yd-datetime-input{
  padding-left: 0.8rem;
}


</style>
