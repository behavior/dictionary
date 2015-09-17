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
			pointCatcher(container);
		} else if (method === "select") {
			selectCatcher(container);
		}
		 else {
			throw new Error("The catcher is not exist.");
		};
	};
};

//创建dictionaryDiv;
function dictionaryDiv() {
	function createElements (newDiv, target, key, value) {
		var newDiv = document.createElement(newDiv);
		var target = document.getElementById(target);
		target.appendChild(newDiv);
		newDiv.setAttribute(key, value);
	};
	createElements ("div", "webcontainer", "id", "explain");
	createElements ("p", "explain", "id", "word");
	// alert(explain+word);
	//输出鼠标所在区域字符;
	function judge (ev) {
		var xy = getMousePosition(ev);
		for (var i = 0; i < positions.length; i++) {
			if (xy.x >= positions[i].position.x1 && 
			xy.x <= positions[i].position.x2 && 
			xy.y >= positions[i].position.y1 && 
			xy.y <= positions[i].position.y2) 
			{ 
				explain.style.display = "block";
				explain.style.left = positions[i].position.x2 +"px";
				explain.style.top = positions[i].position.y2 +"px";
				word.innerText= positions[i].word;
			};
		};
	};
};

function pointCatcher(container) {
	// 全部字位置信息
	var positions = [];
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
		var position = {x: oEvent.pageX, y: oEvent.pageY};
		return position;
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

		//定时器Handle;
		var timer1;
		var timer2;
		getWordPosition(container);

	// 光标移入字符事件定义
	container.onmousemove = function (e) {
		clearTimeout(timer1);
		timer1 = setTimeout(function(e) {
			return function () {
				dictionaryDiv();
				judge(e);			
			};
		}(e), 1000);
	};
	var explain = document
	// // 光标移入字典框事件定义
	// explain.onmousemove = function () {
	// 	clearTimeout(timer2);
	// 	explain.style.display = "block";
	// };

	// // 光标移出字典框事件定义
	// explain.onmouseout = function () {
	// 	timer2 = setTimeout(function() {
	// 		explain.style.display = "none"
	// 	},500);
	// };

	// var closebtn = document.getElementById("close");
	// closebtn.onclick =  function () {
	// 	explain.style.display = "none";
	// };
};

function selectCatcher(container) {
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
		dictionaryDiv();
		e = e || window.event;
		var content = getSelect(e);
		if (content != "" || null) {
			explain.style.display = "block";
			explain.style.top = content.top + content.height + "px";
			word.innerText = content;
		};  
	};
};