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
			//获取每个字符及其坐标;
	    		function getWordPosition (container) {
			      if (container.innerHTML !== undefined) {
			      		var results = [];
	        			// var position = [];//存放位置的数组;
			        	var wandp ={};//存放字符的数组;
			        	var content = container.childNodes;
			       	// 遍历子节点
			       	for (var i = 0; i < content.length; i++) {
			       		var a = content[i];
			            		// 遍历文本节点内字符
			          		if (a.constructor == Text) {
			            			var span = [];
			            			for (var y = 0; y < a.length; y++) {
				              		var newa = document.createElement("span");
						              container.insertBefore(newa,a);
						              newa.innerText = a.nodeValue[y];              
						              span.push(newa);
						              var position = getElementPosition(newa);
						              var node = a.nodeValue[y];
						              wandp.p = position;
						              wandp.w = node;
						           	results.push(wandp);
			            			};
			            			for (var j = 0; j < span.length; j++) {
						              container.removeChild(span[j]);             
					            	};
			          		};
		       		};
			       };
		      		return results;
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
		      		return{x1: oLeft, x2: oWidth, y1: oTop, y2: oHeight};
		    	};

		    	//获取鼠标位置;
	    		function mousePosition (ev) {
				var oEvent = ev || event;
			       var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			       var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
			       var xyArr = {x: oEvent.pageX, y: oEvent.pageY};
			       return xyArr;
	    		};

		    	//输出鼠标所在区域字符;
		    	function judge (ev) {
		        	var xy = mousePosition(ev);
			       var results = getWordPosition(container);
			       for (var i = 0; i < results.length; i++) {
			       	var p = results[i].p;
			       	// console.log(results);
			        	if (xy.x >= p.x1 && xy.x <= p.x2 && xy.y >= p.y1 && xy.y <= p.y2) { 
					       alert(results[i].w);
		        		};
		      		};      
		    	};

		    	//定时器;
		    	var timer,
	       	positions = getWordPosition(container);
		       container.onmousemove = function (e) {
		       	clearTimeout(timer);
		      		timer = setTimeout(function(e) {
		        		return function () {
		          			judge(e);
		        		};
		      		}(e), 1000);
		    	};
	        	container.onmouseout = function () {
		       	clearTimeout(timer);
		    	};
		} else if (method === "select") {
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
		} else {
			throw new Error("error");
		};
	};
};