<template>
  <div style="height: 100%;">
    <div class="nav" >
       <i class="fa fa-angle-left"  @click='back' style="color:#04be02 "></i>
       <span>职位详情</span>
       <span style="color:#04be02 "></span>
    </div>
        <section style="background: #ebebeb;margin-bottom: 40px;margin-top: 63px" >
            <div class="jobDetail" style='position: relative;padding: 0 15px'>
               <div style='height: 23px;position: absolute;right: 16px;top: -11px'>
                  <img style='height: 100%' src="../../assets/icon/pin@3x.png" alt="">
               </div>
                <div style="padding: 15px 0;">
                    <p style="font-size:15px;color: #4c4c4c;font-weight: bold;padding-bottom: 15px;">{{jobDetailList.job_title}}（{{jobDetailList.need_num}}人）</p>
                    <div style="display: flex;justify-content: space-between; " class="itemd">
                        <span style="font-size: 13px;color: #808080;">招聘单位：{{jobDetailList.need_comany}}</span>
                        <span style="color: #808080;font-size: 12px">{{jobDetailList.start_time}}发布</span>
                    </div>
                </div>
            </div>
            <div class="jobDetail" style='padding: 0 15px;background: #fff;'>
                <div style="padding: 15px 0;" >
                    <div style="display: flex;justify-content: space-between;font-size: 15px;" class="itemd">
                        <span style="font-weight: bold;font-size: 15px;color: #4c4c4c" >月薪:<span style="color: #ef8f52;font-weight: 100;">{{jobDetailList.job_money}}</span></span>
                       <div style="display: flex" class="itemd">
                          <div style='width: 10px'>
                             <img style='width: 100%;vertical-align: middle;' src="../../assets/icon/dingw@3x.png" alt="">
                          </div>
                          <span style='font-size: 14px;vertical-align: middle;margin-left: 2px'>工作地点:{{jobDetailList.job_address}}</span>
                        </div> 
                    </div>
                    <p style="font-size: 13px;color: #808080;padding-top:0.3rem ">期望到岗日期：{{jobDetailList.expect_time }}</p>
                </div>
            </div>
             <div >
                <div style="background: #fff">
                  <div style='display: flex; align-items: center;padding-left: 15px;border-bottom: 1px solid #eee' class="itemd">
                      <div style='width: 18px;margin-right: 6px'>
                        <img style='width: 100%' src="../../assets/icon/zhiwms@3x.png" alt="">
                      </div>
                      <p style="font-weight: bold;font-size: 15px;color: #4c4c4c;padding: 15px 0">职位职责</p>
                   </div> 
                   <p  v-html='jobDetailList.job_zhize' style="padding:15px 15px;margin-bottom: 0.2rem; font-size: 13px;color: #4c4c4c; word-wrap: break-word;">{{jobDetailList.job_zhize}}</p>


                </div>
            </div>
            <div v-show='rzyq'>
                <div style="background: #fff">
                  <div style='display: flex; align-items: center;padding-left: 15px;border-bottom: 1px solid #eee' class="itemd">
                      <div style='width: 18px;margin-right: 6px'>
                        <img style='width: 100%' src="../../assets/icon/renzyq@3x.png" alt="">
                      </div>
                      <p style="font-weight: bold;font-size: 15px;color: #4c4c4c;padding: 15px 0">任职要求</p>
                   </div> 
                   <p  v-html='jobDetailList.mark' style="padding:15px 15px;margin-bottom: 0.2rem; font-size: 13px;color: #4c4c4c; word-wrap: break-word;">{{jobDetailList.mark}}</p>
                </div>
            </div>
           
            
           
             <div style="padding-bottom:50px;background: #fff">
                <div style="background: #fff;border-bottom: 1px solid #eee;padding-bottom: 0.2rem" >
                    <div style='display: flex; align-items: center;padding-left:15px;border-bottom: 1px solid #eee' class="itemd">
                    <p style="font-weight: bold;font-size: 15px;color: #4c4c4c;padding: 15px 0">任职资格</p>
                </div>
                  <p style="padding:0.1rem 5% 0.1rem 5%;font-size: 13px;color: #4c4c4c;" v-show='xl'>学历: {{jobDetailList.education}}</p>
                  <p style="padding:0.1rem 5% 0.1rem 5%;font-size: 13px;color: #4c4c4c;" v-show='zy'>专业 : {{jobDetailList.professions}}</p>
                  <p style="padding:0.1rem 5% 0.1rem 5%;font-size: 13px;color: #4c4c4c;" v-show='zc'>职称 : {{jobDetailList.professional_title}}</p>
                  <p style="padding:0.1rem 5% 0.1rem 5%;font-size: 13px;color: #4c4c4c;" v-show='zzjy'>工作经验 : {{jobDetailList.works}}</p>
                </div>
            </div>
            
             <schoolDetailFooter v-bind:msg='id' v-bind:fidd='fid' v-bind:cls='typ' ></schoolDetailFooter>
        </section>
       
  </div>
