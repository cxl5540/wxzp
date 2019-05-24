<template>
<div class="experience" style='background: rgb(235, 235, 235);padding-top: 0.2rem;'>
    <div v-show='hasExp' style='margin-top: 0' >      
        <div class="exp">
          <div style='display: flex' class="itemexp">
              <div style="width: 18px;margin-right:6px">
              <img  style="width: 100%;vertical-align: middle;" src="../../assets/icon/gongzjl@3x.png" alt="">
              </div>
              <span style='font-weight: bold;font-size: 15px;color: #4c4c4c'>工作经历</span>
          </div>          
        </div>
        <div  class="list" v-for="(item, index) in this.jobListData">
            <div >
              <div style='display: flex;vertical-align: middle;'  class="itemexp">
                <div style='width: 14px;'>
                  <img style='width: 100%;' src="../../assets/icon/yuan.png" alt="">
                </div>
                <span class="exp_time" style='margin-left: 6px'>{{item.start_time}}-{{item.end_time }}</span>
              </div>
              <div class="fengexian">
              <div class="exp_title" style='color: #4c4c4c;font-size: 15px'>
                <p >{{item.company}}</p>
                <p style="margin-top: 6px;font-size: 14px">{{item.job_title}}</p>
              </div>
              <!-- <textarea readonly style="width: 100%;color: #999;border: none;" >{{item.job_description}}</textarea> -->
              <p>工作描述：</p>
               <div v-html="item.job_description">{{item.job_description}}</div>
              </div>
            </div>
        </div> 
    </div>
    <div v-show='hasExpro'>
      <div class="exp">
        <div style='display: flex'  class="itemexp">
            <div style="width: 18px;margin-right:6px">
            <img  style="width: 100%;vertical-align: middle;" src="../../assets/icon/xiangmjy@3x.png" alt="">
            </div>
            <span style='font-weight: bold;font-size: 15px;color: #4c4c4c'>项目经验</span>
        </div>  
      </div>
       <div class="list"  v-for="(item, index) in proListData" :key="item.index">
           <div>
            <div style='display: flex;'  class="itemexp">
              <div style='width: 14px;'>
                <img style='width: 100%;vertical-align: middle;' src="../../assets/icon/yuan.png" alt="">
              </div>
              <span class="exp_time" style='vertical-align: middle;margin-left: 6px'>{{item.start_time}}-{{item.end_time}}</span>
            </div>
            <div class="fengexian">          
               <p class="exp_title">{{item.project_name}}</p>
             <!--   <p>项目标题:{{item.project_name}}</p> -->
               <p style="margin: 10px 0;">担任角色:{{item.job_title}}</p>
               <p>项目描述：</p>         
               <div v-html="item.project_description">{{item.project_description}}</div>
            </div> 
           </div>            
       </div>
     </div>
     <div v-show='hasExptr'>
        <div class="exp">
          <div style='display: flex'  class="itemexp">
              <div style="width: 18px;margin-right:6px">
              <img  style="width: 100%;vertical-align: middle;" src="../../assets/icon/peixjl@3x.png" alt="">
              </div>
              <span style='font-weight: bold;'>培训经验</span>
          </div>           
          <!-- <i class="fa fa-angle-right" ></i> -->
      </div>
      
      <div class="list" v-for="(val, index) in trianListData" :key="index">
             <div>
                <div style='display: flex;'  class="itemexp">
                  <div style='width: 14px;'>
                    <img style='width: 100%;' src="../../assets/icon/yuan.png" alt="">
                  </div>
                  <span class="exp_time" style='margin-left: 6px'>{{val.start_time }}-{{val.end_time}}</span>
                </div>
              <div class="fengexian">
                 <p class="exp_title">{{val.train_company}}</p>
                 <p>课程描述：</p>        
                 <div v-html="val.class_description">{{val.class_description}}</div>
              </div> 
             </div>    
      </div>
    </div>
    <div v-show='hasExped'>
        <div class="exp">
          <div style='display: flex'  class="itemexp">
              <div style="width: 18px;margin-right:6px">
              <img  style="width: 100%;vertical-align: middle;" src="../../assets/icon/jiaoyjl@3x.png" alt="">
              </div>
              <span style='font-weight: bold;'>教育经历</span>
          </div>            
      </div>    
      <div class="list" v-for="(val, index) in eduListData" :key="index">
          <div  style='margin-bottom: 10px'>
            <div style='display: flex;'  class="itemexp">
                  <div style='width: 14px;'>
                    <img style='width: 100%;' src="../../assets/icon/yuan.png" alt="">
                  </div>
                  <span class="exp_time" style='margin-left: 6px'>{{val.join_shcool}}-{{val.out_shcool}}</span>
            </div>
            <div class="fengexian">           
               <p class="exp_title">{{val.shcool_name}}</p>        
               <p>{{val.profession}}</p>
            </div>
          </div>            
      </div>
    </div>
    <div v-show='hasExpcer'>
       <div class="exp">
          <div style='display: flex'  class="itemexp">
              <div style="width: 18px;margin-right:6px">
              <img  style="width: 100%;vertical-align: middle;" src="../../assets/icon/huodzs@3x.png" alt="">
              </div>
              <span style='font-weight: bold;'>资格证书</span>
          </div>                
      </div>
      <div class="list"  v-for="(val, index) in certificateListData" :key="index">
          <div>
            <div style='display: flex;align-items: center;'  class="itemexp">
                <div style='width: 14px;'>
                  <img style='width: 100%;' src="../../assets/icon/yuan.png" alt="">
                </div>                 
                <p class="exp_title" style='margin-left: 6px;padding: 0'><span>{{val.get_award_time}}&nbsp;&nbsp;&nbsp;{{val.award_title}}</span></p>
            </div>
            <div class="fengexian">
             <p style="padding-top: 10px;">发布机构:{{val.company}}</p>
            </div>  
          </div>                               
      </div>
    </div>
    <div v-show='hasExplagu'>
      <div class="exp">
          <div style='display: flex'  class="itemexp">
              <div style="width: 18px;margin-right:6px">
              <img  style="width: 100%;vertical-align: middle;" src="../../assets/icon/yuynl@3x.png" alt="">
              </div>
              <span style='font-weight: bold;'>语言能力</span>
          </div>            
      </div> 
       <div class="list"  v-for="(val, index) in laguListData" :key="index">
           <div >
              <div style='display: flex;align-items: center;'  class="itemexp">
                  <div style='width: 14px;'>
                    <img style='width: 100%;' src="../../assets/icon/yuan.png" alt="">
                  </div>                 
                  <p class="exp_title"  style='margin-left: 6px;padding: 0'><span>{{val.language}}&nbsp;/&nbsp;{{val.language_level}}</span></p>
              </div>
              <div class="fengexian">
                 <p style="padding-top: 10px">听说:{{val.hearspeak}}&nbsp;/&nbsp;读写:{{val.readwrite}}</p>
              </div>        
           </div>             
      </div>
    </div>
    <div v-show='hasExpskil'>
      <div class="exp">
          <div style='display: flex'  class="itemexp">
              <div style="width: 18px;margin-right:6px">
              <img  style="width: 100%;vertical-align: middle;" src="../../assets/icon/jinzs@3x.png" alt="">
              </div>
              <span style='font-weight: bold;'>技能展示</span>
          </div>            
      </div>
      <div class="list" v-for="(val, index) in skillListData" :key="index">
            <div>
              <div style='display: flex;align-items: center;'  class="itemexp">
                <div style='width: 14px;'>
                  <img style='width: 100%;vertical-align: middle;' src="../../assets/icon/yuan.png" alt="">
                </div>                              
                <p class="exp_title" style='padding: 0;margin-left: 6px'>{{val.professions_title}}&nbsp;/&nbsp;{{val.proficiency}}</p>
              </div>
               <div class="fengexian">
                 <p style="opacity: 0">{{val.professions_id}}</p>
               </div>                                                  
           </div>             
      </div>
    </div >
    <div  v-show='hasExpaw' >
      <div class="exp">
          <div style='display: flex'  class="itemexp">
              <div style="width: 18px;margin-right:6px">
              <img  style="width: 100%;vertical-align: middle;" src="../../assets/icon/huiodjl@3x.png" alt="">
              </div>
              <span style='font-weight: bold;'>获奖经历</span>
          </div>            
      </div>    
     <div class="list" v-for="(val, index) in awardListData" :key="index">
         <div>
          <div style='display: flex;align-items: center;'  class="itemexp">
              <div style='width: 14px;'>
                <img style='width: 100%;' src="../../assets/icon/yuan.png" alt="">
              </div>                 
               <p class="exp_title" style='margin-left: 6px;padding: 0'>{{val.award_time}}</p>
          </div>
              <div class="fengexian" style="padding-bottom: 90px">
                 <p class="exp_title">   {{val.award_name}}</p>
                <p>补充说明：</p> 
                <div v-html="val.mark">{{val.mark}}</div>
              </div>    
         </div>             
      </div>
    </div>
  </div> 
