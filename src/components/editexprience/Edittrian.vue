<template>
 <div>
   <div class="nav" >
       <i class="fa fa-angle-left"  @click='back' style="color:#04be02 "></i>
       <span>{{title}}</span>
       <span @click='submit' style="color:#04be02 ">保存</span>
    </div>
   <div class="information">
        <yd-cell-group>
            <yd-cell-item arrow>
                <span slot="left">开始时间</span>
                <!--  <input slot="right" type="number" placeholder="" value="" v-model='start_time'> --> 
                 <yd-datetime type="date" start-year='1990' :init-emit="false" v-model="start_time" slot="right" placeholder="请选择"></yd-datetime> 
            </yd-cell-item>
           <yd-cell-item arrow> 
                <span slot="left">结束时间</span>
                  <yd-datetime type="date" start-year='1990' :init-emit="false"  v-model="end_time" slot="right" placeholder="请选择"></yd-datetime> 
            </yd-cell-item>  
            <yd-cell-item>
                <span slot="left">培训机构</span>
                <input slot="right" type="text" placeholder="请输入培训机构"  v-model='train_company'   maxlength="20">
            </yd-cell-item>
            <div style="width: 94%;margin:10px auto">
              <span style="width: 21%;color: #4c4c4c">课程描述</span>
            </div>
            <yd-cell-item>
                <yd-textarea slot="right" placeholder="请输入课程描述" maxlength="500" v-model='class_description'></yd-textarea>
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
        trianList:[],
        title:'',
        start_time:'',
        end_time:'',
        train_company:'',
        class_description:'',
        train_id:'',
        Status:'',
        baselist:[]
      }
    },
  beforeCreate () {
  },
  created () {
    this.findResume();
  },
  mounted () {
    if(this.$route.query.type==='edit'){
      this.show();
      this.title='编辑培训经历';
    }else if(this.$route.query.type==='add'){
      this.title='添加培训经历';
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
    back:function(){     
    this.$router.go(-1);
      },
     show:function(){
      this.trianDtat=this.$route.query.editTable;
      this.train_company=this.trianDtat.train_company;
      this.class_description=this.trianDtat.class_description;
      this.end_time=this.formatDate(this.trianDtat.end_time);
      this.start_time=this.formatDate(this.trianDtat.start_time);
      this.train_id=this.trianDtat.train_id;

    },
    submit:function(){
      var params = new URLSearchParams();
       // params.append('train_id', this.train_id);
        params.append('class_description', this.class_description);
        params.append('train_company',this.train_company);
        params.append('start_time', this.start_time);
        params.append('end_time', this.end_time);
        if(this.$route.query.type==='edit'){             //修改
             if(this.check()){
                params.append('train_id', this.train_id);
                let _this = this;
                this.$http.post(_const.requestUrl+'/v1/user/editTrain',params).then(function ( res ){ 
                      console.log(res);
                      setTimeout(function(){                 
                        _this.$dialog.toast({
                              mes: '保存成功',
                             timeout: 1000,
                              icon: 'success'
                          });
                           _this.getData();
                     },1000); 
                       _this.$router.go(-1);
                  }); 
                 }          
               }else if(this.$route.query.type==='add'){        //添加  
                  if(this.check()){
                    params.append('base_id',_const.base_id);
                    let _this = this;
                    this.$http.post(_const.requestUrl+'/v1/user/addTrain',params).then(function ( res ){
                      console.log(res);                    
                      setTimeout(function(){                 
                        _this.$dialog.toast({
                              mes: '添加成功',
                             timeout: 1000,
                              icon: 'success'
                          });
                        _this.getData();
                     },1000); 
                       _this.$router.go(-1);   
                    });

                  }                 
               }
    },
     getData:function(){    //获取
     var paramsList=new URLSearchParams(); 
         paramsList.append('base_id',_const.base_id);
          let _this = this;
        this.$http.post(_const.requestUrl+'/v1/user/trainlist',paramsList).then(function ( res ){
          _this.trianList.push(res.list.data);
           let attrproSave=[];
           for(var i=0;i<_this.trianList[0].length;i++){
           let obj= new Object();
              obj["DATESTART"]=_this.trianList[0][i].start_time;
             obj["TRAININGNAME"]=_this.trianList[0][i].train_company;
             obj["COURSEDESCRIPTION"]=_this.trianList[0][i].class_description;
             obj["DATEEND"]=_this.trianList[0][i].end_time;
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
                  "NATIVEPLACE":'',
                  "CURRENTWORKINGSTATUS":_this.baselist.current_address,
                  "TYPE": "1",
                  "NAME": _this.baselist.name,
                  "AGE":  '',
                  "TRAININGEXP":attrproSave,
                  "EDUCATIONEXP": '',
                  "CREDENTIALEXP":'',
                  "LANGUAGEEXP": '',
                  "NOWRESIDENCE":'',
                  "FOLK": '',
                  "POLITICALFACE":'',
                  "WORKEXP": '',
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
       if(this.train_company.length == 0) {
        Toast({
          message: "机构名称不能为空",
          duration: 1000
        });
        return false;
      }
       if(this.train_company.length>20) {
        Toast({
          message: "机构名称不超过20字",
          duration: 1000
        });
        return false;
      }
       if(this.class_description.length == 0) {
        Toast({
          message: "课程描述不能为空",
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
textarea{
  width: 100%;
  margin: 0.2rem auto;
}
.yd-datetime-input{
  padding-left: 0.8rem;
}
</style>
