function $( selector,content ){
	var firstChar = selector.charAt(0);
	content = content || document;
	if( firstChar === "#" ){
		return document.getElementById( selector.slice(1) );
	}else if( firstChar === '.' ) {
		var arr = content.getElementsByTagName('*');//获取所有的元素
		var str = [];	//定义数组，存放 class
			//console.log( arr );
		for( var i = 0; i < arr.length; i++){	//通过循环去每一项
			//alert( arr.length )
			var classNames = arr[i].className;	//存一下每个 className
			var classArr = classNames.split(" "); //以一个空格符来分割成数组  (数组)
				//console.log(classArr)
			for ( var j = 0; j < classArr.length; j++ ) {
				if ( classArr[j] === selector.slice(1) ) {//判断一下每一项是否和传入的 class一样
					str.push( arr[i] );//如果一样添加到数组里面
					break;
				};
			};
		};
		return str;	//for 循环结束后返回出去 str。  否则获取不到,是一个(undefined)
	}else{
		return content.getElementsByTagName(selector);
	};
};

// 获取Css 属性
function getStyle(obj,attr){   //获取样式
	if( obj.currentStyle ){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj)[attr];
	}
};

// 运动函数
function doMover(obj,attr,speed,target,callBack){    
//封装函数 设置参数	(控制对象、控制属性、速度、最终值、达到最终值运行的函数)
	if( obj.moveTimer ) return;	 //运行函数式，如果 该定时器存在  则停止函数运行，否则 运行该函数
	var num = parseFloat( getStyle( obj,attr ) );	// 当前该属性的值
	speed = num > target ? -Math.abs(speed) : Math.abs(speed); 
	//判断 目前属性 与 目标属性的大小 如果 大 则 为减小，相反增加
	obj.moveTimer = setInterval(function(){				// 开启定时器
		num += speed;								//每次增加值
		if(Math.abs(target-num) <= Math.abs(speed)){//判断 运行中的 num 值是否即将到达 目标属性 
			 //也可判断  speed > 0 && num >= target || speed < 0 && num <= target 
			num = target;	//即将到达目标属性则 使 num 值为目标值 （为了防止 与目标属性 微小相差）
			clearInterval(obj.moveTimer);				//到达目标属性 关闭定时器
			obj.moveTimer = null;					//清除该定时器
			obj.style[attr] = num + 'px';			
			(typeof callBack === "function") && callBack();  //判断 实参中有没有输入 运行的函数 没有则为
		}else{
			obj.style[attr] = num + 'px';
		}
	},30)
};

//抖函数
function shake(obj,attr,speed,callBack){           //抖动
	if(obj.timer) return;   // 如果定时器还在运行则不执行函数
	var n = 0;				// 变量 n 用来控制数组的第 n 项
	var arr = [];			// 生成空的数组用来储存 设置的抖动范围
	for( var i = speed; i>0 ; i -= 3){
		arr.push(-i,i)         
	}
	arr.push(0);            //循环生成数组内容 并在数组的最后一个值加入 0 时期在最后回到初始位置
	var num = parseFloat(getStyle(obj,attr));  //获取 obj[attr] 的值
	obj.timer = setInterval(function(){        //生成定时器
		obj.style[attr] = num + arr[n] + 'px'; //把数组的 第n个值 赋给 obj[attr]
		n++;									// 增加n 值 为下次获取 数组的下一个值
		if( n > arr.length-1 ){           
			clearInterval( obj.timer );         //如果循环到数组的最后一个值 则停止定时器 并清空 obj.timer 的值
			obj.timer = null;
			if( typeof callBack === 'function' ){
				callBack();
			};
		}
	},30)
};

// 时间对象
function futurefun(timeStr){
	var now = new Date();
	var future = new Date(timeStr);
	var time = (future.getTime() - now.getTime())/1000;
	var Day = Math.floor(time/86400);
	var Hour = Math.floor(time%86400/3600);
	var Minute = Math.floor(time%86400%3600/60);
	var Second = Math.floor(time%60);
	var onOff = true;
	if( time <= 0 ) onOff = false;
	var json = {
		D:Day,
		H:Hour,
		Min:Minute,
		S:Second,
		onOff:onOff,
	};
	return json;
};

	// 添加 0
