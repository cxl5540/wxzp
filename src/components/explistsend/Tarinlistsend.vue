<template>
<div>
    <div class="nav" >
       <i class="fa fa-angle-left"  @click='back' style="color:#04be02 "></i>
       <span>培训经历</span>
       <span @click='trian_add' style="color:#04be02 ">添加</span>
    </div>
    <div v-show='show' style="text-align: center;margin-top: 100px">
        <p style="font-size: 16px;color: #999">您还未添加培训经历~~~</p>
        <p style="font-size: 12px;color: red;margin-top: 10px;">请从最近一次经历添加起</p>
    </div> 
   <div class="trianList  page-cell-swipe-wrapper"  v-for="(item,index) in trianList" :key='item.index' style="margin-top: 52px">
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
            <span style="color: #4c4c4c;font-size: 15px;font-weight: bold; ">{{val.train_company}}</span>
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
          trianList:[],
          show:false,
          newbase_id:'',
          id:this.$route.query.id,
          baselist:[],
          obj_id:'',        
      }
    },
  beforeCreate () {
  },
  created () {
    
  },
  mounted () {
 this.findResume();
  },
   methods:{
   delet(index){
       this.deleteSection(index);
     },
    deleteSection (index) {              //删除
       if(this.trianList[0].length==1){
           this.$dialog.toast({mes: '最后一条可修改不可删除', timeout: 2000}); 
         return;
       }else {
        this.$dialog.confirm({
            title: '提示',
            mes: '确定要删除此项吗？',
            opts: () => {
                  
              let train_id = this.trianList[0][index].train_id;
              var delparms=new URLSearchParams(); 
              delparms.append('train_id',train_id);
              let _this = this;
              this.$http.post(_const.requestUrl+'/v1/userrecord/delTrain',delparms).then(function ( res ){
                _this.trianList[0].splice(index, 1);
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
                    "TRAININGEXP":attrproSave,
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
                this.$dialog.toast({mes: '已删除', timeout: 1000});               
            }
        });
      }
    },

    back:function(){     
    this.$router.go(-1);
      },

    findResume(){
      let params = new URLSearchParams();
        params.append('job_id',this.$route.query.id);
        let _this = this; 
        this.$http.post(_const.requestUrl+'/v1/userrecord/findResume',params).then(function ( res ){
         _this.baselist=res.list;
           _this.obj_id=res.list.object_id;
           if(res.list.base_id){
            let newbase_id=res.list.base_id;
            _this.newbase_id=res.list.base_id;
            _this.getData();

           }
        
        });

     },
    getData:function(){    //获取
     var paramsList=new URLSearchParams(); 
         paramsList.append('base_id',this.newbase_id);
          let _this = this;
        this.$http.post(_const.requestUrl+'/v1/userrecord/trainlist',paramsList).then(function ( res ){
          _this.trianList.push(res.list.data);
           if(_this.trianList[0].length==0){
                _this.show=true;
              }
            for(var i=0;i<_this.trianList[0].length;i++){
                /* _this.trianList[0][i].start_time=_this.getLocalTime(_this.trianList[0][i].start_time);
                _this.trianList[0][i].end_time=_this.getLocalTime(_this.trianList[0][i].end_time);*/
              }  

        });  
    },
    edit:function(index){   //编辑培训经验
       let trianTable= this.trianList[0][index];
       this.$router.push({name:'Edittriansend',query:{ editTable:trianTable,type:'edit',id:index,newbase_id:this.newbase_id} });
    },
    trian_add:function(){    //增加培训经验
         this.$router.push({name:'Edittriansend',query: { type:'add',id:this.id,newbase_id:this.newbase_id} }); 

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
.trianList{
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
    font-size: 18px;
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
