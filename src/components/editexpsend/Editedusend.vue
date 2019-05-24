<template>
<div>
   <div class="nav" >
       <i class="fa fa-angle-left"  @click='back' style="color:#04be02 "></i>
       <span>{{title}}</span>
       <span @click='submit' style="color:#04be02 ">保存</span>
    </div>
   <div class="information">
        <yd-cell-group>
            <yd-cell-item arrow>
                <span slot="left">入学时间</span>
                <yd-datetime type="date" start-year='1990' :init-emit="false" v-model="join_shcool" slot="right" placeholder="请选择"></yd-datetime>
            </yd-cell-item>
            <yd-cell-item arrow>
                <span slot="left">毕业时间</span>
                <yd-datetime type="date"  start-year='1990' :init-emit="false" v-model="out_shcool" slot="right" placeholder="请选择"></yd-datetime>
            </yd-cell-item>  
            <yd-cell-item arrow>
                <yd-icon name="ucenter"  size=".3rem" color='rgb(42, 187, 79)'></yd-icon>
                <span slot="left">获得学历</span>
              <select slot="right" v-model="eduction_record " >
                <option value="">请选择</option>
                <option value="01">初中及以下</option>
                <option value="02">高中</option>
                <option value="03">职高</option>
                <option value="04">中技</option>
                <option value="05">中专</option>
                <option value="06">专科</option>
                <option value="07">高职</option>
                <option value="08">大学本科</option>
                <option value="09">硕士研究生</option>
                <option value="10">博士研究生</option>
            </select>
            </yd-cell-item>
            <yd-cell-item arrow>
                <yd-icon name="ucenter"  size=".3rem" color='rgb(42, 187, 79)'></yd-icon>
                <span slot="left">获得学位</span>
                <!-- <input slot="right" type="text" placeholder="" value="" v-model='eduction_degree'> -->
             <select slot="right" v-model="eduction_degree " >
                <option value="">请选择</option>
                <option value="04">学士</option>
                <option value="03">硕士</option>
                <option value="02">博士</option>
                <option value="00">无</option>

            </select>
            </yd-cell-item>
            <yd-cell-item>
                <yd-icon name="ucenter"  size=".3rem" color='rgb(42, 187, 79)'></yd-icon>
                <span slot="left">所学专业</span>
                <input slot="right" type="text"  placeholder="请输入所学专业" v-model='profession'   maxlength="20">
            </yd-cell-item>
            <yd-cell-item>
                <yd-icon name="ucenter"  size=".3rem" color='rgb(42, 187, 79)'></yd-icon>
                <span slot="left">学校名称</span>
                <input slot="right" type="text"  placeholder="请输入学校名称"  v-model='shcool_name'   maxlength="20">
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
        eduList:[],
        title:'',
        Status:'',
        join_shcool:'',
        out_shcool:'',
        eduction_record:'',
        eduction_degree:'',
        education_id:'',
        profession:'',
        shcool_name:'',
        newbase_id:'',
        baselist:[],
        obj_id:'',
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
      this.title='编辑教育经历';
    }else if(this.$route.query.type==='add'){
      this.title='添加教育经历';
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
        console.log(_this.baselist)
        });

     },
    back:function(){
      this.$router.go(-1);
    },
    show:function(){
      this.eduDtat=this.$route.query.editTable;
      this.join_shcool=this.formatDate(this.eduDtat.join_shcool);
      this.out_shcool=this.formatDate(this.eduDtat.out_shcool);
      this.eduction_record=this.eduDtat.eduction_record;
      this.eduction_degree=this.eduDtat.eduction_degree;
      this.profession=this.eduDtat.profession;
      this.shcool_name=this.eduDtat.shcool_name;
      this.education_id=this.eduDtat.education_id;
      console.log(this.eduDtat);
    },
    submit:function(){
      var params = new URLSearchParams();
       // params.append('education_id', this.education_id);
        params.append('join_shcool', this.join_shcool);
        params.append('out_shcool',this.out_shcool);
        params.append('eduction_record', this.eduction_record);
        params.append('profession', this.profession);
        params.append('shcool_name', this.shcool_name);
        params.append('eduction_degree', this.eduction_degree);
        if(this.$route.query.type==='edit'){             //修改
           if(this.check()){
        params.append('education_id', this.education_id);
        let _this = this;
        this.$http.post(_const.requestUrl+'/v1/userrecord/editEdcation',params).then(function ( res ){ 
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
                      _this.$http.post(_const.requestUrl+'/v1/userrecord/addEdcation',params).then(function ( res ){
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
          this.$http.post(_const.requestUrl+'/v1/userrecord/edcationlist',paramsList).then(function ( res ){
          _this.eduList.push(res.list.data);
             let attrproSave=[];
           for(var i=0;i<_this.eduList[0].length;i++){
           let obj= new Object();
            obj["MAJOR"]=_this.eduList[0][i].profession;
             obj["DATESTART"]=_this.eduList[0][i].join_shcool;
             obj["SCHOOL"]=_this.eduList[0][i].shcool_name;
             obj["DIPLOMAS"]=_this.eduList[0][i].eduction_degree;
             obj["DEGREE"]=_this.eduList[0][i].eduction_record;
             obj["DATEEND"]=_this.eduList[0][i].out_shcool;
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
                  "EDUCATIONEXP":attrproSave,
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
    },
    check(){
      if(this.join_shcool.length == 0) {
          Toast({
            message: "请选择入学时间",
            duration: 1000
          });
          return false;
        }

       if(this.out_shcool.length == 0) {
        Toast({
          message: "请选择毕业时间",
          duration: 1000
        });
        return false;
      }
      if(this.eduction_record.length == 0) {
        Toast({
          message: "请选择学历",
          duration: 1000
        });
        return false;
      }
      if(this.eduction_degree.length == 0) {
        Toast({
          message: "请选择学位",
          duration: 1000
        });
        return false;
      }
    if(this.profession.length == 0) {
        Toast({
          message: "专业不能为空",
          duration: 1000
        });
        return false;
      }
     if(this.profession.length>20) {
        Toast({
          message: "专业不超过20字",
          duration: 1000
        });
        return false;
      }
    if(this.shcool_name.length == 0) {
        Toast({
          message: "学校名称不能为空",
          duration: 1000
        });
        return false;
      }
    if(this.shcool_name.length >20) {
        Toast({
          message: "学校名称不超过20字",
          duration: 1000
        });
        return false;
      }
      return true;
     }
 }
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
