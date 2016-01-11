	var scn = {};
	// 背景图自适应窗口
	var cW = document.documentElement.clientWidth;
	var cH = document.documentElement.clientHeight;
	(function ( cW,cH ){
		var wrap = $('.wrap')[0],con = $('content');
		var wrapW = ( cW - con.offsetLeft )/2;
		//alert( wrapW )
		window.onresize = function () {
			var cW = document.documentElement.clientWidth;
			var cH = document.documentElement.clientHeight;
			var wrapW = ( cW - con.offsetLeft )/2;
			document.body.style.width = cW + 'px';
			document.body.style.height = cH +'px';
		 	document.body.style.backgroundSize = cW + 'px '+ cH + 'px';
		 	doMove( wrap,{top:0},888,'easeBothStrong' )
		 	wrap.style.left = wrapW + 'px';
		 	(function ( cH ){
				var oUl = $('#ul');
				var oUlT = ( cH - parseInt( getStyle(oUl,'height' ) ))/2;
				oUl.style.top = oUlT + 'px'
			})( cH );

		 };
		document.body.style.width = cW + 'px';
		document.body.style.height = cH +'px';
	 	document.body.style.backgroundSize = cW + 'px '+ cH + 'px';
	 	doMove( wrap,{top:0},888,'easeBothStrong' );

	 	wrap.style.left = 0 + 'px';
	 })( cW,cH );

 // 头部 字幕淡入
	(function (){
		var pLeft = $('.pLeft')[0],pRight = $('.pRight')[0];
		var leftSp = $('span',pLeft)[0],rightSp = $('span',pRight)[0];
		var leftL = pLeft.clientWidth - leftSp.clientWidth;
		var rightR = pRight.clientWidth - rightSp.clientWidth;

		//console.log( rightR )
		setTimeout(function (){
			doMove(leftSp,{left:leftL,opacity:1},666,"easeBothStrong");
			doMove(rightSp,{left:0,opacity:1},666,"easeBothStrong");
		},800);
	})();

	// 头像 缩放功能
	(function (){
		var pic = $('.pic')[0];
		var n = 0;
		var timer = null;
		setTimeout( function (){
			timer = setInterval( function (){
				n += 0.12;
				if ( n >= 1 ) {
					n = 1;
					clearInterval( timer );
					timer = null;
				};
				pic.style.transform = 'scale('+n+')';
			},60 );
		},500 )
		pic.onmouseover = function (){
			this.style.transform = 'scale( 1.1 )';
		};
		pic.onmouseout = function (){
			this.style.transform = 'scale( 1 )';
		};
	})();
	(function ( cH ){
		var oUl = $('#ul');
		var oUlT = ( cH - parseInt( getStyle(oUl,'height' ) ))/2;
		oUl.style.top = oUlT + 'px'
	})( cH );
