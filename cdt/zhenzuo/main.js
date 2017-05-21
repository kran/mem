/**
 * @module 七一振作游戏
 */
define(function(require, exports, module){
	//引用相关模块
	var $ 			= require('lib/zepto/zepto'),
		$ 			= require('lib/zepto/touch'),
		loadPage 	= require('modules/imgsrc/main');
	/**
	 * 
	 * @class 执行页面
	 * @static
	 * @requires $(zepto)
	 */
	module.exports = {
		/**
		 * @method init 初始化
		 */
		init: function(){
			this.gameTimeBox 		= $('.J-game-time');
			this.figurePos 			= $('.J-pos');//人框
			this.sdPos 				= $('.J-sd-pos');//人物简图框
			this.collisionBox		= $('.J-collision');//人物事件触发框
			this.music 				= $('.J-audio')[0];
			/**
			 * 物品类别 c:class名,t物品类别（1:加物品，2:减生命物品，3:空物品）
			 * @property articlePosArr
			 * @type {Array}
			 * @final
			*/
			this.articleTypeArr 	= [];
			/**
			 * 游戏背景数组（className）
			 * @property gameBgArr
			 * @type {Array}
			 * @final
			*/
			this.gameBgArr 			= [
				'c-bg-1',
				'c-bg-2',
				'c-bg-3',
				'c-bg-4',
				'c-bg-5'
			];
			/**
			 * 游戏难度基础配制参数
			 * @property gameBgArr
			 * @type {object}
			 * @final
			*/
			this.gameConfig= {
				config1: [
					{d : 1, t: 7.6, a:false},
					{d : 2, t: 7.2, a:false},
					{d : 3, t: 6.8, a:false},
					{d : 4, t: 6.4, a:false},
					{d : 5, t: 6, a:false},
					{d : 6, t: 5.6, a:false},
					{d : 7, t: 5.2, a:false},
					{d : 8, t: 4.8, a:false},
					{d : 9, t: 4.4, a:false},
					{d : 10, t: 4, a:false}
				],
				config2: [
					{d : 2, t: 7.6, a:true},
					{d : 3, t: 7.2, a:true},
					{d : 4, t: 6.8, a:true},
					{d : 5, t: 6.4, a:true},
					{d : 6, t: 6, a:true},
					{d : 7, t: 5.6, a:true},
					{d : 8, t: 5.2, a:true},
					{d : 9, t: 4.8, a:true},
					{d : 10, t: 4.4, a:true},
					{d : 11, t: 4, a:true}
				],
				config3: [
					{d : 3, t: 10.6, a:false},
					{d : 4, t: 10, a:false},
					{d : 5, t: 9.4, a:false},
					{d : 6, t: 8.8, a:false},
					{d : 7, t: 8.2, a:false},
					{d : 8, t: 7.6, a:false},
					{d : 9, t: 7, a:false},
					{d : 10, t: 6.4, a:false},
					{d : 11, t: 5.8, a:false},
					{d : 12, t: 5.2, a:false}
				],
				config4: [
					{d : 4, t: 10.6, a:true},
					{d : 5, t: 10, a:true},
					{d : 6, t: 9.4, a:true},
					{d : 7, t: 8.8, a:true},
					{d : 8, t: 8.2, a:true},
					{d : 9, t: 7.6, a:true},
					{d : 10, t: 7, a:true},
					{d : 11, t: 6.4, a:true},
					{d : 12, t: 5.8, a:true},
					{d : 13, t: 5.2, a:true}
				]
			};

			/**
			 * 游戏人物数组（classN，不完整，需要在后边加数字;type人物的属性）
			 * @property gameFigureArr
			 * @type {Array}
			 * @final
			*/
			this.gameFigureArr 			= [
				{'classN': 'c-women', 'type': 2},
				{'classN': 'c-soldier', 'type': 5},
				{'classN': 'c-farmer', 'type': 1},
				{'classN': 'c-gril', 'type': 3},
				{'classN': 'c-worker', 'type': 4}
			];
			/**
			 * 人物简图数组
			 * @property schematicDiagramArr
			 * @type {Array}
			 * @final
			*/
			this.schematicDiagramArr 	= [
				'c-sd-pic1',
				'c-sd-pic2',
				'c-sd-pic3',
				'c-sd-pic4',
				'c-sd-pic5',
				'c-sd-pic6',
				'c-sd-pic7',
				'c-sd-pic8',
				'c-sd-pic9',
				'c-sd-pic10',
			];
			/**
			 * 游戏中人物出现的位置（dom）
			 * @property gamePosArr
			 * @type {Array}
			 * @final
			*/
			this.gamePosArr 			= [
				$('.J-pos1'),
				$('.J-pos2'),
				$('.J-pos3'),
				$('.J-pos4'),
				$('.J-pos5')
			],
			/**
			 * 游戏当前关卡
			 * @property currentLevel 
			 * @type {number}
			 * @default  0
			 */
			this.currentLevel 		= 0;
			/**
			 * 游戏当前难度
			 * @property currentDifficult 
			 * @type {number}
			 * @default  0
			 */
			this.currentDifficult 	= 0;
			/**
			 * 游戏开始倒计时
			 * @property countdownNum 
			 * @type {number}
			 * @default  0
			 */
			this.countdownNum 		= 0;
			/**
			 * 游戏当前配置
			 * @property currentConfigArr 
			 * @type {Array}
			 * @default  []
			 */
			this.currentConfigArr 	= [];
			/**
			 * 游戏规则定时器
			 * @property guideTime 
			 * @default  null
			 */
			this.guideTime 			= null;
			/**
			 * 游戏当前关卡定时器
			 * @property currentLevelTime 
			 * @default  null
			 */
			this.currentLevelTime 	= null;
			/**
			 * 当前关卡时间
			 * @property currentLevelTime 
			 * @type {number}
			 * @default  0
			 */
			this.currentTime 		= 0;
			/**
			 * 游戏开关
			 * @property gameSwitch 
			 * @type {Boolean}
			 * @default  true
			 */
			this.gameSwitch 		= true;
			/**
			 * 游戏当前选择的人物
			 * @property gameSwitch 
			 * @type {string}
			 * @default  true
			 */
			this.currentSelected 	= '';//选择人物
			this.currentAction 		= '';//选择物品
			this.currentGameBg 		= '';//游戏背景
			this.currentArticle 	= '';//当前选择的物品
			this.setScreenSwitch();//判断横竖屏
			loadPage.setLoadingPage();
			this.events();
			
		},
		/**
		 * 事件
		 *  @method events
		 */
		events : function(){
			var self = this;
			/**
			 * @event 监听横竖屏切换
			 */
			window.addEventListener('orientationchange',self.setScreenSwitch,false);
			/**
			 * @event 开始游戏
			 */
			$('.J-begin-btn').on('tap', function(){
				self.music.play();
				$('.J-guide').show();
				$('.J-start-page').hide();
				/*self.guideTime = setTimeout(function(){
					$('.J-guide-btn').hide();
					
				}, 9000);*/
				self.setGuidePage();
			});
			$('.J-start-btn2').on('tap', function(){
				$('.J-start-page').hide();
				$('.J-game-page').show();
				$('.J-countdown-page').show();
				//self.setGameStart();
				self.replaceGameBg();
				$('.J-guide').animate({opacity:0}, function(){							
					self.setCountdownPage();
					$('.J-start-page').hide();
				});
			});
			/**
			 * @event 跳运说明页面
			 */
			$('.J-guide-btn').on('tap',function(){
				clearTimeout(self.guideTime);
				$('.J-start-page').hide();
				$('.J-game-page').show();
				$('.J-countdown-page').show();
				//self.setGameStart();
				self.replaceGameBg();
				$('.J-guide').animate({opacity:0}, function(){
					
					$('.J-guide').hide();
					self.setCountdownPage();
					//$(this).hide();

				});
				
				//self.setGameStart();//设置游戏开始
			});
			$('.J-select-box span').on('tap', function(){
				self.currentSelected = $(this).attr('data-type');
				$(this).addClass('z-on').siblings().removeClass('z-on');
			});
			/**
			 * @event人物事件
			 */
			self.collisionBox.on('tap', function(){
				var n = $(this).attr('data-type');
				if(n == self.currentSelected){
					self.currentAction = $(this).attr('data-num');
					//设置游戏人物简影
					self.setFigureDiagram($(this).attr('data-num'), $(this).index());
				}
			});
			/**
			 * @event简图事件
			 */
			self.sdPos.find('span').on('tap', function(){
				if($(this).attr('data-n') == self.currentAction){
					self.figurePos.each(function(i){
						if($(this).attr('data-type') == self.currentSelected){
							$(this).addClass('z-on');
							self.collisionBox.eq(i).hide();
							self.sdPos.hide();
							if($('.J-pos.z-on').length >= 5){
								$('.J-select-box span').removeClass('z-on');
								
								if(self.figurePos.find('em.z-on').length <5){
									$('.J-article-box').show();
									self.figurePos.find('dfn').show();
								}else{
									
									//人物完成，查看物品
									self.gameSwitch = false;
									clearTimeout(self.currentLevelTime);
									$('.J-clearance').show();
									
								}
							}
						}
					});
				}
			});
			/**
			 * @event 音乐开关
			 */
			$('.J-music-btn').on('tap', function(){
				if($(this).hasClass('z-on')){
					$(this).removeClass('z-on');
					self.music.play();
				}else{
					$(this).addClass('z-on');
					self.music.pause();
				}
			});
			/**
			 * @event 开始暂停
			 */
			$('.J-start-btn').on('tap', function(){
				if($(this).hasClass('z-on')){
					$(this).removeClass('z-on');
					self.gameSwitch = true;
					self.setCurrentLevelTime();
					$('.J-time-out').removeClass('z-on');
				}else{//暂停
					$(this).addClass('z-on');
					self.gameSwitch = false;
					clearTimeout(self.currentLevelTime);
					$('.J-time-out').addClass('z-on');
				}
			});
			$('.J-time-out a').on('tap', function(){
				$('.J-start-btn').removeClass('z-on');
					self.gameSwitch = true;
					self.setCurrentLevelTime();
					$('.J-time-out').removeClass('z-on');
			});
			/**
			 * @event 关闭分享
			 */
			$('.J-share-page').on('tap', function(){
				$(this).hide();
			});
			/**
			 * @event 再玩一次
			 */
			$('.J-again-btn').on('tap', function(){
				$('.J-end-page').hide();
				$('.J-countdown-page').show();
				$('.J-level-box').html('');
				self.setCountdownPage();
				//self.setRestartGame();
			});
			/**
			 * @event 分享按钮
			 */
			$('.J-share-btn').on('tap', function(){				
				$('.J-share-page').show();
			});
			$('.J-clearance-btn').on('tap', function(){
				self.setGameStart();
				$('.J-clearance').hide();
			});
			self.figurePos.find('dfn').on('tap', function(){
				if($(this).attr('data-type') == self.currentArticle){
					$(this).parents('.J-pos').find('em').addClass('z-on');
					if(self.figurePos.find('em.z-on').length >= 5){
						$('.J-clearance').show();
						self.gameSwitch = false;
						clearTimeout(self.currentLevelTime);
					}
				}
			});
			$('.J-article-box span').on('tap', function(){
				$(this).addClass('z-on').siblings().removeClass('z-on');
				self.currentArticle = $(this).attr('data-type');
			});
		}, 
		

		
		setGuidePage : function(){
			var self = this,
				guidePage = $('.J-guide-page'),
				times = null,
				jumpOver = $('.J-jump-over');
			jumpOver.on('tap', function(ev){
				ev.stopPropagation();
				clearTimeout(times);
				$('.J-start-page').hide();
				$('.J-game-page').show();
				$('.J-countdown-page').show();
				//self.setGameStart();
				self.replaceGameBg();
				$('.J-guide').animate({opacity:0}, 400 , '', function(){							
					self.setCountdownPage();
					$('.J-start-page').hide();
				});
			});
			times = setTimeout(function(){
				guidePage.eq(0).on('touchstart', function(){
					guidePage.eq(1).show();
					$(this).animate({opacity:0}, 400, function(){
						$(this).hide();
						page2();
					});
				});
			}, 3000);
			function page2(){
				times = setTimeout(function(){
					guidePage.eq(1).on('touchstart', function(){
						guidePage.eq(2).show();
						$(this).animate({opacity:0}, 400, function(){
							$(this).hide();
							page3();
						});
					});
				}, 3000);
			}
			function page3(){
				times = setTimeout(function(){
					guidePage.eq(2).on('touchstart', function(){
						guidePage.eq(3).show();
						$(this).animate({opacity:0}, 400, function(){
							$(this).hide();
							page4();
						});
					});
				}, 3000);
			}
			function page4(){
				times = setTimeout(function(){
					guidePage.eq(3).on('touchstart', function(){
						guidePage.eq(4).show();
						$(this).animate({opacity:0}, 400, function(){
							$(this).hide();
						});
					});
				}, 3000);
			}
		},
		/**
		 * 设置倒计时
		 * @method setGameTimeOut 
		 */
		setCountdownPage : function(){
			var self = this,
				aCountdownPage= $('.J-countdown-page'),
				aSpan = aCountdownPage.find('span');
			this.figurePos.hide();
			this.sdPos.hide();
			aSpan.removeClass('z-on').eq(self.countdownNum).addClass('z-on');
			if(self.countdownNum > 3){
				self.setRestartGame();
				self.figurePos.show();
				self.countdownNum = 0;
				aCountdownPage.hide();
				return;
			}
			setTimeout(function(){
				self.countdownNum ++;
				self.setCountdownPage();
			}, 1000);
		},		/**
		 * 设置游戏人物简影
		 * @method setFigureDiagram 
		 * @param  {number} num 当前动作编号
		 * @param  {number} index 当前索引
		 */
		setFigureDiagram : function(num, index){
			var self = this,
				diagramArr = [
					{c: 'c-sd-pic1', n: 1},
					{c: 'c-sd-pic2', n: 2},
					{c: 'c-sd-pic3', n: 3},
					{c: 'c-sd-pic4', n: 4},
					{c: 'c-sd-pic5', n: 5},
					{c: 'c-sd-pic6', n: 6},
					{c: 'c-sd-pic7', n: 7},
					{c: 'c-sd-pic8', n: 8},
					{c: 'c-sd-pic9', n: 9},
					{c: 'c-sd-pic10', n: 10}				
				],
				diagramPosArr = [
					'c-sd-pos1',
					'c-sd-pos2',
					'c-sd-pos3',
					'c-sd-pos4',
					'c-sd-pos5',
					'c-sd-pos6',
				],
				newArr = [],
				aSpan = self.sdPos.find('span');
				newArr = diagramArr.slice(num-1, num);//获取当前动作
				diagramArr.splice(num-1, 1);//删除当前动作
				diagramArr.sort(self.randomsort);//打乱数组
				diagramArr = diagramArr.slice(3, 8);
				newArr = newArr.concat(diagramArr);//数组连接
				newArr.sort(self.randomsort);//打乱数组
			aSpan.each(function(i){
				$(this).attr(newArr[i].n).attr({'class': diagramPosArr[i] +' '+ newArr[i].c, 'data-n': newArr[i].n});
			});
			self.sdPos.attr('class', 'c-sd-box J-sd-pos').addClass('z-pos' + (index + 1)).show();
		},
		/**
		 * 设置游戏人物随机
		 * @method setFigureRandom 
		 */
		setFigureRandom : function(){
			var self = this;
			self.gameFigureArr = self.gameFigureArr.sort(self.randomsort);//随机一个新数组
		},
		/**
		 * 设置游戏开始
		 * @method setGameStart 
		 */
		setGameStart : function(){
			var self 	= this,
				num 	= self.returnRandomNum(self.gameBgArr.length);
			self.replaceGameBg();//更换游戏背景
			$('.J-start-btn').removeClass('z-on');
			$('.J-select-box span').removeClass('z-on');
			self.gameSwitch = true;
			self.collisionBox.show();//人物事件触发框
			self.setFigureRandom();
			$('.J-article-box').hide().find('span').removeClass('z-on');
			self.figurePos.find('dfn').hide();
			self.currentArticle 	= '';
			self.currentSelected 	= '';
			self.setCurrentLevel();//设置游戏关卡
		},
		/**
		 * 更换游戏背景
		 * @method replaceGameBg 
		 */
		replaceGameBg : function(){
			var self = this,
				gamePage = $('.J-game-page'),
				bgClass = self.gameBgArr[self.returnRandomNum(self.gameBgArr.length)];
			$('.J-game-page').removeClass(self.currentGameBg).addClass(bgClass);
			self.currentGameBg = bgClass;
		},
		/**
		 * 设置游戏关卡
		 * @method setGameStart 
		 */
		setCurrentLevel : function(){
			var self = this;
			self.currentLevel++;//关卡累加
			
			this.currentDifficult 	= self.currentLevel.toString();//难度
			this.currentConfigArr 	= [];
			this.currentTime 		= 0;
			self.setCurrentLevelNum();//设置游戏当前关卡数字
			self.setLevelConfiguration(true);//设置游戏关卡配置
		},
		

		//设置分享文案
		getShare :function(shareParam){
			//	分享
			wx.onMenuShareTimeline({
				title: shareParam.title, 
				link: shareParam.link, // 分享链接
				imgUrl: shareParam.img, // 分享图标
				success: function () { 
					// 用户确认分享后执行的回调函数
	                $.get('?r=home/ajaxCountShareTimeline',function(){
	                });
					
				},
				cancel: function () { 
					// 用户取消分享后执行的回调函数
				}
			});
			wx.onMenuShareAppMessage({
				title: shareParam.title, // 分享标题
				desc: shareParam.con, // 分享描述
				link: shareParam.link, // 分享链接
				imgUrl: shareParam.img, // 分享图标
				type: '', // 分享类型,music、video或link，不填默认为link
				dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
				success: function () { 
					// 用户确认分享后执行的回调函数
	                $.get('?r=home/ajaxCountShareAppMessage',function(){
	                });
				},
				cancel: function () { 
					// 用户取消分享后执行的回调函数
				}
			});

		},		
        //置换%s为数字。
		 replaceScore : function(string, score){
           var newstr=string.replace("%s",score);               
           string=newstr.replace("%s",score);   
           return string;
       },
		
		
		
		/**
		 * 设置游戏关卡配置
		 * @method setLevelConfiguration 
		 * @param  {string} initial 是否是第一个人
		 */
		setLevelConfiguration : function(initial){
			var self 	= this,
				num 	= 0;
				oType 	= Math.random()>.5 ? -1 : 1;

			if(initial){
				if(self.currentDifficult < 3){
					self.currentConfigArr.push(self.gameConfig.config1[self.currentDifficult-1]);
					self.setGameScene();
					return;
				}else if(oType < 0){
					if(self.currentDifficult >= 10){
						num = self.returnRandomNum(10);
					}else{
						num = self.returnRandomNum(self.currentDifficult);
					}
					self.currentConfigArr.push(self.gameConfig.config1[num]);
					self.currentDifficult = self.currentDifficult - num - 1;
				}else{
					if(self.currentDifficult >= 12){
						num = self.returnRandomNum(10);
					}else{
						num = self.returnRandomNum(self.currentDifficult - 2);
					}
					self.currentConfigArr.push(self.gameConfig.config3[num]);
					self.currentDifficult = self.currentDifficult - num - 3;
				}
			}else{
				if(self.currentDifficult == 1){//剩于难度1
					self.currentConfigArr.push(self.gameConfig.config1[0]);
					self.setGameScene();
					return;
				}else if(self.currentDifficult < 4){//剩于难度小于4
					self.currentConfigArr.push(self.gameConfig.config2[self.currentDifficult - 2]);
					self.setGameScene();
					return;
				}else if(oType < 0){
					if(self.currentDifficult >= 11){
						num = self.returnRandomNum(10);
					}else{
						num = self.returnRandomNum(self.currentDifficult - 1);
					}
					self.currentConfigArr.push(self.gameConfig.config2[num]);
					self.currentDifficult = self.currentDifficult - num - 2;
				}else{
					if(self.currentDifficult >= 13){
						num = self.returnRandomNum(10);
					}else{
						num = self.returnRandomNum(self.currentDifficult - 3);
					}
					self.currentConfigArr.push(self.gameConfig.config4[num]);
					self.currentDifficult = self.currentDifficult - num - 4;
				}
			}
			if(self.currentConfigArr.length >= 5 || self.currentDifficult == 0){
				self.setGameScene();//设置场景
			}else{
				self.setLevelConfiguration();
			}
			
		},
		/**
		 * 设置游戏场景
		 * @method setGameScene 
		 */
		setGameScene : function(){
			var self 	= this,
				num 	= 0,
				timePrompt = $('.J-time-prompt')
			$('.J-game-box').hide();//20150629
			$(self.currentConfigArr).each(function(){
				self.currentTime += this.t;
			});
			self.currentTime = self.currentTime.toFixed(1);//设置当前关卡时间
			self.gameTimeBox.html(self.currentTime + 's');//设置时间
			//设置提示时间
			timePrompt.html(self.currentTime)
			//设置场景
			$(self.gamePosArr).each(function(i){
				var _this = this;
				this.attr('class', 'c-pos'+(i+1)+' J-pos'+(i+1) + ' J-pos');
				if(i > self.currentConfigArr.length - 1){
					this.addClass('z-on').find('em').addClass('z-on');
				}else{
						num = self.currentConfigArr[i].a ?
							(self.returnRandomNum(5) + 6) :
							(self.returnRandomNum(5) + 1) ;
					
						_this.find('dfn').attr('data-type', num -5);
						_this.addClass(self.gameFigureArr[i].classN + num)
							.attr({'data-type': self.gameFigureArr[i].type, 'data-num': num})
							.find('em').removeClass('z-on');
							if(num <= 5){_this.find('em').addClass('z-on');}
					self.collisionBox.eq(i).attr({'data-type': self.gameFigureArr[i].type, 'data-num': num})
				}
			});
			timePrompt.show();
			setTimeout(function(){
				$('.J-game-box').show();//20150629
				timePrompt.hide();
				self.setCurrentLevelTime();
			}, 1500);
		},
		/**
		 * 设置当前关卡时间
		 * @method setCurrentLevelTime 
		 */
		setCurrentLevelTime : function(){
			var self = this;
			self.currentTime = (self.currentTime - 0.1).toFixed(1);
			self.gameTimeBox.html(self.currentTime + 's');//设置时间
			if(self.currentTime <= 0){
				clearTimeout(self.currentLevelTime);
				self.gameSwitch = false;
								
				//更新game_log表，更新用户游戏关卡
				var getLastLevel = self.currentLevel - 1;
				$.post("?r=home/ajaxUpdateScore",
						{level : getLastLevel},
						function(data){					
							//console.log('分数:');
							//console.log(getLevel);
						});	
				//设置游戏结束
				$('.J-end-page').show();

			}
			
			self.currentLevelTime = setTimeout(function(){
				if(self.gameSwitch){
					self.setCurrentLevelTime();
				}
			}, 100);
		},
		
//		//设置分享文案
//		getShare :function(shareParam){
//			//	分享
//			wx.onMenuShareTimeline({
//				title: shareParam.title, 
//				link: shareParam.link, // 分享链接
//				imgUrl: shareParam.img, // 分享图标
//				success: function () { 
//					// 用户确认分享后执行的回调函数
//	                $.get('?r=home/ajaxCountShareTimeline',function(){
//	                });
//					
//				},
//				cancel: function () { 
//					// 用户取消分享后执行的回调函数
//				}
//			});
//			wx.onMenuShareAppMessage({
//				title: shareParam.title, // 分享标题
//				desc: shareParam.con, // 分享描述
//				link: shareParam.link, // 分享链接
//				imgUrl: shareParam.img, // 分享图标
//				type: '', // 分享类型,music、video或link，不填默认为link
//				dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
//				success: function () { 
//					// 用户确认分享后执行的回调函数
//	                $.get('?r=home/ajaxCountShareAppMessage',function(){
//	                });
//				},
//				cancel: function () { 
//					// 用户取消分享后执行的回调函数
//				}
//			});
//
//		},		
//        //置换%s为数字。
//		 replaceScore : function(string, score){
//           var newstr=string.replace("%s",score);               
//           string=newstr.replace("%s",score);   
//           return string;
//       },
		
		/**
		 * 设置游戏当前关卡数字
		 * @method setCurrentLevelNum 
		 */
		setCurrentLevelNum : function(){
			var self = this,
				strNum = self.currentLevel.toString().split(''),
				str = '';
			for(var i = 0; i < strNum.length; i++){
				str += '<em class="num'+strNum[i]+'"></em>';
			}
			$('.J-level-box').html(str);
		},
		/**
		 * 设置游戏重新开始
		 * @method setRestartGame 
		 */
		setRestartGame : function(){
			var self = this;
			this.currentLevel = 0;//关卡
			this.currentSelected 	= '';
			this.currentAction 		= '';
			this.currentGameBg 		= '';//游戏背景
			this.currentArticle 	= '';//当前选择的物品
			$('.J-select-box span').removeClass('z-on');
			$('.J-article-box').hide().find('span').removeClass('z-on');
			$('.J-end-page').hide();
			this.sdPos.hide();
			this.setGameStart();
		},
		/**
		 * 返回数据中的随机数
		 * @method returnRandomNum 
		 * @param  {number} n 需要返回随机数的数值
		 * @return {string|object}     数据中的随机数
		 */
		returnRandomNum : function(n){
			return Math.floor(Math.random() * n + 1)-1;	
		},

		randomsort : function (a, b) {  
	        return Math.random()>.5 ? -1 : 1;  
			//用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1  
		},
		/**
		 * 判断横竖屏切换
		 * @method setScreenSwitch 
		 */
		setScreenSwitch : function(){
		    var self 				= this,
		    	orientation 		= window.orientation,
		    	aScreen 			= $('.J-screen');
            switch(orientation){
                case 90:
                case -90:
                    aScreen.show();
                    clearTimeout(self.currentLevelTime);
                    self.gameSwitch = false;
                    $('.J-start-btn').addClass('z-on');
                    break;
                default:
                    aScreen.hide();
                    break;
            }
		}
	}
});
