<template>
<div>
  <div class="nav" >
     <i class="fa fa-angle-left"  @click='back' style="color:#04be02 "></i>
     <span>语言技能</span>
     <span @click='trian_add' style="color:#04be02 ">添加</span>
  </div>
    <div v-show='show' style="text-align: center;margin-top: 100px">
      <p style="font-size: 16px;color: #999">您还未添加语言技能~~~</p>    
  </div>
     <div class="laguList  page-cell-swipe-wrapper" v-for="(item,index) in laguList" :key='item.index' style="margin-top: 52px">
    <mt-cell-swipe  v-for="(val,index) in item" :key='index'
            :right="[
                {
                    content: '删除',
                    style: { background: '#ff0000', color: '#fff'},
                    handler: () => deleteSection(index),
  
                }
            ]">
      <ul @click='edit(index)'>
        <li style="display: flex;flex-direction:column ; " class="caozuo">
        <span style="color: #4c4c4c;font-size: 15px;font-weight: bold; ">{{val.language}}</span>
        <p style="font-size: 12px;color: #999;padding-top: 10px;">{{val.language_level_name}}</p>
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
          laguList:[],
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
 this.getData();
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
    deleteSection (index) {              //删除
       if(this.laguList[0].length==1){
           this.$dialog.toast({mes: '最后一条可修改不可删除', timeout: 2000}); 
         return;
       }else {
      this.$dialog.confirm({
            title: '提示',
            mes: '确定要删除此项吗？',
            opts: () => {
               let language_id = this.laguList[0][index].language_id;
                var delparms=new URLSearchParams(); 
                delparms.append('language_id',language_id);
                let _this = this;
                this.$http.post(_const.requestUrl+'/v1/user/delLanguage',delparms).then(function ( res ){
                  _this.laguList[0].splice(index, 1);
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
                this.$dialog.toast({mes: '已删除', timeout: 1000});               
            }
        });
       } 
    },

    back:function(){     
    this.$router.go(-1);
      },
    getData:function(){    //获取
     var paramsList=new URLSearchParams(); 
         paramsList.append('base_id',_const.base_id);
          let _this = this;
        this.$http.post(_const.requestUrl+'/v1/user/languagelist',paramsList).then(function ( res ){
          _this.laguList.push(res.list.data);
          console.log( _this.laguList);
          
          if(_this.laguList[0].length==0){
                _this.show=true;
              }
          for(var i=0;i<_this.laguList[0].length;i++){
             if(_this.laguList[0][i].language_level=='1'){
                _this.laguList[0][i].language_level_name='熟练';
              }else if(_this.laguList[0][i].language_level=='2'){
                _this.laguList[0][i].language_level_name='一般'
              }else if (_this.laguList[0][i].language_level=='0') {
                 _this.laguList[0][i].language_level_name='精通'
              }
            }
           console.log( _this.laguList);
        });   
    },
    edit:function(index){   //编辑工作经验
       let laguList= this.laguList[0][index];
       this.$router.push({name:'Editlagu',query:{ editTable:laguList,type:'edit',id:index} });
    },
    trian_add:function(){    //增加工作经验
         this.$router.push({name:'Editlagu',query: { type:'add'} }); 

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
.laguList{
  box-sizing:border-box;
  padding: 0 15px;
  margin: auto;
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
    font-size: 15px;
    color: #999;
    line-height: 40px;
    position: absolute;
    right: 0;
  }

}
.mint-cell{
  min-height: 52px;
}

</style>
