<template>
  <div class="experience" style="padding-top: 0.2rem">
  <div style="margin-top: 0">
     <router-link :to="{path:'/Joblist',query:{objid:objid}}" exact >
       <div class="exp" >
         <div style='display: flex;line-height: 32px;' class="itemexp">
             <div style="width: 18px;margin-right:6px">
             <img  style="width: 100%;vertical-align: text-top;" src="../../assets/icon/gongzjl@3x.png" alt="">
             </div>
             <span style='font-weight: bold;'><i class="fa musticon">*</i>&nbsp;工作经历&nbsp;<span style="font-size: 12px;color: red;font-weight: 500">(注:应届生请填实习经历)</span></span>
         </div>
         <div style='width: 11%'>
           <span style="line-height: 32px;color: #04be02">编辑</span>
         </div>           
       </div>
     </router-link>
     <div class="noExp" v-show='noExp'>你还没有工作/实习经历,请添加</div>
       <div  class="list"  :data="job_expForm.job_expTableData" v-for="(item, index) in this.job_expForm.job_expTableData">
          <div  v-for="(val,index) in item" :key="index">
           <div>
             <div style='display: flex;vertical-align: middle;display:-webkit-flex;' class="itemexp">
               <div style='width: 14px;'>
                 <img style='width: 100%;vertical-align: middle;' src="../../assets/icon/yuan.png" alt="">
               </div>
               <span class="exp_time" style='vertical-align: middle;margin-left: 6px'>{{val.start_time }}-{{val.end_time}}</span>
             </div>
             <div class="fengexian">
               <div class="exp_title" style=' color: #4c4c4c;font-size: 15px'>
               <p >{{val.company}}</p>
               <p style="margin-top: 6px;font-size: 14px">{{val.job_title}}</p>
               </div>
                 <p>工作描述：</p>
                 <div v-html="val.job_description">{{val.job_description}}</div>                  
             </div>
           </div>         
          </div>     
       </div> 
   </div> 
  <div>
  <router-link :to="{path:'/Prolist',query:{objid:objid}}" slot="left">
      <div class="exp">
        <div style='display: flex;line-height: 32px;' class="itemexp">
            <div style="width: 18px;margin-right:6px">
            <img  style="width: 100%;vertical-align: text-top;" src="../../assets/icon/xiangmjy@3x.png" alt="">
            </div>
            <span style='font-weight: bold;'>项目经验</span>
        </div>
         <div style='width: 11%'>
           <span style="line-height: 32px;color: #04be02">编辑</span>
         </div>
      </div>
  </router-link>
  <div class="noExp" v-show='noExpro'>你还没有项目经验,请添加</div>
       <div class="list" :data="pro_expForm.pro_expTableData" v-for="(item, index) in this.pro_expForm.pro_expTableData" :key="item.index">
          <div  v-for="(val,index) in item" :key="index">
           <div  >
            <div style='display: flex;vertical-align: middle;' class="itemexp">
              <div style='width: 14px;'>
                <img style='width: 100%;vertical-align: middle;' src="../../assets/icon/yuan.png" alt="">
              </div>
              <span class="exp_time" style='vertical-align: middle;margin-left: 6px'>{{val.start_time}}-{{val.end_time}}</span>

            </div>
            <div class="fengexian">           
               <p class="exp_title">{{val.project_name}}</p>
               <p style="padding: 10px 0;">担任角色:{{val.job_title}}</p>         
               <p>项目描述：</p>
               <div v-html="val.project_description">{{val.project_description}}</div>
            </div>
           </div>         
          </div>     
       </div>
     </div>
  <div>
    <router-link  :to="{path:'/Tarinlist',query:{objid:objid}}" slot="left">
        <div class="exp">
          <div style='display: flex;line-height: 32px' class="itemexp">
              <div style="width: 18px;margin-right:6px;">
              <img  style="width: 100%;vertical-align: text-top;" src="../../assets/icon/peixjl@3x.png" alt="">
              </div>
              <span style='font-weight: bold;'>培训经历</span>
          </div>
         <div style='width: 11%'>
           <span style="line-height: 32px;color: #04be02">编辑</span>
         </div>
      </div>
    </router-link>
    <div class="noExp" v-show='noExptr'>你还没有培训经历,请添加</div>
      <div class="list" :data="trian_expForm.trian_expTableData" v-for="(item, index) in trian_expForm.trian_expTableData" :key="item.index">
            <div  v-for="(val,index) in item" :key="index">
             <div>
                <div style='display: flex;vertical-align: middle;' class="itemexp">
                  <div style='width: 14px;'>
                    <img style='width: 100%;vertical-align: middle;' src="../../assets/icon/yuan.png" alt="">
                  </div>
                  <span class="exp_time" style='vertical-align: middle;margin-left: 6px'>{{val.start_time}}-{{val.end_time}}</span>
                </div>
              <div class="fengexian">
                 <p class="exp_title">{{val.train_company}}</p>        
                 <p>课程描述:</p>
                <div v-html="val.class_description">{{val.class_description}}</div>
              </div>
             </div>         
            </div>     
        </div>
    </div>
  <div>
    <router-link  :to="{path:'/Edulist',query:{objid:objid}}" >
        <div class="exp">
          <div style='display: flex;line-height: 32px' class="itemexp">
              <div style="width: 18px;margin-right:6px">
                <img  style="width: 100%;vertical-align: text-top;" src="../../assets/icon/jiaoyjl@3x.png" alt="">
              </div>
              <span style='font-weight: bold;'><i class="fa musticon">*</i>&nbsp;教育经历</span>
          </div>            
         <div style='width: 11%'>
           <span style="line-height: 32px;color: #04be02">编辑</span>
         </div>
      </div>
    </router-link>
    <div class="noExp" v-show='noExped'>你还没有教育经历,请添加</div>      
      <div class="list" :data="edu_expForm.edu_expTableData" v-for="(item, index) in edu_expForm.edu_expTableData" :key="item.index">
          <div  v-for="(val,index) in item" :key="index">
           <div>
            <div style='display: flex;vertical-align: middle;' class="itemexp">
                  <div style='width: 14px;'>
                    <img style='width: 100%;vertical-align: middle;' src="../../assets/icon/yuan.png" alt="">
                  </div>
                  <span class="exp_time" style='vertical-align: middle;margin-left: 6px'>{{val.join_shcool}}-{{val.out_shcool}}</span>
              </div>
            <div class="fengexian">
               <p class="exp_title">{{val.shcool_name}}</p>        
               <p>{{val.profession}}</p>
             </div>
           </div>         
          </div>     
      </div>
    </div>
  <div>
    <router-link :to="{path:'/Certlist',query:{objid:objid}}">
       <div class="exp">
          <div style='display: flex;line-height: 32px' class="itemexp">
              <div style="width: 18px;margin-right:6px">
              <img  style="width: 100%;vertical-align: text-top;" src="../../assets/icon/huodzs@3x.png" alt="">
              </div>
              <span style='font-weight: bold;'>资格证书</span>
          </div> 
        <div style='width: 11%'>
           <span style="line-height: 32px;color: #04be02">编辑</span>
         </div>
      </div>
    </router-link>
    <div class="noExp" v-show='noExpcer'>你还没有资格证书,请添加</div>
      <div class="list" :data="certificateForm.certificateTableData" v-for="(item, index) in certificateForm.certificateTableData" :key="item.index">
          <div  v-for="(val,index) in item" :key="index">
            <div>
              <div style='display: flex;align-items: center' class="itemexp">
                  <div style='width: 14px;'>
                    <img style='width: 100%;vertical-align: middle;' src="../../assets/icon/yuan.png" alt="">
                  </div>                 
                  <p class="exp_title" style='margin-left: 6px;padding: 0'><span>{{val.get_award_time}}&nbsp;&nbsp;&nbsp;{{val.award_title}}</span></p>
              </div>
              <div class="fengexian">           
                <p style="padding-top: 10px">发布机构:{{val.company}}</p>
              </div>  
             </div>                          
          </div>     
      </div>
    </div>
  <div>
    <router-link  :to="{path:'/Lagulist',query:{objid:objid}}">
      <div class="exp">
          <div style='display: flex;line-height: 32px;' class="itemexp">
              <div style="width: 18px;margin-right:6px">
              <img  style="width: 100%;vertical-align: text-top;" src="../../assets/icon/yuynl@3x.png" alt="">
              </div>
              <span style='font-weight: bold;'>语言能力</span>
          </div>
         <div style='width: 11%'>
           <span style="line-height: 32px;color: #04be02">编辑</span>
         </div>
      </div>
    </router-link>
    <div class="noExp" v-show='noExplagu'>你还没有语言技能,请添加</div>  
       <div class="list" :data="laguForm.laguTableData" v-for="(item, index) in laguForm.laguTableData" :key="item.index">
          <div  v-for="(val,index) in item" :key="index">
           <div>
              <div style='display: flex;align-items: center;' class="itemexp">
                  <div style='width: 14px;'>
                    <img style='width: 100%;' src="../../assets/icon/yuan.png" alt="">
                  </div>                 
                  <p class="exp_title"  style='padding: 0;margin-left: 6px'><span>{{val.language}}&nbsp;/&nbsp;{{val.language_level}}</span></p>
              </div>
              <div class="fengexian">
                  <p style="padding-top: 10px;">听说:{{val.hearspeak}}&nbsp;/&nbsp;读写:{{val.readwrite}}</p>
              </div>        
           </div>         
        </div>     
      </div>
    </div>
  <div>
   <router-link :to="{path:'/Skilllist',query:{objid:objid}}">
      <div class="exp">
          <div style='display: flex;line-height: 32px;' class="itemexp">
              <div style="width: 18px;margin-right:6px">
              <img  style="width: 100%;vertical-align: text-top;" src="../../assets/icon/jinzs@3x.png" alt="">
              </div>
              <span style='font-weight: bold;'>技能展示</span>
          </div>
         <div style='width: 11%'>
           <span style="line-height: 32px;color: #04be02">编辑</span>
         </div>
      </div>
    </router-link>
    <div class="noExp" v-show='noExpskil'>你还没有技能展示,请添加</div>
      <div class="list" :data="skillForm.skillTableData" v-for="(item, index) in skillForm.skillTableData" :key="item.index">
          <div  v-for="(val,index) in item" :key="index">
            <div>
              <div style='display: flex;align-items: center;' class="itemexp">
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
      </div>
    </div>
  <div>
    <router-link :to="{path:'/Awardlist',query:{objid:objid}}">
      <div class="exp">
          <div style='display: flex;line-height: 32px' class="itemexp">
              <div style="width: 18px;margin-right:6px">
              <img  style="width: 100%;vertical-align: text-top;" src="../../assets/icon/huiodjl@3x.png" alt="">
              </div>
              <span style='font-weight: bold;'>获奖经历</span>
          </div>
        <div style='width: 11%'>
           <span style="line-height: 32px;color: #04be02">编辑</span>
         </div>
      </div>
    </router-link>
    <div class="noExp" v-show='noExpawrad'>你还没有获奖经历,请添加</div>      
     <div class="list" :data="awordExpForm.awordTableData" v-for="(item, index) in awordExpForm.awordTableData" :key="item.index">
          <div  v-for="(val,index) in item" :key="index">
           <div>
            <div style='display: flex;align-items: center;' class="itemexp">
                  <div style='width: 14px;'>
                    <img style='width: 100%;vertical-align: middle;' src="../../assets/icon/yuan.png" alt="">
                  </div>
                   
                   <p class="exp_title" style='margin-left: 6px;padding: 0'>{{val.award_time}}
                </p>
              </div>
              <div class="fengexian">
                <p class="exp_title">{{val.award_name}}</p>
             <p>补充说明:</p>
             <div v-html="val.mark">{{val.mark}}</div>             
             </div>      
           </div>         
        </div>     
      </div>
    </div>

  </div>

