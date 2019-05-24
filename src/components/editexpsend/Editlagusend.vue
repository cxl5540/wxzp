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
                <span slot="left">语言</span>
                <input slot="right" type="text" placeholder="请输入语言名称" v-model='language'   maxlength="10">
            </yd-cell-item>
            <yd-cell-item arrow>
                <span slot="left">水平</span>
              <select slot="right" v-model="language_level">
                <option value="">请选择</option>
                <option value="2">一般</option>
                <option value="1">熟练</option>
                <option value="0">精通</option>
            </select>
            </yd-cell-item>  
             <yd-cell-item arrow>
                <span slot="left">听说</span>
              <select slot="right" v-model="hearspeak">
                <option value="">请选择</option>
                <option value="2">一般</option>
                <option value="1">熟练</option>
                <option value="0">精通</option>
            </select>
            </yd-cell-item>  
            <yd-cell-item arrow>
                <span slot="left">读写</span>
              <select slot="right" v-model="readwrite">
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
        laguList:[],
        title:'',
        Status:'',
        hearspeak:'',
        language:'',
        language_id:'',
        language_level:'',
        readwrite:'',
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
          this.title='编辑语言';
        }else if(this.$route.query.type==='add'){
          this.title='添加语言';
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
      let laguDtat=this.$route.query.editTable;
     this.hearspeak=laguDtat.hearspeak;
      this.language=laguDtat.language;
      this.language_id=laguDtat.language_id;
      this.language_level=laguDtat.language_level;
      this.readwrite=laguDtat.readwrite;
    }, 
    submit:function(){
       var params = new URLSearchParams();
        params.append('hearspeak', this.hearspeak);
        params.append('language', this.language);
        //params.append('language_id',this.language_id);
        params.append('language_level', this.language_level);
        params.append('readwrite', this.readwrite);
        if(this.$route.query.type==='edit'){             //修改
          if(this.check()){
        params.append('language_id', this.language_id);
        let _this = this;
        this.$http.post(_const.requestUrl+'/v1/userrecord/editLanguage',params).then(function ( res ){ 
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
                      _this.$http.post(_const.requestUrl+'/v1/userrecord/addLanguage',params).then(function ( res ){
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
        this.$http.post(_const.requestUrl+'/v1/userrecord/languagelist',paramsList).then(function ( res ){
          _this.laguList.push(res.list.data);
           let attrproSave=[];
          for(var i=0;i<_this.laguList[0].length;i++){
           let obj= new Object();
         obj["LV"]=_this.laguList[0][i].language_level;
         obj["LANGUAGE"]=_this.laguList[0][i].language;
         obj["LISTENINGSPEAKING"]=_this.laguList[0][i].hearspeak;
         obj["READINGWRITING"]=_this.laguList[0][i].readwrite;
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
                    "LANGUAGEEXP":attrproSave,
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
      if(this.language.length == 0) {
          Toast({
            message: "语言名称不能为空",
            duration: 1000
          });
          return false;
        }
     if(this.language.length >20) {
          Toast({
            message: "语言不超过20字",
            duration: 1000
          });
          return false;
        }

       if(this.language_level.length == 0) {
        Toast({
          message: "请选择水平等级",
          duration: 1000
        });
        return false;
      }
      if(this.hearspeak.length == 0) {
        Toast({
          message: "请选择听说等级",
          duration: 1000
        });
        return false;
      }
      if(this.readwrite.length == 0) {
        Toast({
          message: "请选择读写等级",
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
</style>