</template>
<script>
export default {
  data () {
      return {
        hasExp:true,
        hasExpro:true,
        hasExptr:true,
        hasExped:true,
        hasExplagu:true,
        hasExpskil:true,
        hasExpcer:true,
        hasExpaw:true,
        jobListData:'',
        proListData:[],
        trianListData:[],
        eduListData:[],
        certificateListData:[],
        laguListData:[],
        skillListData:[],
        awardListData:[],
      }
  },
  created () {
   
     this.findResume();
   // this.list();
  },
  mounted(){
     this.workList();
    this.proList();
    this.trianList();
    this.eduList();
    this.certificateList();
    this.laguList();
    this.skillList();
    this.awardList();

  },
  methods:{
       findResume(){
      let params = new URLSearchParams();
        params.append('wx_openid',_const.openId);
        let _this = this; 
        this.$http.post(_const.requestUrl+'/v1/user/findResume',params).then(function ( res ){
          _const.base_id=res.list.base_id;
        });

     },
     workList:function(){    // 工作列表    
        var paramsList=new URLSearchParams(); 
             paramsList.append('base_id',_const.base_id);
              let _this = this;
            this.$http.post(_const.requestUrl+'/v1/user/worklist',paramsList).then(function ( res ){
              _this.jobListData=res.list.data;
              _this.$emit('jobData',_this.jobListData);
              if(_this.jobListData.length==0){
                _this.hasExp=false;
              }else {
                for(var i= 0;i<_this.jobListData.length;i++){
                  _this.jobListData[i].job_description=_this.jobListData[i].job_description.replace(/\n|\r\n/g,"<br/>");
                 /* _this.jobListData[i].start_time=_this.getLocalTime(_this.jobListData[i].start_time);
                  _this.jobListData[i].end_time=_this.getLocalTime(_this.jobListData[i].end_time);*/
                }
              }                                      
        });

      },                    
      proList:function(){    // 项目列表
        var paramsList=new URLSearchParams(); 
             paramsList.append('base_id',_const.base_id);
              let _this = this;
            this.$http.post(_const.requestUrl+'/v1/user/projectlist',paramsList).then(function ( res ){
             _this.proListData=res.list.data;
              _this.$emit('proData',res.list.data);
               if(_this.proListData.length==0){
                _this.hasExpro=false;
              }else {
                 for(var i= 0;i<_this.proListData.length;i++){
                  _this.proListData[i].project_description=_this.proListData[i].project_description.replace(/\n|\r\n/g,"<br/>");
                  /*  _this.proListData[i].start_time=_this.getLocalTime(_this.proListData[i].start_time);
                  _this.proListData[i].end_time=_this.getLocalTime(_this.proListData[i].end_time);*/
                }
              }
            
          });
      },             


      trianList:function(){    // 培训列表
          var paramsList=new URLSearchParams(); 
               paramsList.append('base_id',_const.base_id);
                let _this = this;
              this.$http.post(_const.requestUrl+'/v1/user/trainlist',paramsList).then(function ( res ){
                _this.trianListData=res.list.data;
                _this.$emit('trianData',res.list.data);
                 if(_this.trianListData.length==0){
                _this.hasExptr=false;
               }else{
                 for(var i= 0;i<_this.trianListData.length;i++){
                  _this.trianListData[i].class_description=_this.trianListData[i].class_description.replace(/\n|\r\n/g,"<br/>");
                   /* _this.trianListData[i].start_time=_this.getLocalTime(_this.trianListData[i].start_time);
                    _this.trianListData[i].end_time=_this.getLocalTime(_this.trianListData[i].end_time);*/
                }
                 
               }
            });
          },             

      eduList:function(){    // 教育列表
        var paramsList=new URLSearchParams(); 
             paramsList.append('base_id',_const.base_id);
              let _this = this;
            this.$http.post(_const.requestUrl+'/v1/user/edcationlist',paramsList).then(function ( res ){
               _this.eduListData=res.list.data; 
                _this.$emit('eduData',res.list.data);
                 if(_this.eduListData.length==0){
                _this.hasExped=false;
              } 
              for(var i=0;i<_this.eduListData.length;i++){
                /* _this.eduListData[i].join_shcool=_this.getLocalTime(_this.eduListData[i].join_shcool);
                 _this.eduListData[i].out_shcool=_this.getLocalTime(_this.eduListData[i].out_shcool);*/
              }      
            });
          },             

            certificateList:function(){    // 证书列表
              var paramsList=new URLSearchParams(); 
                   paramsList.append('base_id',_const.base_id);
                    let _this = this;
                  this.$http.post(_const.requestUrl+'/v1/user/awardlist',paramsList).then(function ( res ){
                     _this.certificateListData=res.list.data;
                      _this.$emit('certData',res.list.data);
                       if(_this.certificateListData.length==0){
                        _this.hasExpcer=false;
                      }
                       for(var i=0;i<_this.certificateListData.length;i++){
                       /*  _this.certificateListData[i].get_award_time=_this.getLocalTime(_this.certificateListData[i].get_award_time);*/
                      }                                
                  });
            },             


      laguList:function(){    // 语言能力列表
          var paramsList=new URLSearchParams(); 
               paramsList.append('base_id',_const.base_id);
                let _this = this;
              this.$http.post(_const.requestUrl+'/v1/user/languagelist',paramsList).then(function ( res ){
                _this.laguListData=res.list.data;
                 _this.$emit('laguData',res.list.data);
                  if(_this.laguListData.length==0){
                    _this.hasExplagu=false;
                  }
                  for(var i=0;i<_this.laguListData.length;i++){
                   if(_this.laguListData[i].hearspeak=='1'){
                      _this.laguListData[i].hearspeak='熟练';
                    }else if( _this.laguListData[i].hearspeak=='2'){
                      _this.laguListData[i].hearspeak='一般'
                    }else if (_this.laguListData[i].hearspeak=='0') {
                       _this.laguListData[i].hearspeak='精通'
                    }
                    if(_this.laguListData[i].readwrite=='1'){
                      _this.laguListData[i].readwrite='熟练';
                    }else if( _this.laguListData[i].readwrite=='2'){
                      _this.laguListData[i].readwrite='一般'
                    }else if (_this.laguListData[i].readwrite=='0') {
                       _this.laguListData[i].readwrite='精通'
                    }
                    if(_this.laguListData[i].language_level=='1'){
                      _this.laguListData[i].language_level='熟练';
                    }else if( _this.laguListData[i].language_level=='2'){
                      _this.laguListData[i].language_level='一般'
                    }else if (_this.laguListData[i].language_level=='0') {
                       _this.laguListData[i].language_level='精通'
                    }

                }
  
              
              });
            },             


      skillList:function(){    // 技能列表
      var paramsList=new URLSearchParams(); 
           paramsList.append('base_id',_const.base_id);
            let _this = this;
          this.$http.post(_const.requestUrl+'/v1/user/professionslist',paramsList).then(function ( res ){
           _this.skillListData=res.list.data;
            _this.$emit('skillData',res.list.data);
             if(_this.skillListData.length==0){
                _this.hasExpskil=false;
              }
              for(var i=0;i<_this.skillListData.length;i++){
               if(_this.skillListData[i].proficiency=='1'){
                  _this.skillListData[i].proficiency='熟练';
                }else if( _this.skillListData[i].proficiency=='2'){
                  _this.skillListData[i].proficiency='一般'
                }else if (_this.skillListData[i].proficiency=='0') {
                   _this.skillListData[i].proficiency='精通'
                }
              }
         
          });
      },             


      awardList:function(){    // 获奖经历列表
        var paramsList=new URLSearchParams(); 
             paramsList.append('base_id',_const.base_id);
              let _this = this;
            this.$http.post(_const.requestUrl+'/v1/user/award_proccesslist',paramsList).then(function ( res ){
               _this.awardListData=res.list.data;
                _this.$emit('awardData',res.list.data);
                 if(_this.awardListData.length==0){
                _this.hasExpaw=false;
              }else{
                for(var i= 0;i<_this.awardListData.length;i++){
                  _this.awardListData[i].mark=_this.awardListData[i].mark.replace(/\n|\r\n/g,"<br/>");
                 /* _this.awardListData[i].award_time=_this.getLocalTime(_this.awardListData[i].award_time);*/
                }
              }                        
            });
      },


    }
 }

</script>
<style >
.itemexp{
   display: -webkit-flex;
}
.experience{
  word-wrap: break-word;
 /*   margin-bottom:90px; */
  font-size: 12px;
  color: #999;
   div{
    /* background: rgb(235, 235, 235); */
    
   }

   .exp_time{
    color: #999;
    font-size: 12px;
    display: inline-block;

   }

   i{
    font-size: 15px;
   }
  
}
   .experience>div{
    width: 100%;
    margin: 0.2rem auto ;
    padding: 0 15px 0 15px;
    background: #fff;
   }
   .exp{
    color: #4c4c4c;
    border-bottom: 1px solid #eee;
    display: flex; 
     display: -webkit-flex;
    justify-content: space-between;
    padding: 15px 0;
    font-size: 15px;
    margin-bottom: 15px;
   }
  .fengexian{
    border-left: 1px solid #eee;
    padding-left: 14px;
    margin-left: 6px;
    padding-bottom: 25px;

  }
  .exp_title{
    font-size: 15px;
    color: #4c4c4c;
    margin: 0px auto;
    padding: 10px 0;
   }
</style>

