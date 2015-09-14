HTMLElement.prototype.bindWordsCatcher = function (methods) {
  var container = this;

  // 判断处理参数method
  if (methods === undefined) {
    methods = ["point", "select"];
  } else if (typeof(methods) === 'string') {
    methods = [methods];
  } else if (methods.constructor !== Array) {
    throw new Error('The parem is illegal.');
  }; 

  while(methods.length) {
    var method = methods.shift();
    if (method === "point") {
      document.body.addEventListener('load', pointCatcher, false);
    } else if (method === "select") {
      document.body.addEventListener('load', selectCatcher, false);
    } else {
      throw new Error("The catcher is not exist.");
    };
  };
};

function pointCatcher() {
  //利用辅助span节点获取容器内每个字符及其坐标;
  function getWordPosition (container) {
    if (container.innerHTML !== undefined) {
      var content = container.childNodes;
      for (var i = 0; i < content.length; i++) {
        var a = content[i];
        if (a.constructor == Text) {
          // 对文本节点的内容进行处理
          var spans = [];
          for (var j = 0; j < a.length; j++) {
            // 创建用作辅助获取位置的span节点
            var span = document.createElement("span");
            container.insertBefore(span,a);
            span.innerText = a.nodeValue[j];              
            spans.push(span);

            // 获取节点字位置信息并存入字典数组中
            positions.push({word: a.nodeValue[j], position: span.getPosition()});
          };

          // 清空所有插入的辅助节点，还原现场。
          for (var j = 0; j < spans.length; j++) {
            container.removeChild(spans[j]);             
          };
        };
      };
    };
  };

  //获取当前光标位置;
  function getMousePosition (ev) {
    var oEvent = ev || event;
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
    var xyArr = {x: oEvent.pageX, y: oEvent.pageY};
    return xyArr;
  };

  //输出鼠标所在区域字符;
  function judge (ev) {
    var xy = getMousePosition(ev);
    for (var i = 0; i < positions.length; i++) {
      if (xy.x >= positions[i].position.x1 && 
          xy.x <= positions[i].position.x2 && 
          xy.y >= positions[i].position.y1 && 
          xy.y <= positions[i].position.y2) 
      {  
        console.log(positions[i].word);
      };
    };
  };
  // 全部字位置信息
  var positions = [];
  //定时器Handle;
  var timer;
  // 光标移入事件定义
  container.onmousemove = function (e) {
    clearTimeout(timer);
    timer = setTimeout(function(e) {
      return function () {
        judge(e);
      };
    }(e), 1000);
  };
  // 光标移出事件定义
  container.onmouseout = function () {
    clearTimeout(timer);
  };

  // 扩展DOM获取位置方法;
  HTMLElement.prototype.getPosition = function () {
    var oLeft = this.offsetLeft;
    var oTop = this.offsetTop;
    var oWidth = oLeft + this.offsetWidth;
    var oHeight = oTop + this.offsetHeight;    
    var oParent = this.offsetParent;
    while (oParent !== null) {
      oLeft += oParent.offsetLeft;
      oParent = oParent.offsetParent;
    };  
    return{x1: oLeft, x2: oWidth, y1: oTop, y2: oHeight};
  };
}

function selectCatcher() {
  //获取选中文字内容;
  function getSelect() {
    var selectTxt;
    if (window.getSelection) {//标准浏览器支持的方法
      selectTxt = window.getSelection();
    };
    if (document.selection) {//IE浏览器支持的方法
      selectTxt = document.selection.createRange().text;
    };
    return trim(selectTxt.toString());
  };

  //删除左右两端的空格;
  function trim(str) { 
    return str.replace(/(^\s*)|(\s*$)/g, "");
  };
  //鼠标选中事件;
  container.onmouseup = function(e) {
    var content = getSelect(e);
    if (content != "" || null) {
      explain.style.display = "block";
    };  
  };
}