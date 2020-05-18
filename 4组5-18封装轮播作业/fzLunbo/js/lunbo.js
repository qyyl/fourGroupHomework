/**
 * Created by 16694 on 2020/5/17.
 */
(function () {
    var imgArr;
    var lunbo={
        init:function (obj) {
            imgArr = obj.imgArr;
        },
        toRight:function () {
            var showImgSrc = $(".lunboBox>img").attr("src");
            for (var i = 0; i < imgArr.length; i++) {
                if (showImgSrc == imgArr[i]) {
                    $(".lunboBox>img").attr("src", imgArr[i + 1]);
                }
                if (showImgSrc == imgArr[imgArr.length - 1]) {
                    $(".lunboBox>img").attr("src", imgArr[0]);
                }
        }
        },
        toLeft:function () {
            var showImgSrc = $(".lunboBox>img").attr("src");
            var len = imgArr.length;
                for (var i = len - 1; i > 0; i--) {
                    if (showImgSrc == imgArr[i]) {
                        $(".lunboBox>img").attr("src", imgArr[i - 1]);
                    }
                    if (showImgSrc == imgArr[0]) {
                        $(".lunboBox>img").attr("src", imgArr[imgArr.length - 1]);
                    }
                }
        }
    };
    window.fz={lunbo:lunbo.init,toRight:lunbo.toRight,toLeft:lunbo.toLeft};
})();
fz.lunbo({
    imgArr:["images/t1.jpg","images/t2.jpg","images/t3.jpg","images/t4.jpg","images/t5.jpg","images/t6.jpg"],
});