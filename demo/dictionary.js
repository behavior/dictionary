
window.onload = function(){
    tabApp();
    notFlow();
};
function tabApp() {
    var source = document.getElementsByClassName("source");
    var info = document.getElementById("pinyin1Info").getElementsByTagName("div");
    var pinyin = document.getElementById("pinyin");
    if(source.length = info.length) {

        //����source������info;
        for (var i = 0; i < source.length; i++) {
            source[i].index = i;
            source[i].onclick = function () {

                //���source��Ч����
                for (var j = 0; j < source.length; j++) {
                    info[j].style.display = "none";
                }
                info[this.index].style.display = "block";
            };
        };
    };
};
function notFlow() {
    var wrap = document.getElementById("wrap");
    wrap.onscroll = function () {
        var pinyin = document.getElementById("pinyin");
        var menu = document.getElementById("menu");
        var header = document.getElementById("header");
        var footer = document.getElementById("footer");
        header.style.top = wrap.scrollTop + "px";
        pinyin.style.top = wrap.scrollTop + header.offsetHeight + "px";
        menu.style.top = wrap.scrollTop + header.offsetHeight + "px";
        footer.style.top = 300 - footer.offsetHeight + wrap.scrollTop + "px";
    };
};
function button() {
    var close = document.getElementById("close");
    close.onclick = function() {
        close.style.display = "none";}
}