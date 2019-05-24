<template>
<div>
    <div class="nav" >
       <i class="fa fa-angle-left"  @click='back' style="color:#04be02 "></i>
       <span>投递记录</span>
       <span style="color:#04be02 "></span>
    </div>
    <div class="show" v-if='show'>您还未投递简历,快去寻找职位~~~</div>
     <div class="sendList"  v-for="(item, index) in sendList" :key="item.index" style="margin-top:58px">
     
          <div style="border-bottom: 1px solid #eee;padding: 8px 15px;background: #fff"  v-for="(val,index) in item" :key="index" class="itemrecord">
            <!--  <router-link :to="{path:'/Resumedetail', query:{id:val.id}}"> -->
                <div style="display: flex;justify-content: space-between;padding-bottom: 8px" @click='seeResume(val)'>
                  <span style="color: #04be02;font-size: 15px">已投递</span>
                  <a style='color: #3385ff;font-size: 15px;text-decoration-line: underline;'>修改投递简历</a>           
                </div>
             <!--  </router-link>  -->  
                 <div style="display: flex;justify-content: space-between;">
                  <span style="font-weight: bold;color: #4c4c4c;font-size: 15px">{{val.job_title}}</span>
                  <span style='color: red;font-size: 15px'>{{val.job_money}}</span>           
                </div>

                 <div style="display: flex;justify-content: space-between;margin-top: 15px">
                    <span style="font-size: 14px;color: #4c4c4c;">{{val.need_comany}}</span>
                    <span style="font-size: 14px;color: #4c4c4c;">{{val.job_address}}</span>               
                  </div>
                <div style="display: flex;justify-content: space-between;margin-top: 15px">
                  <span style="color:  #999;font-size: 13px">{{val.job_type}}&nbsp;</span>
                  <span style='color:  #999;font-size: 13px'>{{val.new_create_time}}</span>           
                </div> 
            
          </div>
      
    </div>
</div>
</template>
<script>
 import { Toast,Indicator, MessageBox} from 'mint-ui';
export default {
  data () {
      return {
          sendList:[],
          show:true        
      }
    },
  beforeCreate () {
  },
  created () {
    
  },
  mounted () {
 this.getData();
  },
   methods:{
    back:function(){     
    this.$router.go(-1);
      },
    getData:function(){    //获取
      var params=new URLSearchParams(); 
             params.append('openid',_const.openId);
              let _this = this;
            this.$http.post(_const.requestUrl+'/v1/resume/getSubmitJobs',params).then(function ( res ){
              console.log(res.list.data);
              if(res.list.data){
                  _this.sendList.push(res.list.data);                 
                     _this.show=false;
              }
              if(res.list.data.length==0){
                 _this.show=true;
              }            
             for(var i=0;i<_this.sendList[0].length;i++){
               _this.sendList[0][i].new_create_time=_this.getLocalTime(_this.sendList[0][i].new_create_time);
             }
                         
      });
    },
    seeResume(val){
      console.log(val);
    this.$router.push({path:'Resumedetail',query:{id:val.id}});
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
.sendList{
  height: 100vh;
 /*  background: #ebebeb; */
}
.itemrecord>div{
   display: -webkit-flex;
}
.show{
   text-align: center;
   font-size: 16px;
   color: #999;
   margin-top: 100px;
}
</style>
