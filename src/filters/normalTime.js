export const normalTime = (time) => {
    if (time) {
        var Odate = new Date();
        Odate.setTime(time);
        var y = Odate.getFullYear();
        var m = (Odate.getMonth() + 1);
        var d = Odate.getDate();

        var h = Odate.getHours();
        var mm = Odate.getMinutes();
        var s = Odate.getSeconds();
        //return y + '/' + m + '/' + d + ' ' + h + ':' + m + ':' + s;
        return y + '/' + m ;
    }
}