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

export const formatNumber = function(number){
    if (number <= 0) {
        return "0";
    }
    else if (number < 10000) {
        return number.toString();
    }
    else if (number < 100000) {
        return (number / 10000).toFixed(1).replace(/\.?0*$/ig, '') + "万";
    }
    else if (number <= 100000000) {
        return (number / 10000).toFixed(1) + "万+";
    } else if (number < 100000000 * 10) {//10亿
        return (number / 100000000).toFixed(1).replace(/\.?0*$/ig, '') + "亿+";
    }
    else {
        return (number / 100000000).toFixed(1).replace(/\.?0*$/ig, '') + "亿+";
    }
}