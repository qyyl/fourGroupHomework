/**
 * Created by adminpc on 2020/5/18.
 */
(function () {
    var imgArr;
    var nowIndex=0;
    var spotArr=[];
    var autoChangeTimer;
    var carousel = {
        init:function (obj) {
            imgArr = obj.imgArr;
            if(obj.displaySpot){
                carousel.addSpot();
                spotArr = $("#spot span");
                $("#spot span").click(function () {
                    nowIndex = $(this).index();
                    $("#contentImg").attr("src",imgArr[nowIndex]);
                    spotArr.removeClass("active");
                    spotArr.eq(nowIndex).attr("class","active");
                });
            }
            if(obj.autoChange){
                carousel.startTimer();
                $("#carousel").mouseover(function () {
                    carousel.endTimer();
                });
                $("#carousel").mouseout(function () {
                    carousel.startTimer();
                });
            }
            if(imgArr.length>0){
                carousel.addDomElement();
            }
            $("#carousel").on("click","#toPre",function () {
                carousel.pre();
            });
            $("#carousel").on("click","#toNext",function () {
                carousel.next();
            });
        },
        //开始自动轮播
        startTimer:function () {
            autoChangeTimer = setInterval(carousel.next,2000);
        },
        //结束轮播
        endTimer:function () {
            clearInterval(autoChangeTimer);
        },
        addSpot:function () {
            var htmlStr = `<p id="spot"><span class="active"></span></p>`;
            $("#carousel").append(htmlStr);
            for(var i=1;i<imgArr.length;i++){
                $("#spot").append(`<span></span>`);
            }
        },
        addDomElement:function () {
            var htmlStr = `<img src="img/toPre.png" id="toPre">
                            <img src="img/toNext.png" id="toNext">`;
            $("#carousel").append(htmlStr);
        },
        pre:function () {
            if(--nowIndex<0){
                nowIndex=imgArr.length-1;
            }
            $("#contentImg").attr("src",imgArr[nowIndex]);
            if(spotArr.length!=0){
                spotArr.removeClass("active");
                spotArr.eq(nowIndex).attr("class","active");
            }
        },
        next:function () {
            if(++nowIndex>=imgArr.length){
                nowIndex=0;
            }
            $("#contentImg").attr("src",imgArr[nowIndex]);
            if(spotArr.length!=0){
                spotArr.removeClass("active");
                spotArr.eq(nowIndex).attr("class","active");
            }
        }
    }

    window.myCarousel = {init:carousel.init};
})();