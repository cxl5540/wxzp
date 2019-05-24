<template>
<div>
   <div class="nav" >
       <i class="fa fa-angle-left"  @click='back' style="color:#04be02 "></i>
       <span>{{title}}</span>
       <span @click='submit' style="color:#04be02 ">保存</span>
    </div>
   <div class="information">
        <yd-cell-group>
          <yd-cell-item>
                <span slot="left">技能名称</span>
                <input slot="right" type="text"  placeholder="请输入技能名称" v-model='professions_title'   maxlength="20">
            </yd-cell-item>
            <yd-cell-item arrow>
                <span slot="left">熟练程度</span>
            <select slot="right" v-model="proficiency">
                <option value="">请选择</option>
                <option value="2">一般</option>
                <option value="1">熟练</option>
                <option value="0">精通</option>
            </select>
            </yd-cell-item> 
        </yd-cell-group>

    </div>
</div> 
</template>

<script>
import { Toast } from 'mint-ui';
export default {

  data () {
      return {
        skillList:[],
        title:'',
        Status:'',
        proficiency:'',
        professions_title:'',
        professions_id:'',
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
      this.title='编辑技能';
    }else if(this.$route.query.type==='add'){
      this.title='添加技能';
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
      let skillDtat=this.$route.query.editTable;
      this.professions_title=skillDtat.professions_title;
      this.proficiency=skillDtat.proficiency;
      this.professions_id=skillDtat.professions_id;
       console.log(this.proficiency);
    },
    submit:function(){
       var params = new URLSearchParams();
       // params.append('professions_id', this.professions_id);
        params.append('proficiency', this.proficiency);
        params.append('professions_title',this.professions_title);
        if(this.$route.query.type==='edit'){             //修改
           if(this.check()){
        params.append('professions_id', this.professions_id);
        let _this = this;
        this.$http.post(_const.requestUrl+'/v1/userrecord/editProfessions',params).then(function ( res ){ 
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
           let paramsf = new URLSearchParams();
                  paramsf.append('job_id',this.$route.query.id);
                  let _this = this; 
                  this.$http.post(_const.requestUrl+'/v1/userrecord/findResume',paramsf).then(function ( res ){
                     if(res.list.base_id){
                      let newbase_id=res.list.base_id;
                      _this.newbase_id=res.list.base_id;
                      params.append('base_id',res.list.base_id);
                      _this.$http.post(_const.requestUrl+'/v1/userrecord/addProfessions',params).then(function ( res ){
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
                        })

                     }
                  
                  });
         }       
       }
    },
     getData:function(){    //获取
     var paramsList=new URLSearchParams(); 
           paramsList.append('base_id',this.newbase_id);
            let _this = this;
          this.$http.post(_const.requestUrl+'/v1/userrecord/professionslist',paramsList).then(function ( res ){
            _this.skillList.push(res.list.data);
            let attrproSave=[];
           for(var i=0;i<_this.skillList[0].length;i++){
           let obj= new Object();
              obj["PROFICIENCY"]=_this.skillList[0][i].proficiency;
              obj["SKILLNAME"]=_this.skillList[0][i].professions_title;
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
                    "PROJECTEXP":'',
                    "WED": _this.baselist.marriage,
                    "SKILLEXP": attrproSave,
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
      if(this.professions_title.length == 0) {
          Toast({
            message: "技能名称不能为空",
            duration: 1000
          });
          return false;
        }
      if(this.professions_title.length>20) {
          Toast({
            message: "技能名称不超过20字",
            duration: 1000
          });
          return false;
        }
       if(this.proficiency.length == 0) {
        Toast({
          message: "请选择熟练等级",
          duration: 1000
        });
        return false;
      }
      return true;
     }
  },

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

}
</style>
