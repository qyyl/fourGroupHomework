/**
 * Created by adminpc on 2020/5/20.
 */
(function () {

    function dataAdapter(backGround,changeKey) {
        var foreGround = [];
        for(var i=0;i<backGround.length;i++){
            var obj = new Object();
            for(var key in changeKey){
                obj[changeKey[key]] = backGround[i][key];
            }
            foreGround.push(obj);
        }
        return foreGround;
    }
    window.dataAdapter = dataAdapter;
})()