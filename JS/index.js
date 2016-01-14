	var scn = {};
	var wrap = $('.wrap')[0],wrapCon = $('.wrapCon')[0],active = $('.active'),
		pic = $('.pic')[0],picImg = $('.img2')[0],cH = view().H;
	var clientH = view().H;
		if ( clientH <= 768 ) {
			clientH = 768;
		}else{
			clientH = view().H;
		};
	active[0].style.height = clientH + 'px';
		//alert( picImg )
/*---  背景图自适应窗口 初始化宽高  ---*/
	(function(){
		document.body.style.backgroundSize = view().W + 'px ' + clientH + 'px';
		wrap.style.height = clientH + 'px';
		wrapCon.style.height = active.length * clientH + 'px';
		for( var i = 0; i < active.length; i++ ){
			active[i].style.height = clientH + 'px';
		};
	})();

/*---  初始第一个 页面运动到 0  ---*/
	doMove( wrapCon,{top:0},666,'easeBothStrong' );

/*---  顶部内容 渐入效果  ---*/
	(function (){
		var pLeft = $('.pLeft')[0],pRight = $('.pRight')[0];
		var leftSp = $('span',pLeft)[0],rightSp = $('span',pRight)[0];
		var leftL = pLeft.clientWidth - leftSp.clientWidth;
		var rightR = pRight.clientWidth - rightSp.clientWidth;
		//console.log( rightR )
		setTimeout(function (){
			doMove(leftSp,{left:leftL,opacity:1},666,"easeBothStrong");
			doMove(rightSp,{left:0,opacity:1},666,"easeBothStrong");
		},1000);
	})();
	
/*---  照片墙缩放功能  移入移出效果  ---*/
	(function (){
		var n = 0,m = 0;
		var timer = null;
		setTimeout( function (){
			timer = setInterval( function (){
				n += 0.12;
				if ( n >= 1 ) {
					n = 1;
					clearInterval( timer );
					timer = null;
				}
				pic.style.transform = 'scale('+n+')';
			},60 );
		},500 );
		pic.onmouseover = function (){
			this.style.transform = 'scale( 1.1 )';
			if ( picImg.timerPic ) return;
			picImg.timerPic = setInterval( function (){
				m += 0.1;
				if ( m >= 1 ) {
					m = 1;
					clearInterval( picImg.timerPic );
					picImg.timerPic = null;
					picImg.style.opacity = m;
				}else{
					picImg.style.opacity = m;
				};
			},60 );
		};
		pic.onmouseout = function (){
			this.style.transform = 'scale( 1 )';
			if ( m !== 1 ) {
				clearInterval( picImg.timerPic );
				picImg.timerPic = null;
				picImg.style.opacity = 0;
			};
			if ( picImg.timerPic2 ) return;
			picImg.timerPic2 = setInterval( function (){
				m -= 0.1;
				if ( m <= 0 ) {
					m = 0;
					clearInterval( picImg.timerPic2 );
					picImg.timerPic2 = null;
					picImg.style.opacity = m;
				}else{
					picImg.style.opacity = m;
				};
			},60 );
		};
	})();

/*---   整屏切换效果   ---*/
	(function(){
		var n = 0, allonOff = true;
		mousewheel( window,function (ev){
				if ( !allonOff ) return;
				allonOff = false;
				n-=1;
				if ( n <= 0 ) {
					n = 0;
				};
				setTimeout( function(){
					allonOff = true;
				},1000 );
				var s = -(n * view().H);
				console.log( n )
				doMove( wrapCon,{top:s},666,'easeBothStrong' );
				//wrapCon.style.top = n * view().H + 'px'
			console.log( ev,"up" );  //事件对象
		},function (ev){
			if ( !allonOff ) return;
			allonOff = false;
			n+=1;
			if ( n >= active.length-1 ) {
				n = active.length-1;
				for( var i = 1; i < active.length; i++ ){
					active[i].style.display = 'none';
					wrapCon.style.height = clientH + 'px';
				};
				setTimeout( function(){
					allonOff = true;
				},500 );
				doMove( wrapCon,{top:0},666,'easeBothStrong' );
				n = 0;
			}else{
				for( var i = 1; i < active.length; i++ ){
					active[i].style.display = 'block';
				};
				var s = -(n * clientH);
				doMove( wrapCon,{top:s},666,'easeBothStrong' );
				setTimeout( function(){
					allonOff = true;
				},1000 );
			};
		});
	})();

/*5 > 3 ? alert("5大于3") : alert("5小3...*/

/*---  窗口改变时 重新赋值 宽高  ---*/
	window.onresize = function () {
		var clientH = view().H;
		if ( clientH <= 768 ) {
			clientH = 768;
		}else{
			clientH = view().H;
		};
		console.log( clientH );
		document.body.style.backgroundSize = view().W + 'px ' + view().H + 'px';
		document.body.style.width = view().W + 'px';
		document.body.style.height = clientH + 'px';
		wrap.style.height = clientH + 'px';
		(function ( clientH ){
			var oUl = $('#ul');
			var oUlT = ( clientH - parseInt( getStyle(oUl,'height' ) ))/2;
			oUl.style.top = oUlT + 'px'
		})( clientH );
		for( var i = 0; i < active.length; i++ ){
			active[i].style.height = clientH + 'px';
		};
		console.log(clientH);
	};
	/*---  左边导航  ---*/
	(function ( cH ){
		var oUl = $('#ul');
		var oUlT = ( cH - parseInt( getStyle(oUl,'height' ) ))/2;
		oUl.style.top = oUlT + 'px'
	})( cH );


