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
                <span slot="left">项目名称</span>
                <input slot="right" type="text" v-model="project_name" placeholder="请输入项目名称"   maxlength="20">
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">担任角色</span>
                <input slot="right" type="text" v-model="job_title" placeholder="请输入担任角色"   maxlength="20">
            </yd-cell-item>
            <div style="width: 94%;margin:10px auto">
              <span style="width: 21%;color: #4c4c4c">主要职责</span>
            </div>
            <yd-cell-item>
                <yd-textarea slot="right" placeholder="请输入主要职责" maxlength="500" v-model="main_duty"></yd-textarea>
            </yd-cell-item>
            <div style="width: 94%;margin:10px auto">
              <span style="width: 21%;color: #4c4c4c">项目描述</span>
            </div>
            <yd-cell-item>
                <yd-textarea slot="right" placeholder="请输入项目描述" maxlength="500" v-model="project_description"></yd-textarea>
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
        proList:[],
       title:'',
        Status:'',
        editDtat:'',
        project_name:'',
        job_title:'',
        start_time:'',
        end_time:'',
        project_description:'',
        main_duty:'',
        project_id:'',
        newbase_id:'',
        baselist:[],
        obj_id:''
      }
        },
  beforeCreate () {
  },
  created () {
    this.findResume();
    this.newbase_id=this.$route.query.newbase_id; 
  },
  mounted () {
   if(this.$route.query.type==='edit'){
      this.show();
      this.title='编辑项目经历';
    }else if(this.$route.query.type==='add'){
      this.title='添加项目经历';
    } 
  },
   methods:{
    findResume(){
      let params = new URLSearchParams();
        params.append('job_id',this.$route.query.newbase_id);
        let _this = this; 
        this.$http.post(_const.requestUrl+'/v1/userrecord/findResume',params).then(function ( res ){
            _this.baselist=res.list;
             _this.obj_id=res.list.object_id;
        console.log(res)
        });

     },
    back:function(){     
    this.$router.go(-1);
      },
    show:function(){
   let editDtat=this.$route.query.editTable;
      this.project_name=editDtat.project_name;
      this.job_title=editDtat.job_title;
      this.project_description=editDtat.project_description;
      this.main_duty=editDtat.main_duty;
      this.project_id=editDtat.project_id;
        this.end_time=this.formatDate(editDtat.end_time);
       this.start_time=this.formatDate(editDtat.start_time);  
    },
    submit:function(){
        var params = new URLSearchParams();
       // params.append('project_id', this.project_id);
        params.append('project_name', this.project_name);
        params.append('job_title',this.job_title);
        params.append('main_duty', this.main_duty);
        params.append('project_description',this.project_description);
        params.append('start_time', this.start_time);
        params.append('end_time', this.end_time);
        if(this.$route.query.type==='edit'){             //修改
           if(this.check()){
                params.append('project_id', this.project_id);
                let _this = this;
                this.$http.post(_const.requestUrl+'/v1/userrecord/editProject',params).then(function ( res ){ 
                      console.log(res);
                      setTimeout(function(){                 
                        _this.$dialog.toast({
                              mes: '保存成功',
                             timeout: 1000,
                              icon: 'success'
                          });
                        _this.getProData();
                     },1000); 
                       _this.$router.go(-1);
                  });
                  }          
               }else if(this.$route.query.type==='add'){        //添加
               if(this.check()){
                    let paramsf = new URLSearchParams();
                  paramsf.append('job_id',this.$route.query.id);
                  let _this = this; 
                  this.$http.post(_const.requestUrl+'/v1/userrecord/findResume',paramsf).then(function ( res ){
                     if(res.list.base_id){
                      let newbase_id=res.list.base_id;
                      _this.newbase_id=res.list.base_id;
                      params.append('base_id',res.list.base_id);
                      _this.$http.post(_const.requestUrl+'/v1/userrecord/addProject',params).then(function ( res ){
                          console.log(res);
                          setTimeout(function(){                 
                            _this.$dialog.toast({
                                  mes: '添加成功',
                                 timeout: 1000,
                                  icon: 'success'
                              });
                            _this.getProData();
                         },1000); 
                           _this.$router.go(-1);   
                        })


                     }
                  
                  });
               }       
        }
    },
    getProData:function(){    //获取
     var paramsList=new URLSearchParams(); 
         paramsList.append('base_id',this.newbase_id);
          let _this = this;
        this.$http.post(_const.requestUrl+'/v1/userrecord/projectlist',paramsList).then(function ( res ){
          _this.proList.push(res.list.data);
          let attrproSave=[];
          for(var i=0;i<_this.proList[0].length;i++){
           let obj= new Object();
             obj["DATESTART"]=_this.proList[0][i].start_time;
             obj["ROLE"]=_this.proList[0][i].job_title;
             obj["PROJECTNAME"]=_this.proList[0][i].project_name;
             obj["DATEEND"]=_this.proList[0][i].end_time;
             obj["MAINDUTY"]=_this.proList[0][i].main_duty;
             obj["PDESCRIPTION"]=_this.proList[0][i].project_description;
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
                 "OBJECTID": _this.obj_id,
                      "RESUMETYPE": "2",
                      "MOBILEPHONE": _this.baselist.mobile,
                      "SELFDESCRIPTION": _this.baselist.evaluation,
                      "PROJECTEXP":attrproSave,
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
                      "TYPE": "3",
                      "NAME": _this.baselist.name,
                      "AGE":  '',
                      "TRAININGEXP":'',
                      "EDUCATIONEXP":'',
                      "CREDENTIALEXP":'',
                      "LANGUAGEEXP":'',
                      "NOWRESIDENCE":_this.baselist.current_address,
                      "FOLK": _this.baselist.nation,
                      "POLITICALFACE":_this.baselist.politics,
                      "WORKEXP":'',
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
       if(this.project_name.length == 0) {
        Toast({
          message: "项目名称不能为空",
          duration: 1000
        });
        return false;
      }
      if(this.project_name.length>20) {
        Toast({
          message: "项目名称不超过30字",
          duration: 1000
        });
        return false;
      }
      if(this.job_title.length >20) {
        Toast({
          message: "项目角色不超过20字",
          duration: 1000
        });
        return false;
      }
      if(this.job_title.length == 0) {
        Toast({
          message: "角色不能为空",
          duration: 1000
        });
        return false;
      }
      if(this.job_title.length == 0) {
        Toast({
          message: "角色不能为空",
          duration: 1000
        });
        return false;
      }
      if(this.main_duty.length == 0) {
        Toast({
          message: "职责不能为空",
          duration: 1000
        });
        return false;
      }
       if(this.project_description.length == 0) {
        Toast({
          message: "项目描述不能为空",
          duration: 1000
        });
        return false;
      }
      return true;
     }
  }

}
</script>
<style scoped>
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
