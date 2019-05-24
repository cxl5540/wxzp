
import axios from 'axios'
import router from './router'
import { Indicator,Toast } from 'mint-ui';
// http request 拦截器
axios.interceptors.request.use((config) => {
    Indicator.open({   //打开loading
          spinnerType: 'fading-circle'
      });
      return config;
  }, (err) => {
           Toast('网络异常');
            Indicator.close()
          return Promise.reject(err)

  });
  //响应拦截器
  axios.interceptors.response.use((response) => {
    setTimeout(function(){
        Indicator.close()

    },1000);
    if(response.status!=200){
      Toast('网络异常');
       setTimeout(function(){
          Indicator.close();//关闭loading

        },1000)
    }else{
      if(response.data.code==200){
        return response.data.data;
      }else{
        console.log(response.data.msg)
        if(response.data.msg){
          Toast(response.data.msg)
        }else{
          Toast('网络异常');
          setTimeout(function(){
              Indicator.close();//关闭loading

            },1000)
        }
        
      }
    }          
  }, (err) => {
      Toast('网络异常');
          setTimeout(function(){
              Indicator.close();//关闭loading
            },1000)
          return Promise.reject(err);

  });
export default axios