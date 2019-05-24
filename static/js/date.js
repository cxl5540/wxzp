 var formatDate=function(inputTime) {
      var date = new Date(inputTime);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;

      return y + '-' + m + '-' + d ;
    }


/*exports = function (Vue, options) {
    Vue.prototype.formatDate = function (inputTime){
        var date = new Date(inputTime);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;

      return y + '-' + m + '-' + d ;
    };
};*/