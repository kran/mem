	
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
			this.loading();//加载
			this.startUse();//过度
			this.timeMachine();//时光机
			
			
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
							//numStr += '<img src="images/'+num[j]+'.png" />';
							numStr += '<img src="'+STATIC_URL+'images/'+num[j]+'.png" />';
						}
						numStr += '<img src="'+STATIC_URL+'images/000.png" />';
						//console.log(numStr)
						$('.J-num').html(numStr);
						//console.log(num);
						if(n>= 100){
							$('.J-loading').addClass('z-on1');
							$('.J-loading').hide();
							$('.J-box1').show();
							$('.J-box1').addClass('z-on');
						}
					};
					oImg.src =STATIC_URL+ aImg.src[i];
				})(i);
			}

		},
		startUse : function (){
			var self 		= this,
				oPenBtn 	= $('.J-open-btn'),
				oHome		= $('.J-box1'),
				oScene		= $('.J-box2'),
				oTime		= $('.J-box3'),
				aSce		= $('.J-scene'),
				aNarrow		= $('.J-narrow'),
				iNow		= 0,
				off			= false,
				_time1  	= null;
			//console.log(aSce.length)
			//首页淡出
			oPenBtn.on('tap', function(){
				oHome.addClass('z-on-1');
				oScene.addClass('z-on');
				
				var _time1 = setTimeout(function(){
				    self.tree(aNarrow.eq(iNow));//雪花
				}, 9000);

			});
			
			aNarrow.on('webkitAnimationEnd', function(){
				oHome.hide();
			});

			oScene.on('webkitAnimationEnd', function(){
				aNarrow.eq(0).addClass('z-on');
			});


			//console.log(aSce.length)
			//上滑动
			oScene.on('swipeUp', function(){
				aClass();
				if(!off){
					off = true;
					iNow++;
					if( iNow >= aSce.length ){
						iNow = aSce.length - 1;
						oScene.hide();
						oTime.show();
						oTime.addClass('z-on');
					}
					aNarrow.eq(iNow-1).addClass('z-on-1');
					
					
					aSce.eq(iNow).animate({"-webkit-transform":"translateY(0%)"}, 1000, 'ease', function(){
						aNarrow.eq(iNow).addClass('z-on');
						self.tree(aNarrow.eq(iNow));//雪花
						aNarrow.eq(iNow-1).css({"opacity":0});
						off = false;
					});
				}
				

			});
			//下滑动
			oScene.on('swipeDown', function(){
				$('.J-tree').html('');
				aClass();
				if(!off){
					off = true;
					iNow--;
					if( iNow < 0 ){
						iNow = 0;
						aNarrow.eq(0).addClass('z-on-1');
						aNarrow.eq(0).addClass('z-on-2');
					}
					aNarrow.eq(iNow).css({"opacity":1});
					aNarrow.eq(iNow).addClass('z-on-2');
					aSce.eq(iNow+1).animate({"-webkit-transform":"translateY(100%)"}, 1000, 'ease', function(){
						aNarrow.eq(iNow).addClass('z-on');
						off = false;
					});
				}
				
			});

			function aClass (){
				//aNarrow.removeClass('z-on');
				aNarrow.removeClass('z-on-1');			
				aNarrow.removeClass('z-on-2');
			};	
		},
		timeMachine : function (){
			var self 		= this,
				oTime		= $('.J-box3'),
				aStar		= $('.J-btn-1');
			oTime.on('swipeDown', function(){
				$(this).addClass('z-on-1');
				$('.J-prompt').hide();
				$('.J-btn-box').show();
			});
			//对应场景
			//console.log(aStar.length)
			aStar.each(function(i){
				$(this).on('tap', function(){
					$('.J-pop').show();
					$('.J-pop').addClass('z-on');
					$('.J-pop').css({'opacity':1});
					$('.J-po').eq(i).show();

                    if(typeof doShare == 'function'){doShare()};
					//console.log(i);
				})		
			})		
			//截图隐藏
			$('.J-btn-show').on('tap', function(){
				$('.J-btn-box').addClass('z-on-1');
				
			});
			$('.J-btn-show').on('webkitAnimationEnd', function(){
				$('.J-btn-box').removeClass('z-on-1');
			});		
			//返回重新选择
			$('.J-again').on('tap', function(){

				$('.J-pop').animate({'opacity':'0'}, 2000, 'ease', function(){
					$('.J-pop').hide();
					$('.J-po').hide();
				})
			});
			//分享弹窗
			$('.J-enjoy').on('tap', function(){
                if(typeof doShare == 'function'){doShare()}
				$('.J-p-e').show();
			});
			$('.J-p-e').on('tap', function(){
				$(this).hide();
			})
			//音频
			$('body').one('touchstart', function(){
			    $('.J-music')[0].play();
			});
			
		},
		tree : function (ele){
			// console.log(ele.parent().index())
			var aImgIndex = ele.parent().index() + 1;
			//console.log(aImgIndex)
			var NUMBER_OF_LEAVES = 30;
			function init(){
			    var container = ele.find('.J-tree')[0];
			    for (var i = 0; i < NUMBER_OF_LEAVES; i++) {
			        container.appendChild(createALeaf());
			    }
			}
			function randomInteger(low, high){
			    return low + Math.floor(Math.random() * (high - low));
			}
			function randomFloat(low, high){
			    return low + Math.random() * (high - low);
			}
			function pixelValue(value){
			    return value + 'px';
			}
			function durationValue(value){
			    return value + 's';
			}
			function createALeaf(){
			    var leafDiv = document.createElement('div');
			    var image = document.createElement('img');
			    image.src = STATIC_URL+ 'images/D-po-' + aImgIndex  + '.png';
			    leafDiv.style.top = "-100px";
			    leafDiv.style.left = pixelValue(randomInteger(0, 640));
			    var spinAnimationName = (Math.random() < 0.5) ? 'clockwiseSpin' : 'counterclockwiseSpinAndFlip';
			    leafDiv.style.webkitAnimationName = 'fade, drop';
			    image.style.webkitAnimationName = spinAnimationName;
			    var fadeAndDropDuration = durationValue(randomFloat(11, 16));
			    var spinDuration = durationValue(randomFloat(4, 8));
			    leafDiv.style.webkitAnimationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration;
			    var leafDelay = durationValue(randomFloat(0, 5));
			    leafDiv.style.webkitAnimationDelay = leafDelay + ', ' + leafDelay;
			    
			    image.style.webkitAnimationDuration = spinDuration;

			    leafDiv.style.webkitAnimationIterationCount = 'infinite';
			    image.style.webkitAnimationIterationCount = 'infinite';
			    leafDiv.appendChild(image);
			    return leafDiv;
			}
			init();
		}
	}
});                                   