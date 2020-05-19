/**
 * Created by admin on 2020/5/18.
 */
(function () {
    var ImageSrcArr=[];
    var changeTimer;
    var lunBo={
        // 获取用户传的图片地址
        huoQuSrc:function () {
            var imgArr=$("#displayImg img");
            for(var i = 0;i<imgArr.length;i++){
                ImageSrcArr.push($(imgArr[i]).attr("src"))
            }
            $("#displayImg").css("width",ImageSrcArr.length*650+"px")
        },
        // 添加左右点击事件和hover事件
        _addEvent:function () {
            //鼠标移入
            $("#lunBo").mouseover(function () {
                $("#left").show();
                $("#right").show();
            });
            //鼠标移出
            $("#lunBo").mouseout(function () {
                $("#left").hide();
                $("#right").hide();
            });
            // 下一页
            $("#right").click(lunBo.next);
            //上一页
            $("#left").click(lunBo.page)
        },
        //获取left
        _getLeft:function () {
            var left = parseInt($("#displayImg").css("marginLeft"));
            if(isNaN(left)){
                left=0;
            }
            return left;
        },
        //下一页
        next:function () {
           var left = lunBo._getLeft();
           left-=650;
           if(left<=-650*ImageSrcArr.length){
                left=0
           }
           $("#displayImg").css("margin-left",left+"px");
        },
        //上一页
        page:function () {
            var left = lunBo._getLeft();
            left+=650;
            if(left>0){
                left=-650*(ImageSrcArr.length-1);
            }
            $("#displayImg").css("margin-left",left+"px");
            console.log(left);
        },
        //是否自动轮播,x:1代表轮播，y:轮播时间,默认不调用该方法,调用需传参
        autoplay:function (x,y) {
            if(x=1){
                changeTimer = setInterval(lunBo.next,y);
            }
        }
    }
    lunBo.huoQuSrc();
    lunBo._addEvent();
    lunBo._getLeft();
    window.lunbo={A:lunBo.autoplay}
})();

