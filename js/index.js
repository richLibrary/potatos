;(function($,wd,dc,undefined){ 
	var  Seamless = (function(){
	 function Seamless(element,options){  
	 		this.element=element;
	 		this.settings =$.extend(true, $.fn.Seamless.defaults,options ||{});			 		
	 		this.init();			 	
	 };
	 Seamless.prototype ={
 		init:function(){  
 		    $this =this;
 		    $this.show= null;
 		    $this.index=0;
 		    $this.flag=true;
 		    $this.dom=$this.settings.domEle;
 		    $this.setsize = $this.settings.setsize == false ?true :false 
 		    $this.width;//轮播宽度
 		    $this.height;//轮播高度				 		   
 		    $this.main=$this.element.find($this.dom.main);
 		    $this.setions =$this.element.find($this.dom.sections);	

 		    //是否设置轮播大小 		 		   
 		  	this._setSize();

 		  	//初始化轮播
 		  	this.setSeamcss();

 		  	//上一页切换
 		  	this._prev();

 		  	//下一页切换
 		  	this._next();

 		  	//是否自动轮播
 		  	this.isAuto();

 		},
 		_setSize:function(){ //是否设置轮播大小			 			
 			  $this =this
 		    if($this.setsize){   
 		    	 $this.width =$this.setions.width();
				 $this.height = $this.setions.height();
				 $this.element.width($this.width);
				 $this.element.height($this.height);
				 $this.setions.width($this.width); 						
 		    }else{			 		    	
 		    	 if($this.settings.width >$(window).width()){
 		    	 	 $this.element.wrap('<div class="Seamless-wrapper"></div>');
 		    	 	 $this.element.parent().css("overflow","hidden");
 		    	 	 $this.element.css({
 		    	 	 	left: '50%',
 		    	 	 	marginLeft:-($this.settings.width/2),
 		    	 	 });
 		    	 	  $this.width  = $this.settings.width;
 		    		  $this.height = $this.settings.height;			 		    	 	
 		    	 }else{
 		    	 	 $this.width = $this.settings.width;
 		    		 $this.height=$this.settings.height;
 		    	 }
 		    	 $this.element.width($this.width);
				 $this.element.height($this.height);
				 $this.setions.width($this.width);	
	 		 };	
 		},
 		getCont:function(){	//获取轮播长度	 		
 		   return $this.setions.length;			 		   
 		},
 		
 		_prev:function(){  //上一张
 				var $this =this		
 			this.element.find($this.dom.prev).on("click",function(){
 				if($this.flag){
 					 $this.flag=false;
 					 $this.index--;
	 			 	 $this._moveSeamless();
 				};				 			
 			});	 			 			
 		},

 		_next:function(){ // 下一张
 			var $this =this
 			this.element.find($this.dom.next).on("click",function(){
 				if($this.flag){
 				  $this.index++;	 				
					  $this.flag=false; 					 
 				  $this._moveSeamless();			 				
 				};				 			
 			});	
 		},

 		isAuto:function(){   //自动轮播
 			var $this =this
 			if($this.settings.isAuto){ 
 				 $this.playGo();		 							
	 			 $this.main.parent().hover(function(){
					$this.stopPaly();
					$this.element.find($this.dom.next).fadeIn();
					$this.element.find($this.dom.prev).fadeIn();
	 			 },function(){
					$this.playGo();
					$this.element.find($this.dom.next).fadeOut();
					$this.element.find($this.dom.prev).fadeOut();		 			 	 	 			 		
	 			 })
 			 };
 		},
 		playGo:function(){ //开始轮播
			$this.show=setInterval(function(){	
			   	 $this.index++;						 
				 $this._progressBar(function(){						 							  		 
				  	$this._moveSeamless();						 
				 });						
			}, $this.settings.time);
		},

 		stopPaly:function(){// 暂停轮播
 			    var $this=this
 				clearInterval($this.show);
 		},
 		createDom:function(){ //创建 切换按钮
 			$this=this;
 			var pagelist =$this.dom.pegebox.substring(1)		 			
 			var switchbox ='<div class></div>'
 			var switchBtn ='<span class="prev-btn  css-btn"><</span>'+'<span class="next-btn css-btn">></span>'		
 			var htmlbtn = "<div class="+pagelist+">"	 			
 			for(var i=0;i<this.getCont();i++){
 					htmlbtn+='<span></span>'
 			};	
 			this.element.append('<div class="progressBar"></div>')	 
 			this.element.append(htmlbtn);
 			this.element.append(switchBtn);	
 			if(this.element.width()>1366){
 				this.element.find($this.dom.next).css({right:10+"%"})
 				this.element.find($this.dom.prev).css({left:10+"%"})
 			}	 			 					
 		},

 		pegeCurrent:function(){//当前页数
				$this= this
				$this.element.find($this.dom.pegebox).children().on("click",function(){
				$this.index=$(this).index();	 					
				$this._moveSeamless($this.index);
				$this.element.find($this.dom.pegebox).children().eq($(this).index()).addClass($this.dom.active).siblings().removeClass($this.dom.active);			
				});
 		 },

 		setSeamcss:function(){ 
			 $this =this;
			 $this.main.prepend($this.setions.last().clone()); 
			 $this.main.append($this.setions.first().clone());
			 $this.size = $this.getCont();
			 $this.main.width(($this.size+2)*$this.width);
			 $this.main.css("left",-$this.width);
			 this.createDom();
			 this.pegeCurrent();
			 $this.element.find($this.dom.pegebox).children().eq($this.index).addClass($this.dom.active);
 		},

 		_moveSeamless:function(){ //滚动方法
 			 $this =this;	 										
 			 $this.main.stop().animate({left:"-"+($this.index+1)*$this.width},$this.settings.speedMove,function(){
 			 	 $this.flag=true;	 			 	 			 	
 			 	 var pagelist=$this.element.find($this.dom.pegebox).children()
 			 	 pagelist.removeClass($this.dom.active)
 			 	 pagelist.eq($this.index).addClass($this.dom.active).siblings()
 			 });	 				
 			 if($this.index==$this.getCont()){				 	
 			 		$this.index=0;
 			    $this.main.animate({left:"-"+$this.width},0);	 			    
 			 };
 			 if($this.index<0){
 			 	$this.index=$this.getCont()-1
 			 	$this.main.animate({left:"-"+($this.size)*$this.width},0)
 			}; 			
 		},

 		_progressBar:function(clallback){  //进度条
 			if(!$this.settings.progressBar){ $this.element.find($this.dom.progressBar).css("background","none")}
 			this.element.find($this.dom.progressBar).animate({width:100+"%"}, $this.settings.time/2,function(){
 				$(this).width(0);
 				if(typeof clallback == "function"){clallback();}; 		 				
 			})
 		 },	 		
 		
	 };
 return Seamless;	 
})();
$.fn.Seamless = function(options){ 
    return this.each(function(){
 	   var  $this= $(this);
           instance =$this.data("Seamless");
         if(!instance){
              $this.data("Seamless",(instance = new Seamless($this,options))); // 传递jquery对象                	
           };                      
        if($.type(options) === "string") return instance[options]();                   
	 });   
};
$.fn.Seamless.defaults ={
		    domEle:{
			   main:".main",
			   sections:".secImg",
			   active:"active",
			   prev:".prev-btn",
			   next:".next-btn" ,
			   pegebox:".pegelist",
			   progressBar:".progressBar"	
			},			   	  
	   	   isAuto:true,      //是否自动播放
	   	   time:3000,        //轮播间隔时间
	   	   setsize:false,     //默认false 取图片大小为轮播的尺寸
	   	   width:1920,       //自定义轮播宽度
	   	   height:480,       //自定义轮播高度
	   	   speedMove:800,	 //轮播移动的速度
	   	   progressBar:false, //是否显示轮播进度条 
  }; 		
})(jQuery,window,document);
$(function(){
	 $("#container").Seamless({
	 	   progressBar:false,//是否显示轮播进度条 	   	  
	   	   isAuto:true,     //是否自动播放
	   	   time:2500,       //轮播间隔时间
	   	   setsize:true,   //默认false 取图片大小为轮播的尺寸
	   	   width:1920,      //自定义轮播宽度
	   	   height:550,      //自定义轮播高度
	   	   speedMove:800,   //轮播移动的速度
	 });	
});
window.onload = function(){
	var iconBtn=document.getElementById("iconBtn");
	var iconThr=document.getElementById("iconThr");
	var searchWarp=document.getElementById("searchWarp");
	var navList=document.getElementById("navList");
	var navLi=navList.getElementsByTagName("li");
	var underList=document.getElementById("underList");
	var underLi=underList.getElementsByTagName("li");
	var newList=document.getElementById("newList")
	var newLi=newList.getElementsByTagName("li");
	var quickNav=document.getElementById("quickNav");
	var quickLi=quickNav.getElementsByTagName("a");
	var navSlide=document.getElementById("navSlide");
	underLi[underLi.length-1].style.marginRight="0";
	quickLi[quickLi.length-1].style.marginRight="0";
	iconBtn.onclick=function(){
		searchWarp.className="show";
		navList.style.display="none";
		iconThr.style.display="block"
	};
	iconThr.onclick=function(){
		searchWarp.className="";
		navList.style.display="block";
	};
	for (var i=0;i<newLi.length;i++){
        if(i%2!=0){
         newLi[i].style.marginRight="0";
        }
	};
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
	}
	codeShow.onmouseleave = function () {
	    clearInterval(drawover);
	    clearInterval(drawout);
	    var num = codeImgWidth;
	    drawout = setInterval(function () {
	        if (num > 0) {
	            codeImg.style.width = num + "px";
	            num -=5;
	        }
	        else {
	            clearInterval(drawout);
	            drawout = null
	        }
		}, 10)
	};
	//回到顶部
	$("#backTop").click(function(){
		$("html, body").animate({
				scrollTop: 0
			}, 300);
		return false;
	});
}
