window.onload = function(){

    //�ֵ������Դѡ���
    tabApp("dic_tab","dic_content");

    var close = document.getElementById("close");
    var wrap = document.getElementById("dic_wrap");

    //�ر�ҳ��
    close.onclick = function() {
        wrap.style.display = "none";
    }

    //��ȡ������Դ�Ľ��ͣ�
    var dic_contents = document.getElementsByClassName("dic_content");
    //�������н��ͣ��������е�ƴ�����ж�λ��
    for (var i = 0; i < dic_contents.length; i++) {
        //var conid = dic_contents[i].id);

        //������������ʱ������
        dic_contents[i].onscroll = (function () {

            //��ȡ��һ��ƴ����
            var fpy = document.getElementsByClassName("py")[0];

            //�̶�ƴ��Ԫ������ֵ
            var fixed_py_index = 0;

            //��ȡ����ƴ����
            var pys = document.getElementById('content_basic').getElementsByClassName("py");
            var otlist = [];

            //���ƴ��������������飻
            for (var i = 0; i < pys.length; i++) otlist.push(pys[i].offsetTop - pys[i].offsetHeight);

            return function (e) {

                //���嵱ǰ������ҳ�棻
                var dic_content = e.srcElement;

                // �жϵ�ǰST��������
                for (var i = 0; i < pys.length && dic_content.scrollTop >= otlist[i]; ++i);
                i--;

                if (i === 0) { // ��һ��ƴ������
                    if (dic_content.scrollTop === 0) {
                        fpy.style.position = "relative";
                    } else {
                        fpy.style.position = "absolute";
                    }
                }
                if (i !== fixed_py_index) { // ����ƴ���ı�
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

        //����tab������list;
        for (var i = 0; i < tab.length; i++) {
            tab[i].index = i;
            tab[i].onclick = function () {

                //���tab��Ч����
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

