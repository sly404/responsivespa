export const formatNumber = function(number){
    if (number <= 0) {
        return "";
    }else if (number < 1000) {
        return number.toString();
    }else{
        return "999+"
    }
}