/**
 * Created by adminpc on 2020/5/20.
 */
(function () {
    function _jQuery(selector) {
        this.node = document.querySelectorAll(selector);
        if(this.node.length){
            //通过length来判断是为数组
            for(var i=0;i<this.node.length;i++){
                this[i] = this.node[i];
            }
        }else {
            this[0] = this.node;
        }
    }
    var jQuery =function (selector){
        function setStyle(dom,perperty,value) {
            //判断dom是否为数组
            if(dom.length){
                dom.forEach(function (item) {
                    item.style[perperty] = value;
                })
            }else {
                dom.style[perperty] = value;
            }
        }
        function getStyle(dom,perperty) {
            var obj = dom.currentStyle || document.defaultView.getComputedStyle(dom,null); //考虑兼容性
            return obj[perperty];
        }
        function setHtml(dom,value) {
            dom.innerHTML = value;
        }
        function getHtml(dom) {
            return dom.innerHTML;
        }
        function setText(dom,value) {
            dom.innerText = value;
        }
        function getText(dom) {
            return dom.innerText;
        }
        function setValue(dom,value) {
            dom.value = value;
        }
        function getValue(dom) {
            return dom.value;
        }
        _jQuery.prototype.css = function () {
            if(arguments.length==2){
                //设置 $("selector").css("color","red");
                setStyle(this.node,arguments[0],arguments[1]);
            }else if(arguments.length==1){
                if(typeof arguments[0] == "string"){
                    //获取 $("selector").css("color");
                    if(this.node.length){
                        return getStyle(this.node[0],arguments[0]);
                    }else {
                        return getStyle(this.node,arguments[0])
                    }
                }else if(typeof arguments[0] == "object"){
                    //设置 $("selector").css({color:"red",width:"10px"});
                    for(var key in arguments[0]){
                        setStyle(this.node,key,arguments[0][key]);
                    }
                }
            }
        }
        _jQuery.prototype.html = function () {
            if(arguments.length){
                //设置 html
                if(this.node.length){
                    setHtml(this.node[0],arguments[0]);
                }else {
                    setHtml(this.node,arguments[0]);
                }
            }else {
                //获取 html
                if(this.node.length){
                    return getHtml(this.node[0]);
                }else {
                    return getHtml(this.node);
                }

            }

        }
        _jQuery.prototype.text = function () {
            if(arguments.length){
                //设置 text
                if(this.node.length){
                    setText(this.node[0],arguments[0]);
                }else {
                    setText(this.node,arguments[0]);
                }
            }else {
                //获取 text
                if(this.node.length){
                    return getText(this.node[0]);
                }else {
                    return getText(this.node);
                }
            }
        }
        _jQuery.prototype.val = function () {
            if(arguments.length){
                //设置 value
                if(this.node.length){
                    setValue(this.node[0],arguments[0]);
                }else {
                    setValue(this.node,arguments[0]);
                }
            }else {
                //获取 value
                if(this.node.length){
                    return getValue(this.node[0]);
                }else {
                    return getValue(this.node);
                }
            }
        }
        return new _jQuery(selector);

    }
    jQuery.ajax = function () {

    }
    jQuery.post = function () {

    }
    jQuery.extend = function (obj) {
        for(var key in obj){
            jQuery[key] = obj[key];
        }
    }
    jQuery.fn = _jQuery.prototype;
    jQuery.fn.extend = function (obj) {
        for(var key in obj){
            _jQuery.prototype[key] = obj[key];
        }
    }
    window.$ = window.jQuery = jQuery;
})();