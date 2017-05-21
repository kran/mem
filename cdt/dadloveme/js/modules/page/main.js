	
define(function(require, exports, module){
	//引用相关模块
	var $ 			= require('lib/zepto/zepto'),
		$ 			= require('lib/zepto/touch'),
		aImg		= require('modules/imgsrc/main'),
		loaded		= 0,
		i 			= 0,
		len 		= aImg.src.length,
		curPage 	= 0,
		pageHeight	= 0,
		movePrevent = false,
		scrollPrevent = false;
	//对外提供接口
	module.exports = {
		//初始化
		init : function () {
			var self = this;
			this.fatherPic = $('.J-father-box div');
			this.boyPic = $('.J-boy-box div');
			this.music3 = $('.J-music3')[0];//挥鞭
			this.music2 = $('.J-music2')[0];//打中
			this.iCurrentN = 0;
			this.iCurrentScore = 0;
			this.iCurrentDirection = 'left';
			this.iCurrentEvent = 'left';
			this.times = null;
			this.timer = null;
			this.actionArr = [
				'left',
				'right'
			];
			this.scoreArr = [
				'images/D-score-num0.png',
				'images/D-score-num1.png',
				'images/D-score-num2.png',
				'images/D-score-num3.png',
				'images/D-score-num4.png',
				'images/D-score-num5.png',
				'images/D-score-num6.png',
				'images/D-score-num7.png',
				'images/D-score-num8.png',
				'images/D-score-num9.png',
			];
			this.gameSwitch = true;
			this.loading();//加载
			this.move();//挨打动画
			//this.startUse();//过度
			//this.timeMachine();//时光机
			
			this.events();
			this.setSocre();
			//this.setfatherAction();
		},
		/**
		 * 事件
		 * @method events
		 */
		events : function(){
			var self = this;
			$('.J-event-l').on('tap', function(){
				if(!self.gameSwitch){return;}
				self.boyPic.eq(0).show().siblings().hide();
				self.iCurrentEvent = 'left';
			});
			$('.J-event-r').on('tap', function(){
				if(!self.gameSwitch){return;}
				self.boyPic.eq(1).show().siblings().hide();
				self.iCurrentEvent = 'right';
			});
			$('.J-share').on('tap', function(){
				$('.m-box7').show().addClass('z-on');
			});
			$('.m-box7').on('tap', function(){
				$(this).hide().removeClass('z-on');
			});
			$('.J-restart').on('tap', function(){
				self.setGameRestart();//重新开始
			});
			$('.J-end-pop').on('tap', function(){
				
				$('.m-box5').animate({'opacity':0},function (){
					$(this).hide().removeClass('z-on ndis').css('opacity',1);
				});
				if(getResultLevel(self.iCurrentScore, bBoy)){
					$('.J-box-end').show().addClass('success z-on').removeClass('fail');
				}else{
					$('.J-box-end').show().addClass('fail z-on').removeClass('success');
				}
				$('.J-hit-icon').hide();
				$(this).hide();
			});
		},
		/**
		 * 设置分数
		 * @method setSocre
		 */
		setSocre : function(big){
			var self = this;
				socrePic = !big ? $('.J-score-box img') : $('.m-box6-num'),
				picSrc = '',picArr = [];
			if(self.iCurrentScore < 10){
				picSrc = '00' + self.iCurrentScore;

			}else if(self.iCurrentScore < 100){
				picSrc = '0' + self.iCurrentScore;
			}else{
				picSrc = self.iCurrentScore.toString();
			}

			socrePic.each(function(i){
				$(this).attr('src' , self.scoreArr[picSrc.charAt(i)]);
			});

		},
		/**
		 * 设置父亲的动作
		 * @method setfatherAction
		 */
		setfatherAction : function(){

			var self = this,
				num = self.returnRandomNum(self.actionArr);
			if(num == 1){
				self.iCurrentDirection = self.actionArr[num];
				self.iCurrentN = 3;
				self.setRightAction();
			}else{
				self.iCurrentDirection = self.actionArr[num];
				self.iCurrentN = 0;
				self.setLeftAction();
			}

		},
		/**
		 * 返回数据中的随机数
		 * @method returnRandomNum 
		 * @param  {[array]} arr 需要返回随机数的数组
		 * @return {string|object}     数据中的随机数
		 */
		returnRandomNum : function(arr){
			return Math.floor(Math.random() * arr.length + 1)-1;	
		},
		/**
		 * 设置父亲左侧动作
		 * @method setLeftAction 
		 */
		setLeftAction : function(){
			var self = this,
				boy2 = $('.J-boy2');
			self.timer = setTimeout(function(){
				if(self.iCurrentN == 2){
					if(self.iCurrentDirection == self.iCurrentEvent){
						$('.J-end-pop').show();
						self.gameSwitch = false;
						self.setGameHit('left');
						return;
					}else{
						boy2.addClass('z-no');
						setTimeout(function(){
							boy2.removeClass('z-no');
						}, 400);
					}
				}else if(self.iCurrentN > 2){
					self.iCurrentScore++;
					self.setSocre();
					clearTimeout(self.timer);
					self.setfatherAction();
					
					return;
				}else if(self.iCurrentN == 0){
					self.music3.play();
				}
				self.fatherPic.eq(self.iCurrentN).show().siblings().hide();
				self.iCurrentN++;
				self.setLeftAction();
			}, 300);
		},
		/**
		 * 设置父亲右侧动作
		 * @method setRightAction 
		 */
		setRightAction : function(){
			var self = this,
				boy1 = $('.J-boy1');;
			self.times = setTimeout(function(){	
				if(self.iCurrentN == 5){
					if(self.iCurrentDirection == self.iCurrentEvent){
						$('.J-end-pop').show();
						self.gameSwitch = false;
						self.setGameHit('right');
						return;
						//clearTimeout(self.times);
					}else{
						boy1.addClass('z-no');
						setTimeout(function(){
							boy1.removeClass('z-no');
						}, 400);
					}
				}else if(self.iCurrentN > 5){
					self.iCurrentScore++;
					self.setSocre();
					clearTimeout(self.times);
					self.setfatherAction();
					return;
				}else if(self.iCurrentN == 3){
					self.music3.play();
				}
				self.fatherPic.eq(self.iCurrentN).show().siblings().hide();
				self.iCurrentN++;
				self.setRightAction();
			}, 300);
		},
		/**
		 * 设置游戏中被打中
		 * @method setGameHit 
		 */
		setGameHit : function(){
			var self = this,
				hitIcon = $('.J-hit-icon');
			self.music2.play();
			if(self.iCurrentDirection == 'left'){
				hitIcon.eq(0).show();
				
			}else{
				hitIcon.eq(1).show();
				
			}
			self.boyPic.eq(0).addClass('z-yes');
			self.boyPic.eq(1).addClass('z-yes');
			self.setSocre('big');
			
			/*setTimeout(function(){
				
			}, 300);*/
		},
		/**
		 * 设置游戏重新开始
		 * @method setGameRestart 
		 */
		setGameRestart : function(){
			var self = this;
			self.fatherPic.eq(0).show().siblings().hide();
			self.iCurrentN = 0;
			//小人重置
			self.boyPic.removeClass('z-no').removeClass('z-yes').eq(0).show().siblings().hide();
			$('.J-hit-icon').hide();//被打中的图片隐藏
			self.iCurrentDirection = 'left';
			self.iCurrentEvent = 'left';
			self.gameSwitch = true;//可以被点击
			self.iCurrentScore = 0;
			self.setSocre();//重置分数
			$('.m-box6').animate({'opacity':0},function (){
				$(this).hide().removeClass('ndis').css('opacity',1);
				$('.m-box5').show();
				$('.m-box5').addClass('z-on');
				setTimeout(function(){self.setfatherAction();}, 4000);
			});
		},
		loading : function (){
			var self = this;
			for(;i<len;i++){
				(function (i){
					var oImg = new Image();
					oImg.onload = function(){
						loaded++;
						var per 	= loaded/len,
							  n 	= (parseInt((per.toFixed(2) * 100))),
							num 	= (n+'').split(""),
							numStr  = '';
						for( j=0; j<num.length; j++ ){
							numStr += '<img src="images/'+num[j]+'.png" />';
						}
						numStr += '<img src="images/000.png" />';
						$('.J-num').html(numStr);
						if(n>= 100){
							change1();
						}
					};
					oImg.src = aImg.src[i];
				})(i);
			}

		},
		move : function (){
			var self = this;
			window.change1=function (){
				var bTap1=false;
				var bTap2=false;
				$('.m-loading').animate({'opacity':0},function (){
					$(this).hide().removeClass('z-on ndis').css('opacity',1);
					$('.m-box1').show();
				});
				
				$('.m-box1').on('tap',function (){
					$('.J-music')[0].play();
					$(this).animate({'opacity':1},function (){
						$(this).css('opacity',0).hide().css('opacity',1);
						$('.m-box2').show();
						$('.m-box2').addClass('z-on');
					});
				});
				
				$('.m-box2-boy').on('tap',function (){
					bBoy=true;
					$('.m-box2').animate({'opacity':0},function (){
						$(this).hide().removeClass('z-on ndis').css('opacity',1);
						$('.m-box3-1').show();
					});
					
					setTimeout(function (){
						$('.m-box3-1').animate({'opacity':0},300,function (){
							$(this).hide();
						});
						go();
					},2400);
					
					//4000需要改时间??????????????????????????????
					
				});
				$('.m-box2-girl').on('tap',function (){
					bBoy=false;
					$('.m-box2').animate({'opacity':0},function (){
						$(this).hide().removeClass('z-on ndis').css('opacity',1);
						$('.m-box3-2').show();
						$('.m-box3-2').addClass('z-on');
					});
				});
				
				$('.m-box3-gz').on('webkitAnimationEnd',function (){
					bTap2=true;
				});
				
				$('.m-box3-gz').on('tap',function (){
					if(bTap2){
						go();
					}
				});
				
				$('.m-box4').on('tap',function (){
					$(this).animate({'opacity':0},function (){
						$(this).hide().removeClass('z-on ndis').css('opacity',1);
						$('.m-box5').show();
						$('.m-box5').addClass('z-on');
						setTimeout(function(){self.setfatherAction();}, 4000);
					});
				});
				
			}
			//选完男孩女孩最后合并
			function go(){
				$('.m-box3-2').animate({'opacity':0},function (){
					$(this).hide().removeClass('z-on ndis').css('opacity',1);
					$('.m-box4').show();
					$('.m-box4').addClass('z-on');
				});
			}
			//到第六个页面
			function goPage6(){
				$('.m-box5').animate({'opacity':0},function (){
					$(this).hide().removeClass('z-on ndis').css('opacity',1);
					$('.m-box6').show();
					if(scoreCount>=5){
						$('.m-box6').addClass('success z-on');
					}else{
						$('.m-box6').addClass('fail z-on');
					}
				});
			}
			//我错了
			/*$('.m-box6-accept').on('tap',function (){
				$('.m-box6').animate({'opacity':0},function (){
					$(this).hide().removeClass('ndis').css('opacity',1);
					$('.m-box7').show();
					$('.m-box7').addClass('z-on');
					$('.m-box7').on('tap',function (){
						$(this).animate({opacity:0},function (){
							$('.m-box7').hide();
							$('.m-box6').show();
							$('.m-box6').animate({'opacity':1},function (){
								$(this).addClass('z-on');
								$('.m-box7').css('opacity',1);
							});
						});
					});
				});
			});*/
			//我不服
			/*$('.m-box6-refuse').on('tap',function (){
				$('.m-box5-boy').removeClass('boyl1');
				$('.m-box5-boy').addClass('boyl1');
				boyLeft=true;
				$('.m-box6').animate({'opacity':0},function (){
					$(this).hide().removeClass('ndis').css('opacity',1);
					$('.m-box5').show();
					$('.m-box5').addClass('z-on');
					timer=setTimeout(Da,3000);
					//清空分
					$('.m-box6-nums').find('img').attr('src','images/D-score-num0.png');
					$('.m-box5-score').find('img').attr('src','images/D-score-num0.png');
					scoreCount=0;
				});
			});*/
							
			$('.m-box3-count').on('webkitAnimationEnd',function (){
				$('.m-box3-1').animate({'opacity':0},function (){
					$('.m-box3-1').hide().removeClass('z-on ndis').css('opacity',1);
					//setTimeout(go,2000);
					if(bBoy){
						go();
					}else{
						setTimeout(go,3000);
					}
				});
			});
		}
	}
});                                   
