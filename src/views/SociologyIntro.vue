<template>
  <div class="solist" >
    <div class="nav" >
       <i class="fa fa-angle-left"  @click='back' style="color:#04be02 "></i>
       <span>社会招聘列表</span>
       <span class="relodyd"></span>
       <span class="reload" style="color:#04be02;" @click='reloadpc'>刷新</span>
    </div>
    <div style="margin-top: 52px;">
      <img src="../assets/icon/社招.png" width="100%">
    </div>
    <div style="margin-top: -0.1rem">
      <yd-search v-model="searchValue" :on-submit="searchHandler" :on-cancel='searCancel'></yd-search>
    </div>
    <div class="list">
      <yd-grids-group :rows="3">
        <yd-grids-item @click.native='company1'  >
          <span slot="text"  :class="{ 'class-a': isA,}">公司&nbsp;&nbsp;<img style="width: 8px;vertical-align: middle;" src="../assets/icon/gengd1@3x.png" alt=""></span>                 
        </yd-grids-item>
        <yd-grids-item  @click.native='types'>
          <span slot="text"  :class="{ 'class-b': isB,}">职位分类&nbsp;&nbsp;<img style="width: 8px;vertical-align: middle;" src="../assets/icon/gengd1@3x.png" alt=""></span>
        </yd-grids-item>
        <yd-grids-item @click.native='adress'>
          <span slot="text"  :class="{ 'class-c': isC,}">地点&nbsp;&nbsp;<img style="width: 8px;vertical-align: middle;" src="../assets/icon/gengd1@3x.png" alt=""></span>
        </yd-grids-item>
      </yd-grids-group>
    </div>
    <ul id="ullist">
      　<li v-for="(item,$index) in compList" ref='cc' @click="selectCom (item, $index) ">{{item.need_comany}}</li>
    </ul>
    <ul id="adrlsit">
      　<li v-for="(item,$index) in adList"  ref='aa' @click="selectAdr (item, $index) "  :class="active">{{item.job_address}}</li>      
    </ul>
     <ul id="typeslist">
       <li v-for="(item,$index) in tyList" ref='bb' @click="selectTty (item, $index) ">{{item.job_class}}</li>
     </ul>
<scroller :on-refresh="refresh"
          :on-infinite="infinite"
          ref="my_scroller"
          style="margin-top:366px;"
                  >
    <div class="SociolyList" style="background-color: #fff" v-for="(item, index) in SociolyList" :key="index">
      <!-- <router-link :to="'/shcoolListDetail/'+item.id"> -->
      <router-link :to="{path:'shcoolListDetail', query:{id:item.id,class:'1'}}">
        <div style="border-bottom: 1px solid #eee;padding: 15px 15px;">
           <div style="overflow: hidden;">
                 <span style="font-weight: bold;color: #4c4c4c;font-size: 15px;line-height: 32px">{{item.job_title}}({{item.need_num}}人)</span>
                  <span style="font-size: 14px;color: #999;float: right;line-height: 32px">发布时间:{{item.create_time}}</span>       
            </div>
           <div style=" padding-top: 10px">
             <span style="color: #4c4c4c;font-size: 15px;flex: 0.5;text-align: justify;">职位类型：{{item.job_class}}</span>           
           </div>
           <div  style="display: flex; display: -webkit-flex;justify-content: space-between;">
             <span style="font-size: 14px; color:#4c4c4c;margin-top: 15px">{{item.need_comany}}</span>
            <div style="display: flex; display: -webkit-flex;flex-direction: row;margin-top: 15px">
               <div style='width: 10px;margin-right: 6px'>
                 <img style='width: 100%;vertical-align: bottom;' src="../assets/icon/dingw@3x.png" alt="">
               </div>
               <span style="font-size: 14px;color: #4c4c4c;">{{item.job_address}}</span>
             </div>
            
           </div>
        </div>
      </router-link>   
    </div>
  </scroller>
   <div class=" SchollList pclist" style="margin-bottom: 20px;display: none;">
      <div class="SociolyList" style="background-color: #fff" v-for="(item, index) in SociolyList" :key="index">
          <!-- <router-link :to="'/shcoolListDetail/'+item.id"> -->
          <router-link :to="{path:'shcoolListDetail', query:{id:item.id,class:'1'}}">
            <div style="border-bottom: 1px solid #eee;padding: 15px 15px;">
               <div style="overflow: hidden;">
                     <span style="font-weight: bold;color: #4c4c4c;font-size: 15px;line-height: 32px">{{item.job_title}}({{item.need_num}}人)</span>
                      <span style="font-size: 14px;color: #999;float: right;line-height: 32px">发布时间:{{item.create_time}}</span>       
                </div>
               <div style=" padding-top: 10px">
                 <span style="color: #4c4c4c;font-size: 15px;flex: 0.5;text-align: justify;">职位类型：{{item.job_class}}</span>           
               </div>
               <div  style="display: flex; display: -webkit-flex;justify-content: space-between;">
                 <span style="font-size: 14px; color:#4c4c4c;margin-top: 15px">{{item.need_comany}}</span>
                <div style="display: flex; display: -webkit-flex;flex-direction: row;margin-top: 15px">
                   <div style='width: 10px;margin-right: 6px'>
                     <img style='width: 100%;vertical-align: bottom;' src="../assets/icon/dingw@3x.png" alt="">
                   </div>
                   <span style="font-size: 14px;color: #4c4c4c;">{{item.job_address}}</span>
                 </div>
                
               </div>
            </div>
          </router-link>   
        </div>
        <p style="text-align: center;padding: 10px;font-size: 17px;color: #999">没有更多数据</p>
  </div>
