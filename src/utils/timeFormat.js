export const initDate = function(ms){
    var date = new Date(ms);
    var nowDate = new Date();
    var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    var diffMin = (nowDate.getHours() * 60 + nowDate.getMinutes()) - (date.getHours() * 60 + date.getMinutes())
    if (nowDate.getFullYear() === date.getFullYear() && nowDate.getMonth() === date.getMonth() && nowDate.getDate() === date.getDate() && diffMin < 60) {
        return str = diffMin ? diffMin + '分钟前' : '刚刚';
    }
    var str = (date.getMonth() + 1) + '月' + date.getDate() + '日 ' + hours + ':' + minutes;
    return str;
}