</template>

<script>
   
export default {
 props:{
     msg: String
  },
  data () {
        return {
          objid:'',
          baseId:'',
          noExp:false,
          noExpro:false,
          noExptr:false,
          noExped:false,
          noExpcer:false,
          noExplagu:false,
          noExpskil:false,
          noExpawrad:false,
         job_expForm:{       //工作经验
          start_time:'',
          end_time:'',
          job_description:'',
          company:'',
          job_title:'',
        job_expTableData: [],
         },         
         pro_expForm:{      //项目经验
          pro_name:'',
          pro_role:'',
          pro_description:'',
          start_time:'',
          end_time:'',
          main_duty:'',
          project_name:'',
        pro_expTableData: [],
         },
         trian_expForm:{      //培训经历
          trian_name:'',
          start_time:'',
          end_time:'',
          trian_description:'',
        trian_expTableData: [],
         },
         edu_expForm:{      //教育经历
          edu_record:'',
          edu_degree:'',
          start_time:'',
          end_time:'',
          edu_school:'',
          profession:'',
        edu_expTableData: [],
         },
         certificateForm:{      //资格证书
          certificateName:'',
          getOrg:'',
          getTime:'',
        certificateTableData: [],
         },
         laguForm:{      //语言能力
          lagu:'',
          lagu_level:'',
          hear:'',
          write:'',
        laguTableData: [],
         },
          skillForm:{      //技能展示
          skill:'',
          proficiency:'',
        skillTableData: [],
         },
         awordExpForm:{      //获奖经历
          awordName:'',
          awordTime:'',
          awordDetail:'',
        awordTableData: [],
         },
        }
      },
   created(){
   this.findResume();

   },
  mounted () { 
    this.workList();
    this.proList();
    this.trianList();
    this.eduList();
    this.certificateList();
    this.skillList();
    this.awardList();
    this.laguList(); 
      
  },

   methods:{ 
   findResume(){
      let params = new URLSearchParams();
        params.append('wx_openid',_const.openId);
        let _this = this; 
        this.$http.post(_const.requestUrl+'/v1/user/findResume',params).then(function ( res ){
          _const.base_id=res.list.base_id;
          _this.objid=res.list.object_id;


      /*    alert(_const.base_id);*/
        
        });

     },     
      workList:function(){    // 工作列表    
        var paramsList=new URLSearchParams(); 
           /* alert(_const.base_id)*/
             paramsList.append('base_id',_const.base_id);
              let _this = this;
            this.$http.post(_const.requestUrl+'/v1/user/worklist',paramsList).then(function ( res ){            
              if(res.list.total==0){
                _this.noExp=true;
              }
              _this.job_expForm.job_expTableData.push(res.list.data);
              _this.$emit('jobData',_this.job_expForm.job_expTableData);
            localStorage.setItem('aab',JSON.stringify(_this.job_expForm.job_expTableData));
            for(var i=0;i<_this.job_expForm.job_expTableData.length;i++){
               for(var j=0;j<_this.job_expForm.job_expTableData[i].length;j++){
                 _this.job_expForm.job_expTableData[i][j].job_description=_this.job_expForm.job_expTableData[i][j].job_description.replace(/\n|\r\n/g,"<br/>"); 
               }              
            } 

        });

      },                    
      proList:function(){    // 项目列表
        var paramsList=new URLSearchParams(); 
             paramsList.append('base_id',_const.base_id);
              let _this = this;
            this.$http.post(_const.requestUrl+'/v1/user/projectlist',paramsList).then(function ( res ){
              if(res.list.total==0){
                _this.noExpro=true;
              }
              _this.pro_expForm.pro_expTableData.push(res.list.data);
               _this.$emit('proData',_this.pro_expForm.pro_expTableData);
                localStorage.setItem('proj',JSON.stringify(_this.pro_expForm.pro_expTableData));
                for(var i=0;i<_this.pro_expForm.pro_expTableData.length;i++){
                  for(var j=0;j<_this.pro_expForm.pro_expTableData[i].length;j++){
                 _this.pro_expForm.pro_expTableData[i][j].project_description=_this.pro_expForm.pro_expTableData[i][j].project_description.replace(/\n|\r\n/g,"<br/>");

               }              
            }               
          });
      },             


      trianList:function(){    // 培训列表
          var paramsList=new URLSearchParams(); 
               paramsList.append('base_id',_const.base_id);
                let _this = this;
              this.$http.post(_const.requestUrl+'/v1/user/trainlist',paramsList).then(function ( res ){
                if(res.list.total==0){
                _this.noExptr=true;
                }
                _this.trian_expForm.trian_expTableData.push(res.list.data);
                _this.$emit('trianData',_this.trian_expForm.trian_expTableData);
                 localStorage.setItem('trian',JSON.stringify(_this.trian_expForm.trian_expTableData));
                 for(var i=0;i<_this.trian_expForm.trian_expTableData.length;i++){
                   for(var j=0;j<_this.trian_expForm.trian_expTableData[i].length;j++){
                 _this.trian_expForm.trian_expTableData[i][j].class_description=_this.trian_expForm.trian_expTableData[i][j].class_description.replace(/\n|\r\n/g,"<br/>");

                }              
              }
            });
          },             

      eduList:function(){    // 教育列表
        var paramsList=new URLSearchParams(); 
             paramsList.append('base_id',_const.base_id);
              let _this = this;
            this.$http.post(_const.requestUrl+'/v1/user/edcationlist',paramsList).then(function ( res ){
              if(res.list.total==0){
                _this.noExped=true;
              }
              _this.edu_expForm.edu_expTableData.push(res.list.data);
               _this.$emit('eduData',_this.edu_expForm.edu_expTableData);
               localStorage.setItem('edu',JSON.stringify(_this.edu_expForm.edu_expTableData));
                 for(var i=0;i<_this.edu_expForm.edu_expTableData.length;i++){
                   for(var j=0;j<_this.edu_expForm.edu_expTableData[i].length;j++){

                }              
              }       
            });
          },             

            certificateList:function(){    // 证书列表
              var paramsList=new URLSearchParams(); 
                   paramsList.append('base_id',_const.base_id);
                    let _this = this;
                  this.$http.post(_const.requestUrl+'/v1/user/awardlist',paramsList).then(function ( res ){
                    if(res.list.total==0){
                      _this.noExpcer=true;
                    }
                    _this.certificateForm.certificateTableData.push(res.list.data);
                    _this.$emit('certData',_this.certificateForm.certificateTableData);
                    localStorage.setItem('cert',JSON.stringify(_this.certificateForm.certificateTableData));
                     for(var i=0;i<_this.certificateForm.certificateTableData.length;i++){
                         for(var j=0;j<_this.certificateForm.certificateTableData[i].length;j++){
 
                      }              
                    }                                     
                  });

            },             


      laguList:function(){    // 语言能力列表
          var paramsList=new URLSearchParams(); 
               paramsList.append('base_id',_const.base_id);
                let _this = this;
              this.$http.post(_const.requestUrl+'/v1/user/languagelist',paramsList).then(function ( res ){
                if(res.list.total==0){
                _this.noExplagu=true;
              }
                _this.laguForm.laguTableData.push(res.list.data);
                _this.$emit('laguData',_this.laguForm.laguTableData);
               for(var i=0;i< _this.laguForm.laguTableData[0].length;i++){
                   if( _this.laguForm.laguTableData[0][i].hearspeak=='1'){
                       _this.laguForm.laguTableData[0][i].hearspeak='熟练';
                    }else if(  _this.laguForm.laguTableData[0][i].hearspeak=='2'){
                      _this.laguForm.laguTableData[0][i].hearspeak='一般'
                    }else if ( _this.laguForm.laguTableData[0][i].hearspeak=='0') {
                        _this.laguForm.laguTableData[0][i].hearspeak='精通'
                    }
                    if( _this.laguForm.laguTableData[0][i].readwrite=='1'){
                       _this.laguForm.laguTableData[0][i].readwrite='熟练';
                    }else if( _this.laguForm.laguTableData[0][i].readwrite=='2'){
                       _this.laguForm.laguTableData[0][i].readwrite='一般'
                    }else if ( _this.laguForm.laguTableData[0][i].readwrite=='0') {
                        _this.laguForm.laguTableData[0][i].readwrite='精通'
                    }
                    if( _this.laguForm.laguTableData[0][i].language_level=='1'){
                       _this.laguForm.laguTableData[0][i].language_level='熟练';
                    }else if( _this.laguForm.laguTableData[0][i].language_level=='2'){
                       _this.laguForm.laguTableData[0][i].language_level='一般'
                    }else if ( _this.laguForm.laguTableData[0][i].language_level=='0') {
                        _this.laguForm.laguTableData[0][i].language_level='精通'
                    }

                }
                
            });
          },             


      skillList:function(){    // 技能列表
      var paramsList=new URLSearchParams(); 
           paramsList.append('base_id',_const.base_id);
            let _this = this;
          this.$http.post(_const.requestUrl+'/v1/user/professionslist',paramsList).then(function ( res ){
            if(res.list.total==0){
                _this.noExpskil=true;
              }
            _this.skillForm.skillTableData.push(res.list.data);
             _this.$emit('skillData',_this.skillForm.skillTableData);
              localStorage.setItem('skill',JSON.stringify(_this.skillForm.skillTableData)); 
              for(var i=0;i<_this.skillForm.skillTableData[0].length;i++){
               if(_this.skillForm.skillTableData[0][i].proficiency=='1'){
                  _this.skillForm.skillTableData[0][i].proficiency='熟练';
                }else if( _this.skillForm.skillTableData[0][i].proficiency=='2'){
                  _this.skillForm.skillTableData[0][i].proficiency='一般'
                }else if (_this.skillForm.skillTableData[0][i].proficiency=='0') {
                   _this.skillForm.skillTableData[0][i].proficiency='精通'
                }
              }
          });
      },             


      awardList:function(){    // 获奖经历列表
        var paramsList=new URLSearchParams(); 
             paramsList.append('base_id',_const.base_id);
              let _this = this;
            this.$http.post(_const.requestUrl+'/v1/user/award_proccesslist',paramsList).then(function ( res ){
              if(res.list.total==0){
                _this.noExpawrad=true;
              }
              _this.awordExpForm.awordTableData.push(res.list.data);
              _this.$emit('awardData',_this.awordExpForm.awordTableData);
              localStorage.setItem('award',JSON.stringify(_this.awordExpForm.awordTableData));
              for(var i=0;i<_this.awordExpForm.awordTableData.length;i++){
                   for(var j=0;j<_this.awordExpForm.awordTableData[i].length;j++){
                _this.awordExpForm.awordTableData[i][j].mark=_this.awordExpForm.awordTableData[i][j].mark.replace(/\n|\r\n/g,"<br/>");
                /*  _this.awordExpForm.awordTableData[i][j].award_time=_this.getLocalTime( _this.awordExpForm.awordTableData[i][j].award_time);*/
                }              
              }                         
            });
      },             
   
    },

}

</script>
<style scoped lang='less'>
.experience{
  word-wrap: break-word;
  font-size: 12px;
  color: #999;
  background: rgb(235, 235, 235);  
   div{
    background: rgb(235, 235, 235);
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

   }
   .itemexp{
    display: flex; 
    display: -webkit-flex;
   }
   .exp_time{
    color: #999;
    font-size: 12px;
    display: inline-block;

   }
   .exp_title{
    font-size: 15px;
    color: #4c4c4c;
    margin: 0px auto;
    padding: 10px 0;
   }
   i{
    font-size: 15px;
   }
  
}
   .experience>div{
    width: 100%;
    margin: 0.2rem auto ;
    padding: 0 15px 0 15px;
   }

  .router-link-active>a{
    background: red;
  }
  .fengexian{
    border-left: 1px solid #eee;
    padding-left: 14px;
    margin-left: 6px;
    padding-bottom: 25px;

  }
  .list{
    padding-top: 15px;
  }
.router-link-active {
  color: #f66;
}
.noExp{
  text-align: center;
/*   padding-top: 15px; */
}
.musticon{
  position: relative;
  top: 2px;
  color: red;
  font-size: 20px;
}
</style>
