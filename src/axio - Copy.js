
import axios from 'axios'
import router from './router'
import { Indicator,Toast } from 'mint-ui';
// http request 拦截器
 $.ajaxSetup({
    beforeSend: function () {
  Indicator.open({   //打开loading
          spinnerType: 'fading-circle'
      });
    },
    complete: function (XMLHttpRequest,textStatus) {
      Indicator.close();
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      Toast('网络异常');
      Indicator.close();
    //ajax请求失败
    },
    success:function(data, textStatus){
      console.log(data)
      console.log(textStatus)
    }

});
export default axios