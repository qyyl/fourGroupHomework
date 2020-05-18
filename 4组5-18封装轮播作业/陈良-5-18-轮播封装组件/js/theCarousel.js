/**
 * Created by Administrator on 2020/5/18 0018.
 */
(function () {
    var autoDisplayTimer;
        var _carousel = {
//            初始化

            init:function (obj) {
                var timer = obj.timer || 5000;
                if(obj.isAutoDisplay === undefined){
                    obj.isAutoDisplay = true;
                }
                if(obj.isAutoDisplay){
                    _carousel._autoDisplay(timer);
                }
                if(obj.isDisplayDian){
                    _carousel._displayDian(obj.where,timer);
                }
                _carousel._addElement(obj.where,obj.imgSrcArr);
                _carousel._addNextEvent(timer);
                _carousel._addPreEvent(timer);
            },
//            添加dome元素
            _addElement:function (where,imgSrcArr) {
                var CarWhere = document.getElementById(where);
                CarWhere.innerHTML+=`<span class="btn" id="nextBtn">&gt;</span>
                    <span class="btn" id="preBtn">&lt;</span>
                    <div id="imgBox">
                    <img src="${imgSrcArr[0]}">
                    <img src="${imgSrcArr[1]}">
                    <img src="${imgSrcArr[2]}">
                    <img src="${imgSrcArr[3]}">
                    <img src="${imgSrcArr[4]}">
                </div>`;
            },
//            给按钮添加点击事件
            _addNextEvent:function (timer) {
                clearInterval(autoDisplayTimer);
                document.getElementById("nextBtn").onclick = _carousel.nextImg;
                autoDisplayTimer = setInterval(_carousel.nextImg,timer);
            },
            _addPreEvent:function (timer) {
                clearInterval(autoDisplayTimer);
                document.getElementById("preBtn").onclick = _carousel.preImg;
                autoDisplayTimer = setInterval(_carousel.nextImg,timer);
            },
            _autoDisplay:function (timer) {
                autoDisplayTimer = setInterval(_carousel.nextImg,timer);
            },
            _displayDian:function (where,timer) {
                var CarWhere = document.getElementById(where);
                CarWhere.innerHTML+=`<ul id="dians">
                        <li id="dian_1"></li>
                        <li id="dian_2"></li>
                        <li id="dian_3"></li>
                        <li id="dian_4"></li>
                        <li id="dian_5"></li>
                    </ul>`;
                document.getElementById("dian_1").onclick = function () {
                    clearBackColor();
                    addBackColor(dian_1);
                    document.getElementById("imgBox").style.marginLeft = 0;
                };
                document.getElementById("dian_2").onclick = function () {
                    clearBackColor();
                    addBackColor(dian_2);
                    document.getElementById("imgBox").style.marginLeft = 500 + "px";
                    clearInterval(autoDisplayTimer);
                    autoDisplayTimer = setInterval(_carousel.nextImg,timer);
                };
                document.getElementById("dian_3").onclick = function () {
                    clearBackColor();
                    addBackColor(dian_3);
                    document.getElementById("imgBox").style.marginLeft = 1000 + "px";
                    clearInterval(autoDisplayTimer);
                    autoDisplayTimer = setInterval(_carousel.nextImg,timer);
                };
                document.getElementById("dian_4").onclick = function () {
                    clearBackColor();
                    addBackColor(dian_4);
                    document.getElementById("imgBox").style.marginLeft = 1500 + "px";
                    clearInterval(autoDisplayTimer);
                    autoDisplayTimer = setInterval(_carousel.nextImg,timer);
                };
                document.getElementById("dian_5").onclick = function () {
                    clearBackColor();
                    addBackColor(dian_5);
                    document.getElementById("imgBox").style.marginLeft = 2000 + "px";
                    clearInterval(autoDisplayTimer);
                    autoDisplayTimer = setInterval(_carousel.nextImg,timer);
                };
                function addBackColor(thisDian) {
                    document.getElementById(thisDian).className = "backgroudwhite";
                }
                function clearBackColor() {
                    document.getElementById("dian_1").className = "";
                    document.getElementById("dian_2").className = "";
                    document.getElementById("dian_3").className = "";
                    document.getElementById("dian_4").className = "";
                    document.getElementById("dian_5").className = "";
                }
            },
//            上一页
            nextImg:function () {
                var imgBox = document.getElementById("imgBox");
                if(imgBox.style.marginLeft){
                    if(parseInt(imgBox.style.marginLeft) == -2000){
                        imgBox.style.marginLeft = 0;
                    }else {
                        imgBox.style.marginLeft = parseInt(imgBox.style.marginLeft)-500+"px";
                    }
                }else {
                    imgBox.style.marginLeft = -500+"px";
                }
            },
//            下一页
            preImg:function () {
                var imgBox = document.getElementById("imgBox");
                if(imgBox.style.marginLeft){
                    if(parseInt(imgBox.style.marginLeft) == 0){
                        imgBox.style.marginLeft = -2000+"px";
                    }else {
                        imgBox.style.marginLeft = parseInt(imgBox.style.marginLeft)+500+"px";
                    }
                }else {
                    imgBox.style.marginLeft = -2000+"px";
                }
            }
        };
        window.CarouSel = {init:_carousel.init};
})();
/**
 * theCarousel轮播组件使用文档
 * where：轮播显示在哪里，值为你需要轮播显示盒子的id，用户必须传入
 * imgSrcArr：值为一个数组，数组里的值是你的轮播图片的引用路径,用户必须传入
 * isAutoDisplay：是否自动播放，值为true或者false，默认为true
 * timer：自动播放的时间间隔，默认为5s
 * isDisplayDian：是否显示圆点导航条，值为true或者false，默认false
 * */