</template>
<script>
    import schoolDetailFooter from "./schoolDetailFooter"
    export default {
        components:{    
            schoolDetailFooter 
           },
        data () {
            return {
               jobDetailList: [],
               id:(this.$route.query.id).toString(),
               typ:this.$route.query.class,
               fid:'',
               xl:false,
               zc:false,
               zzjy:false,
               zy:false,
               rzyq:false,
            }
        },
        beforeCreate () {
            //this.$dialog.toast({mes: `1`});
        },
        created () {

        },
        mounted () {

           this.getjobDetailList();

        },
        methods:{

            back:function(){
                 this.$router.go(-1);
               
            },
            getjobDetailList () {

                var id= this.$route.query.id;
                var params = new URLSearchParams();
                params.append('job_id', id);
                  let _this = this
                  this.$http.post(_const.requestUrl+'/v1/jobs/jobdeatil',params).then(function ( res ) {
                    _this.fid=res.list.fid;
                    console.log(_this.fid);
                 _this.jobDetailList = res.list;
                 _this.jobDetailList.create_time=_this.getLocalTime(_this.jobDetailList.create_time);
                 _this.jobDetailList.start_time=_this.getLocalTime(_this.jobDetailList.start_time,3);
                 _this.jobDetailList.expect_time=_this.getLocalTime(_this.jobDetailList.expect_time,3);
                 _this.jobDetailList.mark=_this.jobDetailList.mark.replace(/\n|\r\n/g,"<br/>");
                  _this.jobDetailList.job_zhize=_this.jobDetailList.job_zhize.replace(/\n|\r\n/g,"<br/>");
                  if( _this.jobDetailList.education==''){
                    _this.xl=false;
                  }else{
                    _this.xl=true;
                  }
                  if( _this.jobDetailList.works==''){
                    _this.zzjy=false;
                  }else{
                    _this.zzjy=true;
                  }
                  if( _this.jobDetailList.professions==''){
                    _this.zy=false;
                  }else{
                    _this.zy=true;
                  }
                  if( _this.jobDetailList.professional_title==''){
                    _this.zc=false;
                  }else{
                    _this.zc=true;
                  }
                  if( _this.jobDetailList.mark==''){
                    _this.rzyq=false;
                  }else{
                    _this.rzyq=true;
                  }

                 console.log(_this.jobDetailList);
              });
            }

        }
    }
</script>
<style scoped lang='less'>
.itemd{
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
    section{
        background: #ebebeb;
    }
    .jobDetail{
      box-sizing: border-box;
        background: #fff;
        padding: 0 15px;
        margin: 10px 0;

    }
    .jobDetail>div{
        margin: 0 auto;
    }
    li{
        list-style: decimal;
        list-style-position:inside;
        font-size: 13px;
        color: #808080;
        margin: 10px 0;
    }
  .yd-navbar{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
</style>