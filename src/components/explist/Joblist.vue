<template>
  <div>
    <div class="nav" >
       <i class="fa fa-angle-left"  @click='back' style="color:#04be02 "></i>
       <span>工作经历</span>
       <span @click='job_add' style="color:#04be02 ">添加</span>
    </div>
    <div v-show='show' style="text-align: center;margin-top: 100px">
      <p style="font-size: 16px;color: #999">您还未添加工作/实习经历~~~</p>
      <p style="font-size: 12px;color: red;margin-top: 10px;">请从最近一次经历添加起</p>
    </div> 
   <div class="joblist page-cell-swipe-wrapper" v-for="(item,index) in jobList" :key='item.index' style="margin-top: 52px">
    <mt-cell-swipe  v-for="(val,index) in item" :key='index'
            :right="[
                {
                    content: '删除',
                    style: { background: '#ff0000', color: '#fff'},
                    handler: () => deleteSection(index),

                }
            ]">
        <ul @click='editJob(index,$event)'  >
          <li style="display: flex;flex-direction:column ; " class="caozuo">
          <span style="color: #4c4c4c;font-size: 15px;font-weight: bold; ">{{val.company}}</span>
          <p style="font-size: 12px;color: #999;padding-top: 10px;">{{val.start_time}}-{{val.end_time}}</p>
         </li>
          <li class="del" style="line-height: 37px;position: absolute;right: 40px"><span style="line-height: 32px;color: red"  @click='delet(index)'>删除</span></li>
          <li style="line-height: 37px"><span style="line-height: 32px;color: #04be02">编辑</span></li>
        </ul>

    </mt-cell-swipe>
    </div>
  </div>
</template>

<script>

export default {
  data () {
      return {
          jobList:[],
           baselist:[],
          show:false        
      }
    },
  beforeCreate () {
  },
  created () {
    this.findResume();
  },
  mounted () {
      this.getJobData();
  
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
   delet(index){
       this.deleteSection(index);
     },
    deleteSection (index,e) {                                         //删除
       if(this.jobList[0].length==1){
           this.$dialog.toast({mes: '最后一条可修改不可删除', timeout: 2000}); 
         return;
       }else {
          this.$dialog.confirm({
            title: '提示',
            mes: '确定要删除此项吗？',
            opts: () => {
                         
                let work_id = this.jobList[0][index].work_id;
                var delparms=new URLSearchParams(); 
                delparms.append('work_id',work_id);
                let _this = this;
                this.$http.post(_const.requestUrl+'/v1/user/delWork',delparms).then(function ( res ){
       
                  _this.jobList[0].splice(index, 1);

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
              console.log(JSON.stringify(datas))
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
                this.$dialog.toast({mes: '已删除', timeout: 1000});               
            }
        });
      }
    },

    back:function(){     
    this.$router.go(-1);
      },
    getJobData:function(){    //获取
        var paramsList=new URLSearchParams(); 
             paramsList.append('base_id',_const.base_id);
              let _this = this;
            this.$http.post(_const.requestUrl+'/v1/user/worklist',paramsList).then(function ( res ){
              _this.jobList.push(res.list.data);
              if(_this.jobList[0].length==0){
                _this.show=true;
              }
              for(var i=0;i<_this.jobList[0].length;i++){
                /* _this.jobList[0][i].start_time=_this.getLocalTime(_this.jobList[0][i].start_time);
                _this.jobList[0][i].end_time=_this.getLocalTime(_this.jobList[0][i].end_time);*/
              }                               
            });
    },
    editJob:function(index,e){   //编辑工作经验
       let jobTable= this.jobList[0][index];
       this.$router.push({name:'Editjob',query:{ jobTable:jobTable,type:'edit',id:index} });

    },
    job_add:function(){    //增加工作经验
         this.$router.push({name:'Editjob',query: { type:'add'} }); 
      },

  },
}
</script>
<style scoped lang="less">
.caozuo{
   display: -webkit-flex;
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
.joblist{
  background: #fff;
  box-sizing:border-box;
 
  margin: auto;
   padding: 0 15px;
  ul{
    display: flex;
     display: -webkit-flex;
    justify-content: space-between;
    position: absolute;
    left: 0;
     width: 100%;
     li{
      list-style: none;
     }
  }
  i{
    font-size: 18px;
    color: #999;
    line-height: 40px;
    position: absolute;
    right: 0;
  }

}
.mint-cell-wrapper{

}
.mint-cell{
  min-height: 60px;
}

</style>
