<template>
<div>
  <div class="nav" >
       <i class="fa fa-angle-left"  @click='back' style="color:#04be02 "></i>
       <span>{{title}}</span>
       <span @click='submit' style="color:#04be02;">保存</span>
    </div> 
   <div class="information">
        <yd-cell-group>
          <yd-cell-item arrow>
                <span slot="left">获得时间</span>
                <yd-datetime type="date" start-year='1990' :init-emit="false" v-model="get_award_time" slot="right"  placeholder="请选择"></yd-datetime>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">证书名称</span>
                <input slot="right" type="text"  placeholder="请输入证书名称" v-model='award_title'   maxlength="20">
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">颁发机构</span>
                <input slot="right" type="text"  placeholder="请输入颁发机构"  v-model='company'   maxlength="20">
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
        certList:[],
        title:'',
        Status:'',
        get_award_time:'',
        award_title:'',
        company:'',
        award_id:'',
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
      this.title='编辑资格证书';
    }else if(this.$route.query.type==='add'){
      this.title='添加资格证书';
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
      let certDtat=this.$route.query.editTable;
      this.get_award_time=this.formatDate(certDtat.get_award_time);
      this.award_title=certDtat.award_title;
      this.company=certDtat.company;
      this.award_id=certDtat.award_id;
  
    },
    submit:function(){   
       var params = new URLSearchParams();
        params.append('get_award_time', this.get_award_time);
        params.append('award_title', this.award_title);
        params.append('company',this.company);
        if(this.$route.query.type==='edit'){             //修改
           if(this.check()){
          params.append('award_id', this.award_id);
          let _this = this;
          this.$http.post(_const.requestUrl+'/v1/user/editAward',params).then(function ( res ){ 
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
            this.$http.post(_const.requestUrl+'/v1/user/addAward',params).then(function ( res ){
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
          this.$http.post(_const.requestUrl+'/v1/user/awardlist',paramsList).then(function ( res ){
            _this.certList.push(res.list.data);
           let attrproSave=[];
           for(var i=0;i<_this.certList[0].length;i++){
           let obj= new Object();
            obj["NAME"]=_this.certList[0][i].award_title;
             obj["DATE"]=_this.certList[0][i].get_award_time;
             obj["ISSUER"]=_this.certList[0][i].company;
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
                  "CREDENTIALEXP":attrproSave,
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
      if(this.get_award_time.length == 0) {
          Toast({
            message: "请选择获得时间",
            duration: 1000
          });
          return false;
        }

       if(this.award_title.length == 0) {
        Toast({
          message: "证书名称不能为空",
          duration: 1000
        });
        return false;
      }
      if(this.award_title.length>20) {
        Toast({
          message: "证书名称不超过20字",
          duration: 1000
        });
        return false;
      }
      if(this.company.length == 0) {
        Toast({
          message: "颁发机构不能为空",
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
<style scoped lang='less'>
.nav{
  width: 100%;
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
