/**
 * Created by Administrator on 2020/5/19 0019.
 */
(function () {
    var theobj;//传入的obj
    var _factory = {
        //初始化
        init:function(obj){
            theobj = obj;
            _factory._addClick(obj);
        },
        //搜索具体实现
        _search:function(obj){
            obj = theobj;
            var emailList = document.getElementById(obj.emailId).value;
            var searchValue = document.getElementById(obj.searchContentId).value;
            var showResult = document.getElementById(obj.displayResultId);
            var emailArr = emailList.split(",");
            showResult.innerHTML = "";
            for(var i=0;i<emailArr.length;i++){
                if(emailArr[i].indexOf(searchValue)>=0){
                    showResult.innerHTML += `<p>${emailArr[i]}</p>`;
                }
            }
        },
        // 给按钮添加事件
        _addClick:function(obj){
            document.getElementById(obj.searchButtonId).onclick = _factory._search;
        }
    };
    window.searchEmail = {init:_factory.init};
})();
/**
 * factory使用文档
 *emailId:电子邮件地址列表的id
 *searchContentId:搜索框的Id
 *searchButtonId:搜索按钮的id
 *displayResultId:显示搜索结果的区域id
 * */
// console.log(search);