function addZero( Zero ){
	if( Zero < 10 ){
		return "0"+Zero;
	}else{
		return ''+Zero;
	}
};

// 从数组中找 对应的索引
function indexOf( arr,searchValue,searchIndex ){
/* arr 数组名称,searchValue  要找的值或字符串, searchIndex  从索引值为 searchIndex 在arr中开始往后找 */
	if ( arguments.length === 0 || arguments.length === 1) {//判断一下如果没有参数，返回出去 -1，如果传入了一个参数，也返回出去 -1, ( 防止数组中出现 undefined )
		return -1;
	};
	searchIndex = searchIndex || 0;	//判断一下 是否传入参数，如果有 就是自己，如果没有，默认为 0
	for( var i = searchIndex;i < arr.length ;i++ ){
		if ( arr[i]  === searchValue ) {	//通过循环看一下数组中的某一项是否等于 你要找的值或者字符串
			return i;	//如果相等返回 i (索引值)
		};
	};
	return -1;	//通过循环完成对比后，如果没有找到，那么返回的就是-1；
};

// 可视区的宽高  view().W  /  view().H
function view(){
	return {
		W:document.documentElement.clientWidth, // 可视区的宽度(文档宽度)
		H:document.documentElement.clientHeight	// 可视区的高度(文档高度)
	};
};

// 鼠标滚动的高度 scrollT()
function scrollT(){
	return document.body.scrollTop || document.documentElement.scrollTop;
};

// 鼠标滚动的宽度 scrollL()
function scrollL(){
	return document.body.scrollLeft || document.documentElement.scrollLeft;
};
// 获取的是element下的第一个子节点  (标准浏览器获会取到元素节点)
function first(element){
	var firstElement = element.firstElementChild || element.firstChild;
	if( !firstElement || firstElement.nodeType !== 1 ){
		return null
	}else{
		return firstElement;
	};
};

// 获取的是element下的最后一个子节点
function last(element){
	var lastElement = element.lastElementChild || element.lastChild;
	if( !lastElement || lastElement.nodeType !== 1 ){
		return null
	}else{
		return lastElement;
	};
};

// 下一个兄弟节点
function next(element){
	var nextElement = element.nextElementSibling || element.nextSibling;
	if( !nextElement || nextElement.nodeType !== 1 ){
		return null
	}else{
		return nextElement;
	};
};

// 上一个兄弟节点
function prev(element){
	var prevElement = element.previousElementSibling || element.previousSibling;
	if( !prevElement || prevElement.nodeType !== 1 ){
		return null
	}else{
		return prevElement;
	};
};

// 添加 class
function addClass( obj,classNames ){
	if( !obj.className ){  //如果没有class，直接添加
		obj.className = classNames;
		return;
	};
	// "a b c"
	var classArr = obj.className.split(" ");
	//先判断要添加的class，是否已经存在
	for( var i = 0; i < classArr.length; i++ ){
		if( classNames === classArr[i] ) return;
	};
	obj.className += " "+classNames;	
};

//obj的定位父级的偏移量
function getOffset( obj ){
	var left = 0, top = 0;
	//先找到obj到 obj的定位父级的偏移量
	// 然后依次向上找 obj的定位父级的定位父级的偏移量
	//border在ie下的默认值为medium，其余浏览器中 0
	//刚上来的时候，先保存一下，要获取offsetLeft的这个元素的边框
	var borderLeft = parseInt( getStyle(obj,"borderLeftWidth") );
	var borderTop = parseInt( getStyle(obj,"borderTopWidth") );
		borderLeft = isNaN( borderLeft )? 0 : borderLeft;
		borderTop = isNaN( borderTop )? 0 : borderTop;
	while( obj ){
		/*var borderL = parseInt( getStyle(obj,"borderLeftWidth") ) || 0;
		var borderT = parseInt( getStyle(obj,"borderTopWidth") ) || 0;*/
		var borderL = parseInt( getStyle(obj,"borderLeftWidth") );
		var borderT = parseInt( getStyle(obj,"borderTopWidth") );

		borderL = isNaN( borderL )? 0 : borderL;
		borderT = isNaN( borderT )? 0 : borderT;

		left += obj.offsetLeft+borderL;
		top += obj.offsetTop+borderT;
		obj = obj.offsetParent;
	};
	return {
		left:left-borderLeft,	// 减去自身的border-left (自身的border不包含在运算中)
		top:top-borderTop		// 减去自身的border-top (自身的border不包含在运算中)
	};
};

