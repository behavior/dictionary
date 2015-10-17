window.onload = function(){

    //字典解释来源选项卡；
    tabApp("dic_tab","dic_content");

    var close = document.getElementById("close");
    var wrap = document.getElementById("dic_wrap");

    //关闭页面
    close.onclick = function() {
        wrap.style.display = "none";
    }

    //获取所有来源的解释；
    var dic_contents = document.getElementsByClassName("dic_content");
    //遍历所有解释，并对其中的拼音进行定位；
    for (var i = 0; i < dic_contents.length; i++) {
        //var conid = dic_contents[i].id);

        //当滚动条滚动时触发；
        dic_contents[i].onscroll = (function () {

            //获取第一个拼音；
            var fpy = document.getElementsByClassName("py")[0];

            //固定拼音元素索引值
            var fixed_py_index = 0;

            //获取所有拼音；
            var pys = document.getElementById('content_basic').getElementsByClassName("py");
            var otlist = [];

            //存放拼音顶部距离的数组；
            for (var i = 0; i < pys.length; i++) otlist.push(pys[i].offsetTop - pys[i].offsetHeight);

            return function (e) {

                //定义当前滚动的页面；
                var dic_content = e.srcElement;

                // 判断当前ST所在区间
                for (var i = 0; i < pys.length && dic_content.scrollTop >= otlist[i]; ++i);
                i--;

                if (i === 0) { // 第一个拼音区间
                    if (dic_content.scrollTop === 0) {
                        fpy.style.position = "relative";
                    } else {
                        fpy.style.position = "absolute";
                    }
                }
                if (i !== fixed_py_index) { // 顶部拼音改变
                    pys[i].style.position = 'absolute';
                    pys[i].style.top = 0;
                    pys[i].style.zindex = 10;
                    pys[fixed_py_index].style.position = 'relative';
                    pys[fixed_py_index].style.zindex = 0;
                    fixed_py_index = i;
                }
            };
        })();
    };
};

function tabApp(tab,list) {
    var tab = document.getElementsByClassName(tab);
    var list = document.getElementsByClassName(list);;
    var content = document.getElementsByClassName("dic_content");
    if(tab.length = list.length) {

        //遍历tab下所有list;
        for (var i = 0; i < tab.length; i++) {
            tab[i].index = i;
            tab[i].onclick = function () {

                //清除tab的效果；
                for (var j = 0; j < tab.length; j++) {
                    list[j].style.display = "none";
                }
                list[this.index].style.display = "block";
                for(var i = 0; i < content.length; i++) {
                    content[i].scrollTop = 0;
                }
            };
        };
    };
};

