	// 在div中每个字符添加span标签的函数;
	document.body.onload = function() {
		results = getSpanPosition(container);
	};
	function getSpanPosition(container) {
		var resultp = [];
		var resultw = [];
		for (var z = 0; z < container.length; z++) {
			if (container[z].innerHTML !== undefined) {
				var position = [];//存放位置的数组;
				var word = [];//存放字符的数组;
				var content = container[z].childNodes;
				// 遍历子节点
				for (var i = 0; i < content.length; i++) {
					var a = content[i];
						// 遍历文本节点内字符
					if (a.constructor == Text) {
						var span = [];
						for (var y = 0; y < a.length; y++) {
							var newa = document.createElement("span");
							container[z].insertBefore(newa,a);
							newa.innerText = a.nodeValue[y];							
							span.push(newa);
							var weizhi = getElementPosition(newa);
							var node = a.nodeValue[y]
							position.push(weizhi);
							word.push(node)
							//console.log(weizhi,node);
						};
						for(var j = 0; j < span.length; j++) {
							container[z].removeChild(span[j]);							
						};
					};
				};
			};
			resultp.push(position);
			resultw.push(word);
		};
		return {p:resultp,w:resultw};
	};
	// 获取dom元素位置的函数;
	function getElementPosition(element) {
		var oLeft = element.offsetLeft;
		var oTop = element.offsetTop;
		var oWidth = oLeft + element.offsetWidth;
		var oHeight = oTop + element.offsetHeight;		
		var oParent = element.offsetParent;
		while (oParent !== null) {
			oLeft += oParent.offsetLeft;
			oParent = oParent.offsetParent;
		};	
		return{x1:oLeft, x2:oWidth, y1:oTop,y2:oHeight};
	};
		var timer;
	for (var i = 0; i < container.length; i++) {
		container[i].onmousemove = function(e) {
			clearTimeout(timer);
			timer = setTimeout(function(e) {
				return function() {
					judge(e);
				}
			}(e), 1000);
		};
	};
	for (var i = 0; i < container.length; i++) {
		container[i].onmouseout = function() {
			clearTimeout(timer);
			//explain.style.display = "none"
		};
	};
	//获取鼠标位置;
	function mousePosition(ev) {
		var oEvent = ev || event;
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
		var xyArr = {x:oEvent.pageX, y:oEvent.pageY};
		return xyArr;
	};
	//输出鼠标所在区域字符;
	function judge(ev) {
		var xy = mousePosition(ev);
		var p = results.p;
		for (var i = 0;  i < p.length; i ++) {			
			for (var y = 0; y < p[i].length; y++) {
				if (xy.x >= p[i][y].x1 && xy.x <= p[i][y].x2 && xy.y >= p[i][y].y1 && xy.y <= p[i][y].y2) { 
					explain.style.display = "block";
					explain.style.left = p[i][y].x2+ "px"+10+"px";
					explain.style.top= p[i][y].y2+"px" +10 + "px";
				};
			};
		};			
	};
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
	for (var i = 0; i < container.length; i++) {
		container[i].onmouseup = function(e) {
			var content = getSelect(e);
			if (content != "" || null) {
				explain.style.display = "block";
			};	
		} ;
	};