// 碰撞检测
function collisionTest( obj1,obj2 ){//obj1 拖拽移动的元素,obj2 被碰撞的元素

	//碰撞的元素
	var obj1L = obj1.offsetLeft;
	var obj1T = obj1.offsetTop;
	var obj1W = obj1.offsetWidth;
	var obj1H = obj1.offsetHeight;

	//被碰撞的元素
	var obj2L = obj2.offsetLeft;
	var obj2T = obj2.offsetTop;
	var obj2W = obj2.offsetWidth;
	var obj2H = obj2.offsetHeight;
	if( obj1L+obj1W < obj2L || obj1T + obj1H < obj2T || obj1L > obj2L + obj2W || obj1T > obj2T + obj2H  ){ //没碰上 返回false
		return false;
	}else{
		return true;
	}
};

// ajax
function ajax(options){

    var defaults = {
      method:options.method || "get",
      url:options.url,
      data:options.data || "",
      success:options.success || null,
      fail:options.fail || null,
      dataType: options.dataType || ""
    }

    if( defaults.url === "" ){
      alert( "url不能为空" );
      return;
    };
    var xhr = null;
    if( window.XMLHttpRequest ){
      xhr = new XMLHttpRequest();
    }else{
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    };
    if( defaults.method.toLowerCase() === "get"){
      defaults.url = defaults.url + "?"+defaults.data;
    };
    xhr.open(defaults.method,defaults.url,true);
    //onload事件存在的话，就执行onload
    if( typeof xhr.onload !== "undefined" ){
       xhr.onload = function(){// ajax完成后触发的事件
          fn();
       };
    }else{
      xhr.onreadystatechange = function(){
        if( xhr.readyState === 4 ){
          fn();
        };
      };
    };
    function fn() {
      if( xhr.status === 200 ){
          var data = xhr.responseText;
          if( defaults.dataType.toLowerCase() === "json" ){
              data = JSON.parse( data );
          };
          if( defaults.dataType.toLowerCase() === "xml" ){
             data = xhr.responseXML;
          };
          if( typeof defaults.success === "function" ){
            defaults.success(xhr.status,data);
          };
      }else{
          if( typeof defaults.fail === "function" ){
            defaults.fail(xhr.status);
          };
      };
    };
    if( defaults.method.toLowerCase() === "get" ){
      xhr.send();
    }else{
      xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
      xhr.send(defaults.data);
    };
};

// 时间版运动
//<script src="JS/tween.js"></script>
//doMove(oDiv,{left:0,top:200,width:300},1000,"elasticOut");
function doMove(obj,json,d,fx,callBack){
	if( obj.timer ) return;

	if( typeof fx === "function" ){
		callBack = fx;
		fx = "linear";
	};
	fx = fx || "linear";
	//要知道 json中要改变属性的起始位 
	var jsonArr = {};  //找到要改变的属性的起始位置和总距离
	/*
		jsonArr格式
			{
				left:{
					s:起始位置
					c:总距离（结束为止-起始位置）
				},
				top:{
					s:起始位置
					c:总距离（结束为止-起始位置）
				},
				width:{
					s:起始位置
					c:总距离（结束为止-起始位置）
				}
			};
	 */
	 for( var attr in json ){
	 	jsonArr[attr] = {};
	 	jsonArr[attr].s = parseFloat( getStyle(obj,attr) );
	 	jsonArr[attr].c = json[attr] - jsonArr[attr].s;
	 };
	 var time = new Date().getTime();
	 //开定时器
	obj.timer =  setInterval(function(){
	 	var t = new Date().getTime() - time; //已过去时间
	 	for( var attr2 in json ){
	 		var value = Tween[fx](t, jsonArr[attr2].s, jsonArr[attr2].c, d);
	 		if( attr2 === "opacity" ){
	 			obj.style.opacity = value;
	 			obj.style.filter = "alpha(opacity="+value*100+")";
	 		}else{
	 			obj.style[attr2] = value + "px";
	 		};
	 	};
	 	if( t >= d ){
	 		t = d;
	 		clearInterval(obj.timer);
	 		obj.timer = null;
	 		(typeof callBack === "function") && callBack();
	 	};
	 },16);
};

