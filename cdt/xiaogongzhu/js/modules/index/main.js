define(function(require, exports, module){
	//引用相关模块
	var $ 			= require('lib/zepto/zepto'),
		$ 			= require('lib/zepto/touch'),
		$ 			= require('lib/zepto/coffee'),
		$ 			= require('units/weixin'),
		img_v 		= $STCONFIG.VERSION,
		src			= 'static/images/',
		aImg		= [
			src 	+ 'bg.jpg?version=' + img_v,
			src 	+ 'bg-1.jpg?version=' + img_v,
			src 	+ 'go.png?version=' + img_v,
			src 	+ 'meun.png?version=' + img_v,
			src 	+ 'title.png?version=' + img_v,
			src 	+ 'pumpkin.png?version=' + img_v,
			src 	+ 'people.png?version=' + img_v
		],
		loaded		= 0,
		i 			= 0,
		len 		= aImg.length,
		timer 		= null;

	//对外提供接口
	module.exports = {
		//初始化
		init : function () {
			this.loading();
		},
		loading : function (){
			var self = this;
			for(;i<len;i++){
				(function (i){
					var oImg = new Image();
					oImg.onload = function(){
						loaded++;
						var per = loaded/len,
							p 	= (per.toFixed(2) * 100 ) * (566 / 100);
						$('.J-pro').css({width:p});
						$('.J-pro').html(parseInt((per.toFixed(2) * 100))+'%');
						if(per >= 1){
							$(window).on('load', function (){
								$('.J-loading').animate({opacity:0}, 400, 'ease', function (){
									$(this).remove();
								});
								self.run(self);
							});
						}
					};
					oImg.src = aImg[i];
				})(i);
			}
		},
		run : function (){
			var self = this;
			self.events();
		},
		events : function (){
			var self = this;
			$('.J-go').on('tap', function (){self.start.call(this, self)});
			$('.J-menu').on('tap', function (event){self.menu.call(this, self, event)});
			$('.J-operation').on('tap', function (event){self.rmenu.call(this, self, event)});
			$(document).on('tap', function (){self.doc.call(this, self)});
		},
		menu : function (self, event){
			var list = $('.J-menu-list');
			if(list.hasClass('z-on')){
				list.removeClass('z-on');
			}
			else{
				list.addClass('z-on');
			}
			event.stopPropagation();
		},
		rmenu : function (self, event){
			var list = $('.J-game-menu');
			if(list.hasClass('z-on')){
				list.removeClass('z-on');
			}
			else{
				list.addClass('z-on');
			}
			event.stopPropagation();
		},
		start : function (self){
			$('.J-home').animate({opacity:0}, 400, 'ease', function (){
				$(this).hide();
				self.countdown();
			});
		},
		countdown : function (){
			var self 		= this,
				countdown 	= $('.J-countdown span'),
				num			= 3;

			countdown.html(num);
			clearInterval(timer);
			timer = setInterval(function (){
				num == 'GO!' && (function (){
					clearInterval(timer);
					self.hide();
					self.game();
				})();
				num --;
				num == 0 && (num = 'GO!');
				countdown.html(num);
			}, 1000);
		},
		game : function (){
			require.async('modules/game/main', function (game){
				game.init();
			});
		},
		doc : function (){
			$('.J-menu-list') && $('.J-menu-list').removeClass('z-on');
		},
		hide : function (){
			$('.J-countdown').hide();
		}
	}
});
