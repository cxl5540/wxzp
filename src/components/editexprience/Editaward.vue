<template>
 <div>
    <div class="nav" >
      <span>
       <i class="fa fa-angle-left"  @click='back' style="color:#04be02 "></i>
       </span>
       <span>{{title}}</span>
       <span @click='submit' style="color:#04be02;text-align: right; ">保存</span>
    </div>
   <div class="information">
        <yd-cell-group>
            <yd-cell-item arrow>
                <yd-icon name="ucenter"  size=".3rem" color='rgb(42, 187, 79)'></yd-icon>
                <span slot="left">获得时间</span>
               <yd-datetime  type="date" start-year='1990' :init-emit="false" v-model="award_time" slot="right"  placeholder="请选择"></yd-datetime>
            </yd-cell-item>
            <yd-cell-item>
                <yd-icon name="ucenter"  size=".3rem" color='rgb(42, 187, 79)'></yd-icon>
                <span slot="left">获奖名称</span>
                <input slot="right" type="text" placeholder="请输获奖名称" v-model='award_name' maxlength="20">
            </yd-cell-item>  
            <div style="width: 94%;margin:10px auto">
              <span style="width: 21%;color: #4c4c4c">补充说明</span>
            </div>
            <yd-cell-item>
                <yd-textarea slot="right" placeholder="请输补充说明" maxlength="255" v-model='mark'></yd-textarea>
            </yd-cell-item>
        </yd-cell-group>

    </div>
</div> 
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  name: 'Editaward',
  data () {
      return {
        awardList:[],
        title:"",
        Status:'',
        award_time:'',
        award_name:'',
        mark:'',
        award_proccess_id:'',
        baselist:[],      
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
        this.title='编辑获奖经历';
      }else if(this.$route.query.type==='add'){
        this.title='添加获奖经历';
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
      let awordDtat=this.$route.query.editTable;
      this.award_time=this.formatDate(awordDtat.award_time);     
      this.award_name=awordDtat.award_name;
      this.mark=awordDtat.mark;
      this.award_proccess_id=awordDtat.award_proccess_id;
    },
    submit:function(){
    if(this.check()){     
       var params = new URLSearchParams();
        params.append('award_time',this.award_time);
        params.append('award_name', this.award_name);
        params.append('mark',this.mark);
       // params.append('award_proccess_id', this.award_proccess_id);
        if(this.$route.query.type==='edit'){             //修改
        params.append('award_proccess_id', this.award_proccess_id);
        let _this = this;
        this.$http.post(_const.requestUrl+'/v1/user/editAward_proccess',params).then(function ( res ){ 
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
       }else if(this.$route.query.type==='add'){        //添加 
           params.append('base_id',_const.base_id);
            let _this = this;
            this.$http.post(_const.requestUrl+'/v1/user/addAward_proccess',params).then(function ( res ){
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
            this.$http.post(_const.requestUrl+'/v1/user/award_proccesslist',paramsList).then(function ( res ){
              console.log(res.list.data)
              res.list.data.award_time=_this.getLocalTime(res.list.data.award_time)
              _this.awardList.push(res.list.data);
           let attrproSave=[];
           for(var i=0;i<_this.awardList[0].length;i++){
           let obj= new Object();
             obj["DESCRIPTION"]= _this.awardList[0][i].mark;
             obj["DATE"]= _this.awardList[0][i].award_time;
              obj["REWARDNAME"]= _this.awardList[0][i].award_name;
            attrproSave.push(obj);
          }
          setTimeout(function(){
             let urls=_const.testUrl+'/WP_CQP_SOA/APP_PUBLIC_SERVICES/Proxy_Services/TA_HR/HR_Recruit_03_SaveResume_PS';
             let attrs=[];
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
                  "AWARDEXP":attrproSave,
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
                  "WORKEXP":'',
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
    },
     check(){
      if(this.award_time.length == 0) {
          Toast({
            message: "请选择获奖时间",
            duration: 1000
          });
          return false;
        }

       if(this.award_name.length == 0) {
        Toast({
          message: "获奖名称不能为空",
          duration: 1000
        });
        return false;
      }
      if(this.award_name.length >20) {
        Toast({
          message: "获奖名称不超过20字",
          duration: 1000
        });
        return false;
      }
        return true;
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
.nav span{
  display: inline-block;
  width: 34%;
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
