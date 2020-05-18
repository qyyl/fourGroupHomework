/**
 * Created by greatwo on 2020/5/18.
 */
(function () {
    var imgBox;
    var imgArr = [];
    var imgArr2 = [];
    var current;
    var bg;
    var lunbo = {
        init:function (obj) {
            imgBox = obj.Element;//轮播盒子jq对象
            bg = imgBox.get(0);//轮播盒子dom对象
            imgArr2 = obj.imgData;
            current = obj.current-1;
            lunbo.addDom();
            lunbo.imgArrChange();
            if(obj.displayYuan){
                lunbo.displayYuan();
            }
            lunbo.displayBg();
            lunbo.addNext();
            lunbo.addPrev();
            if(obj.Auto){
                lunbo.auto(obj.time);
            }
        },
        imgArrChange:function () {
            for(var i=0;i<imgArr2.length;i++){
                imgArr.push('url("'+imgArr2[i]+'")');
            }
        },
        addDom:function () {
            imgBox.append(`
            <div id="next"><img src="img/toNext.png" alt=""></div>
            <div id="prev"><img src="img/toPre.png" alt=""></div>
            <div id="yuanDian"><ul></ul></div>
            `);
        },
        addNext:function () {
            imgBox.on("click","#next",function () {
                lunbo.next();
            });
        },
        addPrev:function () {
            imgBox.on("click","#prev",function () {
                lunbo.prev();
            });
        },
        displayBg:function () {
            imgBox.css("backgroundImage",imgArr[current]);
            $("#yuanDian>ul>li").eq(current).addClass("choose");
        },
        next:function () {
            var img = bg.style.backgroundImage;
            // console.log(img);
            for(var i=0;i<imgArr.length;i++){
                if(i == (imgArr.length-1)){
                    bg.style.backgroundImage = imgArr[0];
                    $("#yuanDian>ul>li").removeClass("choose");
                    $("#yuanDian>ul>li").eq(0).addClass("choose");
                    break;
                }
                if(img == imgArr[i]){
                    bg.style.backgroundImage = imgArr[i+1];
                    $("#yuanDian>ul>li").removeClass("choose");
                    $("#yuanDian>ul>li").eq(i+1).addClass("choose");
                    break;
                }
            }
        },
        prev:function () {
            var img = bg.style.backgroundImage;
            console.log(img);
            for(var i=imgArr.length-1;i>-1;i--){
                if(i == 0){
                    bg.style.backgroundImage = imgArr[imgArr.length-1];
                    $("#yuanDian>ul>li").removeClass("choose");
                    $("#yuanDian>ul>li").eq(imgArr.length-1).addClass("choose");
                    break;
                }
                if(img == imgArr[i]){
                    bg.style.backgroundImage = imgArr[i-1];
                    $("#yuanDian>ul>li").removeClass("choose");
                    $("#yuanDian>ul>li").eq(i-1).addClass("choose");
                    break;
                }
            }
        },
        auto:function (time) {
            var timer = setInterval(lunbo.next,time);
            imgBox.mouseenter(function () {
                clearInterval(timer);
            });
            imgBox.mouseleave(function () {
                timer = setInterval(lunbo.next,time);
            });
        },
        displayYuan:function () {
            for(let i=0;i<imgArr.length;i++){
                $("#yuanDian>ul").append("<li data-id="+i+"></li>");
            }
            imgBox.on("mouseenter","#yuanDian>ul>li",function () {
                var id = $(this).attr("data-id");
                bg.style.backgroundImage = imgArr[id];
                $("#yuanDian>ul>li").removeClass("choose");
                $("#yuanDian>ul>li").eq(id).addClass("choose");
            });
        }
    };

    window.lunbo = {init:lunbo.init};
})();