define(function(require, exports, module){
	
	//引用功能库模块
	var $ 		= require('lib/zepto/zepto'),						//zepto模块
		$ 		= require('lib/zepto/selector'),					//选择器插件模块
		$ 		= require('lib/zepto/touch'),						//选择器插件模块
		$ 		= require('lib/zepto/coffee'),						//选择器插件模块
		//$ 		= require('units/weixin'),							//选择器插件模块
		res 	= require('modules/resources/main'),
		music=require('units/music'),
		self 	= null,
		Year	= function (){this.init.apply(this, arguments)};	//Vs构造函数
		

	//Year原型
	Year.prototype = {
		init : function (){
			self 		= this;
			self.startX = 0;
			self.startY = 0;
			self.disX	= 0;
			self.disY 	= 0;
			self.margin = 0;
			self.x 		= 0;
			self.y 		= 0;
			self.box	= null;
			self.aw 	= [];
			self.ay 	= [];
			// self.height 		= self.box.height();
			// self.startX 		= 0;
			// self.startY 		= 0;
			// self.disX			= 0;
			// self.disY 			= 0;
			// self.margin 		= 0;
			// self.curPage		= 1;
			// self.pageHeight		= 0;
			// self.open			= false;
			self.loading();
			$('body').on('touchstart touchmove touchend', function (event){event.preventDefault();}).on("touchstart",".J-share-mask",function(){
				$(this).remove();
			})
			music.play()
		},
		loading : function (){
			var src		= 'images/',
				loaded	= 0,
				i 		= 0,
				len 	= res.length;
			for(;i<len;i++){
				(function (i){
					var oImg = new Image();
					oImg.onload = function(){
						loaded++;
						var per = loaded/len,
							p 	= (per.toFixed(2) * 100 ) * (123 / 100);
						$('.J-logo span').css({height:p, top:123-p});
						// $('.J-load').html(parseInt((per.toFixed(2) * 100))+'%');
						if(per >= 1){
							window.onload = function (){
								self.layout();
								setTimeout(function(){
									$('.J-loading').animate({'opacity':0}, 1000, 'ease', function (){
										$(this).remove();
										self.run(self);
									});
								},3000);
							}
						}
					};
					oImg.src = src + res[i];
				})(i);
			}
		},
		run : function (){
			self.events();
			self.game();
			$(".J-share").on("tap",function(){
				var html='<div class="m-share-mask J-share-mask"></div>';
				$("body").append(html);
			})
			var wh=$(window).height(),
				  box=$(".J-box"),
				  boxH=box.height();
			if (wh<boxH){
				box.css("top",wh-boxH);
				$(".J-front-cover-box").css("top",boxH-wh)
			}
		},
		events : function (){
			$('.J-guide').on('tap', function (){
				if ($(this).hasClass("m-guide-box")){
					$(this).remove();
					$('.J-bubble').each(function (index){
						$(this).addClass('z-on'+index);
					});
				}else{
					$(this).removeClass("m-guide-animate").addClass("m-guide-animate1 m-guide-box");
				}
			});
			$('.J-ship-box').on('webkitAnimationEnd', function (){
				if(!$('.J-anchor-chain').hasClass('z-on')){
					$('.J-anchor-chain').addClass('z-on');
				}
				if($(this).hasClass('z-on2')){
					$(this).off('webkitAnimationEnd');
					$('.J-front-cover-box').addClass('z-on');
                    /**
                     *  Update By yanghongwei @2014/12/19
                     *  For Create Game Log
                     */
                    createUserGameLog(0);
				}
			});
			$('.J-anchor-chain').on('webkitAnimationEnd', function (){
				//$('.J-anchor-chain').off('webkitAnimationEnd');
				if(self.ay.length == 0){
					setTimeout(function (){
						$('.J-anchor').addClass('z-on');
						$('.J-five-box').hide();
						$('.J-guide').show().addClass("m-guide-animate");
						$('.J-bubble').off('touchstart touchmove touchend').on('touchstart touchmove touchend', function (event){
							self.slide.call(this, event);
						});
					},1000);
				}
				if(self.aw.length == 4 && self.ay.length == 4){
					$('.J-anchor-chain').off('webkitAnimationEnd');
					setTimeout(function (){
						$('.J-chest-chain').removeClass('z-on z-on1 z-on2 z-on3 z-on4').addClass('z-on5');
					},1000);
				}
			});
			
			$('.J-chest-chain').on('webkitAnimationEnd', function (){
				if(self.aw.length == 4 && self.ay.length == 4){
					setTimeout(function (){
						$('.J-chest-chain').removeClass('z-on z-on1 z-on2 z-on3 z-on4').addClass('z-on5');
					},100);
				}
				if($(this).hasClass('z-on5')){
					$(this).off('webkitAnimationEnd');
					self.over();
				}
			});
			$('.J-setsail').on('webkitAnimationEnd', function (){
				$(this).addClass('z-on1');
				if($(this).hasClass('z-on1')){
					$(this).off('webkitAnimationEnd');
					self.gameover();
				}
			});
		},
		over : function (){
			$('.J-chain').addClass('z-on');
			$('.J-anchor-chain').addClass('z-on5');
			$('.J-setsail').addClass('z-on');
		},
		gameover : function (){
			$('.J-ship-box').removeClass('z-on1').addClass('z-on2');
			$('.J-anchor-box').addClass('z-on1');
		},
		guide : function (){
			if($(this).hasClass('z-on')){
				$(this).remove();
				$('.J-bubble').each(function (index){
					$(this).addClass('z-on'+index);
				});
			}
			else{
				$(this).addClass('z-on');
			}
		},
		game : function (){
			$('.J-ship-box, .J-anchor-box, .J-chest-box').addClass('z-on');
			$('.J-ship-box').addClass('z-on1');
		},
		layout : function (){
			self.json = [
				{'x' : '20', 'y' : '500'},
				{'x' : '220', 'y' : '460'},
				{'x' : '465', 'y' : '590'},
				{'x' : '95', 'y' : '725'},
				{'x' : '205', 'y' : '630'},
				{'x' : '510', 'y' : '435'},
				{'x' : '265', 'y' : '795'},
				{'x' : '490', 'y' : '755'}
			];
			$('.J-bubble').each(function (index){
				$(this).css({'-webkit-transform':'matrix(1, 0, 0, 1, '+ self.json[index].x +', '+ self.json[index].y +')'});
			});
		},
		slide : function (event){
			var e 		= event.changedTouches[0];
			self.box 	= $(this);
			self.index 	= $('.J-bubble').index(this);
			switch(event.type){
				case 'touchstart':
					self.onStart(e);
					break;
				case 'touchmove':
					self.onMove(e, event);
						break;
				case 'touchend':
					self.onEnd(e);
					break;
			}
		},
		onStart : function (e){
			// 起始点，页面位置
			self.startX = e.pageX;
			self.startY = e.pageY;
			self.margin = self.box.css("-webkit-transform");
			self.margin = self.margin.replace("matrix(", "");
			self.margin = self.margin.replace(")", "");
			self.margin = self.margin.split(",");
			self.x 		= self.startX - parseInt(self.margin[4]);
			self.y 		= self.startY - parseInt(self.margin[5]);
			self.box.css({'opacity':'1', 'z-index':'1'}).removeClass('z-on'+self.index);
		},
		onMove : function (e, event){
			self.oNead 	= null;
			self.disX 	= e.pageX - self.x,
			self.disY 	= e.pageY - self.y;
			self.box.css({'-webkit-transform':'matrix(1, 0, 0, 1, '+ self.disX +', '+ self.disY +')'});
			if(self.box.hasClass('w')){
				self.oNead = self.collision(self.box);
			}
			else{
				self.oNead = self.collisiony(self.box);
			}
		},
		onEnd : function (e){
			if(self.oNead != null){
				if(self.box.hasClass('w') && $(self.oNead).hasClass('J-chest')){
					self.box.hide();
					self.aw.push('w');
					var i=self.aw.length-1;
					$('.J-chest-chain').removeClass("m-play-animate");
					setTimeout(function(){
						$('.J-chest-chain').addClass('z-on' + self.aw.length+" m-play-animate");
					},10)
					$(".J-four-icon").hide().show();
					$(".J-four-icon").eq(0).on("webkitAnimationEnd", function (){
						$(".J-four-icon").hide();
					});
					// if(self.aw.length == 4){
					// 	setTimeout(function (){
					// 		$('.J-chest-chain').removeClass('z-on z-on1 z-on2 z-on3 z-on4').addClass('z-on5');
					// 	}, 1500);
					// }
				}
				if(self.box.hasClass('y') && $(self.oNead).hasClass('J-anchor')){
					self.box.hide();
					self.ay.push('y');
					$('.J-anchor-chain').removeClass("m-play-animate")
					setTimeout(function(){
						if (self.ay.length==4){
							$('.J-anchor-chain').addClass('z-on' + self.ay.length+" m-play-animate1");
						}else{
							$('.J-anchor-chain').addClass('z-on' + self.ay.length+" m-play-animate");
						}
					})
					
					$(".J-five-icon").hide().show();
					$(".J-five-icon").on("webkitAnimationEnd", function (){
						$(this).hide();
					});
					
				}
			}
			else{
				self.box.css({'z-index':'0', 'opacity':'0','-webkit-transform':'matrix(1, 0, 0, 1, '+ self.json[self.index].x +', '+ self.json[self.index].y +')'}).addClass('z-on' + self.index);
			}
		},
		collision : function (elem){
			var iMin 		= 99999,
				iMinIndex 	= -1,
				chest 		= $('.J-chest')[0];
			if(self.collisions(chest, elem)){
				var dis = self.ggdl(chest, elem);
				if(iMin > dis){
					iMin = dis;
					iMinIndex = 1;
				}
			}

			if(iMinIndex == -1){
				return null;
			}else{
				return chest;
			}
		},
		collisiony : function (elem){
			var iMin 		= 99999,
				iMinIndex 	= -1,
				anchor 		= $('.J-anchor')[0];
			if(self.collisions(anchor, elem)){
				var dis = self.ggdl(anchor, elem);
				if(iMin > dis){
					iMin = dis;
					iMinIndex = 1;
				}
			}

			if(iMinIndex == -1){
				return null;
			}else{
				return anchor;
			}
		},
		collisions : function (elem, elem1){
			var margin 	= elem1.css("-webkit-transform"),
				margin 	= margin.replace("matrix(", ""),
				margin 	= margin.replace(")", ""),
				margin 	= margin.split(","),
				left 	= parseInt(margin[4]),
				top 	= parseInt(margin[5]);

			var l1 = elem.parentNode.offsetLeft,
				r1 = l1 + elem.offsetWidth,
				t1 = elem.parentNode.offsetTop + elem.offsetTop,
				b1 = t1 + elem.offsetHeight,
			
				l2 = left,
				r2 = left, //+ elem1.width(),
				t2 = top,
				b2 = top; //+ elem1.height();

			if(r1 < l2 || r2 < l1 || b1 < t2 || b2 < t1){
				return false;
			}else{
				return true;
			}
		},
		ggdl : function (elem, elem1){
			var margin 	= elem1.css("-webkit-transform"),
				margin 	= margin.replace("matrix(", ""),
				margin 	= margin.replace(")", ""),
				margin 	= margin.split(","),
				left 	= parseInt(margin[4]),
				top 	= parseInt(margin[5]);

			var a = elem.offsetLeft + elem.offsetWidth / 2 - (left + elem1.width() / 2);
			var b = elem.offsetTop + elem.offsetHeight / 2 - (top + elem1.height() / 2);
			return Math.sqrt(a * a + b * b);
		}
	};
	//对外提供Year对象接口
	module.exports = new Year();
});

//############################ Code Create By YANGHONGWEI
/**
 *  Update By yanghongwei @2014/12/11
 *  添加用户游戏日志
 */
function createUserGameLog(score) {
}