</div>
</template>
<script>
    export default {
        data () {
            return {
                scrollTop:'',
                searchValue:"",
                SociolyList: [],
                page:1,
                hasNext:false,
                last_page:'',
                adList:[],
                tyList:[],
                compList:[],
                active: false,
                isA:false,
                isB:false,
                isC:false,
                enable:true

            }

        },
        beforeCreate () {
            //this.$dialog.toast({mes: `1`});
        },
        created () {
            //this.$dialog.toast({mes: `1`});
        },
        mounted () {
            this.getSchoolList(this.page);
            this.company();
            this.inint();
        },
        destroyed () {
            window.removeEventListener('scroll', this.scrollToTop)
          },
        methods:{
        inint(){
           var version=window.navigator.platform;
           if (version=="Win32" || version=="MacPPC" || version=="Linuxi586")
                {
                  window.addEventListener('scroll', this.onScroll);
                  window.addEventListener('scroll', this.scrollToTop);
                }
          },
          onScroll(){
          this.scollY = this.getScrollTop() + this.getWindowHeight() - this.getScrollHeight();
            if(this.enable){
                this.enable=false;
                if(this.scollY>-10){
                  this.page=this.page+1;
                  this.getSchoolList();
                }else{
                  this.enable=true;
                }
              }
              return;
            },
        scrollToTop () {            //返回顶部
          let that = this
          let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
          that.scrollTop = scrollTop;
        },
        reloadpc(){                   //刷新
              this.isA=false;
              this.isB=false;
              this.isC=false;
              $('#ullist').hide();
              $('#adrlsit').hide();
              $('#typeslist').hide();
              this.page=1;
              this.getSchoolList(this.page);
              let that = this
              let timer = setInterval(() => {
                let ispeed = Math.floor(-that.scrollTop / 5)
                document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
                if (that.scrollTop === 0) {
                  clearInterval(timer)
                }
              }, 16);
            },
         company(){
          let _this=this;
          let serchParms =new URLSearchParams();
              serchParms.append('type', '社会招聘');
            _this.$http.post(_const.requestUrl+'/v1/jobs/searchCompanyList',serchParms).then(function ( res ){
              let ulList=$('#ullist');
              _this.compList=res.list;
                ulList.hide();
            });
           
           _this.$http.post(_const.requestUrl+'/v1/jobs/searchWorkAdressList',serchParms).then(function ( res ){
              let adrList=$('#adrlsit');
                  _this.adList=res.list;
                  adrList.hide(); 
            });

          this.$http.post(_const.requestUrl+'/v1/jobs/searchJobTypeList',serchParms).then(function ( res ){
              console.log(res);
              let typeList=$('#typeslist');
               _this.tyList=res.list;
               typeList.hide();
            });

          },
          company1(){
            $('#ullist').slideToggle();
            $('#adrlsit').hide();
             $('#typeslist').hide();
             this.isA=true;
             this.isB=false;
             this.isC=false;
             
          },
          adress(){
            $('#adrlsit').slideToggle();
            $('#ullist').hide();
            $('#typeslist').hide();
             this.isC=true;
             this.isA=false;
             this.isB=false;

          },
   
          types(){
           $('#typeslist').slideToggle();
            $('#ullist').hide();
            $('#adrlsit').hide();
             this.isB=true;
             this.isC=false;
             this.isA=false;
          },
          selectAdr(item, index){             //按地址搜索
            let selcvalue=item.job_address;
              let serchParms =new URLSearchParams();
              serchParms.append('type', '社会招聘');
             serchParms.append('address', selcvalue);
             let _this=this;
              this.$http.post(_const.requestUrl+'/v1/jobs/jobslist',serchParms).then(function ( res ) {
                console.log(res);
               _this.SociolyList = res.list.data;
               for(var i=0;i<_this.SociolyList.length;i++){
                _this.SociolyList[i].create_time=_this.getLocalTime( _this.SociolyList[i].create_time);
               }
               console.log(_this.SociolyList );
               });
              setTimeout(function(){
                 $('#adrlsit').slideUp();
                  _this.$refs.aa[index].style.color='#000'
              },500)
              _this.$refs.aa[index].style.color='#04be02'

            }, 
            selectTty(item, index){                      //按类型搜索
             let selcvalue=item.job_class;
              console.log(selcvalue);
              let serchParms =new URLSearchParams();
              serchParms.append('type', '社会招聘');
              serchParms.append('class', selcvalue);
             let _this=this;
              this.$http.post(_const.requestUrl+'/v1/jobs/jobslist',serchParms).then(function ( res ) {
                console.log(res);
                _this.SociolyList = res.list.data;
                  for(var i=0;i<_this.SociolyList.length;i++){
                _this.SociolyList[i].create_time=_this.getLocalTime( _this.SociolyList[i].create_time);
                }
               });
              setTimeout(function(){
                 $('#typeslist').slideUp();
                  _this.$refs.bb[index].style.color='#000'
              },500)
              _this.$refs.bb[index].style.color='#04be02'

            },
            selectCom(item, index){            //按公司搜索
               let selcvalue=item.need_comany;
              console.log(selcvalue);
              let serchParms =new URLSearchParams();
              serchParms.append('type', '社会招聘');
               serchParms.append('company', selcvalue);
               let _this=this;
              this.$http.post(_const.requestUrl+'/v1/jobs/jobslist',serchParms).then(function ( res ) {
                console.log(res);
                _this.SociolyList = res.list.data;
                  for(var i=0;i<_this.SociolyList.length;i++){
                _this.SociolyList[i].create_time=_this.getLocalTime( _this.SociolyList[i].create_time);
                }
               });

               setTimeout(function(){
                 $('#ullist').slideUp();
                  _this.$refs.cc[index].style.color='#000'
              },500)
              _this.$refs.cc[index].style.color='#04be02'  
            },

           refresh:function(done){         //下拉刷新
　　　　　　　　this.page=1;
　　　　　　　　this.timeout = setTimeout(()=>{
　　　　　　　     　//this.$refs.my_scroller.finishPullToRefresh()
                this.getSchoolList();
                done();
　　　　　　　　}, 1500);
                 this.isA=false;
                 this.isB=false;
                 this.isC=false;

　　　　　　},
          infinite:function(done) {             //上拉加载           
                  var that=this;
                  if(that.hasNext){                    
                    setTimeout(() => {
                      if(that.hasNext){
                         this.getSchoolList();                    
                        done();
                      }else{
                         done("noDataText");
                      }                      
                    },1500)

                     that.page=that.page+1;
                     if(that.page==that.last_page){
                       done("noDataText");
                     }
                  }else {
                    done("noDataText");
                    
                  }
                       
                },
          back(){
             this.$router.go(-1); 
          },

           searchHandler (value) {
            $('#ullist').hide();
                $('#adrlsit').hide();
                 $('#typeslist').hide();
                 this.isA=false;
                 this.isB=false;
                 this.isC=false;
                if(value==''){
                  this.page=1;
                   this.getSchoolList();
                }
                 this.searchValue=value;
                let serchParms =new URLSearchParams();
                    serchParms.append('type', '社会招聘');
                   serchParms.append('kewords', this.searchValue);
                 let _this = this
                  this.$http.post(_const.requestUrl+'/v1/jobs/jobslist',serchParms).then(function ( res ) {
                    console.log(res);
                  _this.SociolyList = res.list.data;
                    for(var i=0;i<_this.SociolyList.length;i++){
                      _this.SociolyList[i].create_time=_this.getLocalTime( _this.SociolyList[i].create_time);
                      }
                   });
            },
            searCancel(){
               this.isA=false;
               this.isB=false;
               this.isC=false;
              this.searchValue='';
               this.page=1;            
             this.getSchoolList();
            },
            getSchoolList() {
              var params = new URLSearchParams();
              params.append('type', '社会招聘');
              params.append('page', this.page);
              let _this = this
              this.$http.post(_const.requestUrl+'/v1/jobs/jobslist',params).then(function ( res ) {
               let reponData=res.list.data;
               console.log(res)
                      _this.last_page=res.list.last_page;
                     _this.hasNext=res.list.last_page-res.list.current_page;
                    for(var i= 0;i<reponData.length;i++){
                      reponData[i].create_time=_this.getLocalTime(reponData[i].create_time);
                    }
                     if(_this.page==1){
                       _this.SociolyList = reponData;
                     }else{
                       for(var i=0;i<reponData.length;i++){
                        _this.SociolyList.push(reponData[i]);
                       }
                   }

                   console.log(_this.SociolyList)
              });
            }

        }
    }
</script>
<style scoped lang="less">
.class-a{
  color: #04be02;
}
.class-b{
  color: #04be02;
}
.class-c{
  color: #04be02;
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


   .list span{
    font-size: 15px;
  }

  ._v-container{
    z-index: 900;
  }
  .yd-navbar{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }

  #adrlsit, #typeslist,#ullist{
    padding:0 15px;
     background:rgba(255,255,255,1);
     z-index:99999;
  /*   border-bottom:1px solid #eee; */
     font-size: 14px;
     position: absolute;
     width: 100%;
     box-shadow: 0px 10px 10px #eee;
     height: 200px;
     overflow: scroll;
  }
  li{
    padding: 14px 0;
    border-bottom: 1px solid #eee;
  }
.active {
  color: red;
}
</style>