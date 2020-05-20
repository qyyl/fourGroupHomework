/**
 * Created by adminpc on 2020/5/20.
 */
(function () {
    function searchEmail(emailArr,keyWord) {
        var resultArr = [];
        for(var i=0;i<emailArr.length;i++){
            if(emailArr[i].indexOf(keyWord)>=0){
                resultArr.push(emailArr[i]);
            }
        }
        return resultArr;
    }
    window.searchEmail = searchEmail;
})()