//鼠标滚轮事件
function mousewheel(obj,upFn,downFn){
	obj.onmousewheel = mousewheelFn

	if( obj.addEventListener ){
		obj.addEventListener("DOMMouseScroll",mousewheelFn,false);
	}
	function mousewheelFn(ev){
		ev = ev || event;
		var direction = true;
		if( ev.wheelDelta ){
			direction = ev.wheelDelta > 0 ? true : false;
		}
		if( ev.detail ){
			direction = ev.detail < 0 ? true : false;
		}
		if( direction ){
			typeof upFn === "function" && upFn(ev);
		}else{
			typeof downFn === "function" && downFn(ev)
		};
		if( ev.preventDefault ){
			ev.preventDefault();
		};
		ev.returnValue = false;

		//return false;
	};	
};

/*
* t : time 已过时间
* b : begin 起始值
* c : count 总的运动值
* d : duration 持续时间
*
* 曲线方程
*
* http://www.cnblogs.com/bluedream2009/archive/2010/06/19/1760909.html
* */

//Tween.linear();

var Tween = {
	linear: function (t, b, c, d){  //匀速
		return c*t/d + b;
	},
	easeIn: function(t, b, c, d){  //加速曲线
		return c*(t/=d)*t + b;
	},
	easeOut: function(t, b, c, d){  //减速曲线
		return -c *(t/=d)*(t-2) + b;
	},
	easeBoth: function(t, b, c, d){  //加速减速曲线
		if ((t/=d/2) < 1) {
			return c/2*t*t + b;
		}
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d){  //加加速曲线
		return c*(t/=d)*t*t*t + b;
	},
	easeOutStrong: function(t, b, c, d){  //减减速曲线
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
		if ((t/=d/2) < 1) {
			return c/2*t*t*t*t + b;
		}
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
		if (t === 0) { 
			return b; 
		}
		if ( (t /= d) == 1 ) {
			return b+c; 
		}
		if (!p) {
			p=d*0.3; 
		}
		if (!a || a < Math.abs(c)) {
			a = c; 
			var s = p/4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	elasticOut: function(t, b, c, d, a, p){    //正弦增强曲线（弹动渐出）
		if (t === 0) {
			return b;
		}
		if ( (t /= d) == 1 ) {
			return b+c;
		}
		if (!p) {
			p=d*0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},    
	elasticBoth: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d/2) == 2 ) {
			return b+c;
		}
		if (!p) {
			p = d*(0.3*1.5);
		}
		if ( !a || a < Math.abs(c) ) {
			a = c; 
			var s = p/4;
		}
		else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		if (t < 1) {
			return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
					Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		}
		return a*Math.pow(2,-10*(t-=1)) * 
				Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	},
	backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
		if (typeof s == 'undefined') {
		   s = 1.70158;
		}
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	backOut: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 3.70158;  //回缩的距离
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}, 
	backBoth: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158; 
		}
		if ((t /= d/2 ) < 1) {
			return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		}
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
		return c - Tween['bounceOut'](d-t, 0, c, d) + b;
	},       
	bounceOut: function(t, b, c, d){
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		}
		return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
	},      
	bounceBoth: function(t, b, c, d){
		if (t < d/2) {
			return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
	},
};