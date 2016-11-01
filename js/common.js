	var navList=document.getElementById("navList");
	var navLi=navList.getElementsByTagName("li");	
	var navSlide=document.getElementById("navSlide");
	//导航下拉菜单
	for (var i = 0; i < navLi.length; i++) {
		
			    
	    navLi[i].onmouseover = function () {
	        if (this.children.length > 1) {
	            this.children[1].style.display = "block";
	        }
	    }
	    navLi[i].onmouseout = function () {
	        if (this.children.length > 1) {
	            this.children[1].style.display = "none";
	        }
	    }
	};
	//搜索框
	iconBtn.onclick=function(){
		searchWarp.className="show";
		navList.style.display="none";
		iconThr.style.display="block"
	};
	iconThr.onclick=function(){
		searchWarp.className="";
		navList.style.display="block";
	};
	//底部二维码效果
	var Wechat=document.getElementById("Wechat");
	var weixin=document.getElementById("weixin");
	Wechat.onmouseenter=function(){
		weixin.style.display="block";
	};
	Wechat.onmouseleave=function(){
		weixin.style.display="none";
	};
	//右侧浮动导航			
	var codeImgWidth = $(".codeImg").outerWidth();
	var codeShow=document.getElementById("codeImgShow");
	var codeImg = document.getElementById("codeImg");
	var drawover = null,drawout=null;
	codeShow.onmouseenter = function () {
	    clearInterval(drawout);
	    clearInterval(drawover);
	    codeImg.style.width = "0";
	    codeImg.style.display = "block";
	    var num = 20;
	    drawover = setInterval(function(){
	        if (num < codeImgWidth) {
	            codeImg.style.width = num + "px";
	            num += 5;
	        }
	        else {
	            clearInterval(drawover);
	            drawover = null;
	        }
	    }, 10);
	};
	codeShow.onmouseleave = function () {
	    clearInterval(drawover);
	    clearInterval(drawout);
	    var num = codeImgWidth;
	    drawout = setInterval(function (){
	        if (num > 0) {
	            codeImg.style.width = num + "px";
	            num -=5;
	        }
	        else {
	            clearInterval(drawout);
	            drawout = null
	        }
		}, 10);
	};
	// 左侧栏
//	var rollStart = $('#sideBar');
//	var offset = rollStart.offset(),objWindow = $(window)
//	objWindow.scroll(function(){
//		if (objWindow.scrollTop() > offset.top){
//			rollStart.addClass("rollbox");
//			rollStart.show().stop().animate({top:0},400);
//		} else {
//			rollStart.stop().animate({top:0},400);
//			rollStart.removeClass("rollbox");			
//		}
//	});
  var rollStart = document.getElementById("sideBar");	
    var offset = offsetTop(rollStart);    
    var downMove;
    document.onscroll=function () {
        clearInterval(downMove);
        var objWindow = document.body.scrollTop | document.documentElement.scrollTop;
  	if(objWindow>offset){
  		rollStart.className="rollbox";
  		rollStart.style.display = "block";
  		rollStart.style.top = "0";
  		downMove=setInterval(function(){
  			rollStart.style.top="0";
  		}, 400)
  	} else {  	    
  		downMove=setInterval(function(){
  			rollStart.style.top="0";
  		}, 400)
  		rollStart.className = "sideBar";
  		rollStart.style.width = "280px";
  	}
  }
function offsetTop(elements) {
	    var top = elements.offsetTop;
	    var parent = elements.offsetParent;
	    while (parent != null) {
	        top += parent.offsetTop;
	        parent = parent.offsetParent;
	    };
	    return top;
	};
//  var rollStart=document.getElementById("sideBar");
//  var offset=rollStart.offsetTop,objWindow= document.body.scrollTop | document.documentElement.scrollTop;
//  objWindow.onscroll=function(){   	
//  	clearInterval(downMove);
//  	if(objWindow>offset){
//  		rollStart.className="rollbox";
//  		rollStart.style.display="block";
//  		downMove=setInterval(function(){
//  			rollStart.style.top="0";
//  		},400)
//  	}else{
//  		rollStart.className="";
//  		downMove=setInterval(function(){
//  			rollStart.style.top="0";
//  		},400)
//  	}
//  }
	//回到顶部
    var obtn = document.getElementById('backTop');
	//获取页面可视区的高度
	var cHeight=document.documentElement.clientHeight;
	var timer = null;
	var isTop = true;
	window.onscroll=function(){
		//获取滚动条距离顶部的高度
		var osTop=document.documentElement.scrollTop || document.body.scrollTop;
		if (osTop >= cHeight){
	    		obtn.style.display='block'; //显示按钮
				}
		if (!isTop){
					 clearInterval(timer);
				   }
		isTop = false;
	}	
	obtn.onclick = function(){		
		//设置定时器
		timer = setInterval(function(){
            var osTop=document.documentElement.scrollTop || document.body.scrollTop;
			var ispeed = Math.floor(-osTop / 6);
			document.documentElement.scrollTop = document.body.scrollTop = osTop +ispeed;			
			isTop = true;
			if (osTop == 0){
			    clearInterval(timer);
			}
		},30);
	}