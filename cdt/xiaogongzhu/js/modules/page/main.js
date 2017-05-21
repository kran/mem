
define(function(require, exports, module){
	//引用相关模块
	var $ 			= require('lib/zepto/zepto'),
		$ 			= require('lib/zepto/touch'),
		aImg		= require('modules/imgsrc/main'),
		loaded		= 0,
		i 			= 0,
		stopanimation=true,
		round=0,
		intertime=null,//游戏总定时器
		outTime=null,//游戏小定时器
		innerTime=null,//游戏清除定时器
		tollgaten=1,//关数
		click=false,//选择开关
		animation=false,
		scoren=parseInt($(".J-page-game").attr("data-score")),//每关分数
		oDiv=$(".J-game-box"),
		stop=false,
		htmldefault=[oDiv.eq(0).html(),oDiv.eq(1).html(),oDiv.eq(2).html(),oDiv.eq(3).html()],
		len 		= aImg.src.length;//图片个数
		//console.log(htmldefault)
	//对外提供接口
	module.exports = {
		//初始化
		init : function () {
			this.loading();
			this.gameStart();
			this.boxchange();
			this.again();
			this.share();
			this.stop();
		},
		gameStart:function(){
			var self=this;
			$(".J-page-index").tap(function(){
				$(this).animate({opacity:0}, 400, 'ease', function (){
					$(this).remove();
					$(".J-audio")[0].play();
					$(".J-page-game").addClass("m-game-animate");
					self.boxmove(tollgaten);
				});
			});
			$("body").on("tap",".J-music-btn",function(){
				if (!$(this).hasClass("m-music-stop")){
					$(".J-audio")[0].pause();
					$(this).addClass("m-music-stop");
				}else{
					$(".J-audio")[0].play();
					$(this).removeClass("m-music-stop");
				}

			})
		},
		boxmove:function(m){
			var self=this,
				  speed=[700,600],
				  speedi=0,
				  n=m;
			if (n==1){
				if (stop){
					$(".J-page-game").removeClass("m-game-animate");
					self.twobox(900,self.random(5,3));
				}else{
					$(".J-game-boxbag").off().on("webkitAnimationEnd",function(){
						if ($(".J-page-game").hasClass("m-game-animate")){
							self.twobox(900,self.random(5,3));
						}
						$(".J-page-game").removeClass("m-game-animate");
					});
				}
			}else if (n<=2){
				self.twobox(900,self.random(5,3));
			}else if (n>2&&n<=5){
				self.twobox(speed[speedi],self.random(5,3));
			}else if (n==6){
				$(".J-game-mid").addClass("m-mid-thanimate");
				setTimeout(function(){
					$(".J-game-mid").addClass("m-game-threebox");
				},500)
				$(".J-game-boxbag").off().on("webkitAnimationEnd",function(){
					if ($(".J-game-mid").hasClass("m-mid-thanimate")){
						speedi==speedi==0?1:0;
						self.threeBox(speed[speedi],self.random(4,3),1400);
					}
					$(".J-game-mid").removeClass("m-mid-thanimate");
				});
			}else if (n>6&&n<=10){
				speedi==speedi==0?1:0;
				self.threeBox(speed[speedi],self.random(4,3),1400);
			}else if (n==11){
				$(".J-game-mid").addClass("m-mid-fanimate");
				setTimeout(function(){
					$(".J-game-mid").addClass("m-game-fourbox");
				},500)
				$(".J-game-boxbag").off().on("webkitAnimationEnd",function(){
					if ($(".J-game-mid").hasClass("m-mid-fanimate")){
						speedi==speedi==0?1:0;
						self.fourBox(speed[speedi],self.random(4,3),2400);
					}
					$(".J-game-mid").removeClass("m-mid-fanimate").addClass("m-game-fourbox");
				});
			}else if (n>11&&n<=15){
					self.fourBox(speed[speedi],self.random(4,3),2400);
			}else if (n==16){
				var i=$(".J-game-box").index($(".J-game-people").parents(".J-game-box"));
				if (i==$(".J-game-box").length-1){
					var last=$(".J-game-box").eq(3).html(),prev=$(".J-game-box").eq(2).html();
					$(".J-game-box").eq(2).html(last);
					$(".J-game-box").eq(3).html(prev);
				}
				$(".J-game-mid").addClass("m-mid-fthanimate");
				setTimeout(function(){
					$(".J-game-mid").addClass("m-game-threebox");
				},500)
				$(".J-game-boxbag").off().on("webkitAnimationEnd",function(){
					if ($(".J-game-mid").hasClass("m-mid-fthanimate")){
						self.threeBox(speed[1],self.random(5,3),1400);
					}
					$(".J-game-mid").removeClass("m-mid-fthanimate").removeClass("m-game-fourbox");
				});
			}else if (n>16&&n<=20){
						self.threeBox(speed[1],self.random(5,3),1400);
			}else if (n==21){
				$(".J-game-mid").addClass("m-mid-fanimate");
				
				setTimeout(function(){
					$(".J-game-mid").addClass("m-game-fourbox");
				},500)
				$(".J-game-boxbag").off().on("webkitAnimationEnd",function(){
					if ($(".J-game-mid").hasClass("m-mid-fanimate")){
						speedi==speedi==0?1:0;
						self.fourBox(speed[speedi],self.random(5,3),2400);
					}
					$(".J-game-mid").removeClass("m-mid-fanimate");
				});
			}else if (n>21&&n<=25){
				self.fourBox(speed[1],4,2400);
			}else if (n>25&&n<=30){
				self.fourBox(speed[1],5,2400);
			}else{
				self.fourBox(300,6,1200);
			}
		},
		loading : function (){
			var self = this;
			for(;i<len;i++){
				(function (i){
					var oImg = new Image();
					oImg.onload=oImg.onerror = function(){
						loaded++;
						var per = loaded/len,
							  n=(parseInt((per.toFixed(2) * 100)));
						if(n>= 100){
							setTimeout(function(){
								$('.J-load').animate({opacity:0}, 400, 'ease', function (){
									$(this).remove();
								});
							},2000);
						}
					};
					oImg.src = aImg.src[i];
				})(i);
			}

            var qlen = qImg.length;
            for(;i<qlen;i++){
                (function (i){
                    var oImg = new Image();
                    oImg.onload=oImg.onerror = function(){
                        loaded++;
                        var per = loaded/qlen,
                            n=(parseInt((per.toFixed(2) * 100)));
                        if(n>= 100){
                            setTimeout(function(){
                                $('.J-load').animate({opacity:0}, 400, 'ease', function (){
                                    $(this).remove();
                                });
                            },2000);
                        }
                    };
                    oImg.src = qImg[i];
                })(i);
            }
		},
		twobox:function(t1,n){
			var self=this,
				  arr=[['tl','tlmts','tlmtb','tlmbs','tlmbb','tlrs','tlrb'],['tr','trmts','trmtb','trmbs','trmbb','trrs','trrb']],
				  arrn=null,arri=0,
				  oBox=$(".J-game-mbox");
			function two(){
				arrn=self.random(arr[0].length-1);
				oBox.eq(0).css("-webkit-animation",arr[0][arrn] +' '+(t1/1000)+"s linear forwards");
				oBox.eq(1).css("-webkit-animation",arr[1][arrn] +' '+(t1/1000)+"s linear forwards");
				if (arr[0][arrn]=="tlrs"){
					oBox.eq(0).find(".J-game-boxbag").css("-webkit-animation",'trrs '+(t1/1000)+"s linear forwards");
					oBox.eq(1).find(".J-game-boxbag").css("-webkit-animation",'tlrs '+(t1/1000)+"s linear forwards");
				}
				if (arr[0][arrn]=="tlrb"){
					oBox.eq(0).find(".J-game-boxbag").css("-webkit-animation",'trrb '+(t1/1000)+"s linear forwards");
					oBox.eq(1).find(".J-game-boxbag").css("-webkit-animation",'tlrb '+(t1/1000)+"s linear forwards");
				}
				$(".J-game-ptest").css("-webkit-animation",'opcityshow '+(t1/1000)+"s linear forwards");
				$(".J-game-ptest").off().on("webkitAnimationEnd",function(){
					arri++;
					if (arr[0][arrn]!="tlrs"){
						oBox.eq(0).parent().before(oBox.eq(1).parent());
						oBox=$(".J-game-mbox");
					}
					$(".J-game-boxbag,.J-game-mbox,.J-game-ptest").css("-webkit-animation",'');
					$(".J-game-ptest").hide();
					setTimeout(function(){
						$(".J-game-ptest").show();
					},100);
					oBox=$(".J-game-mbox");
					if (arri<n){
						two();
					}else{
						click=true;
						$(".J-game-box").css("-webkit-animation",'boxsacle .3s linear forwards');
					}
				});	
			}
			two();
		},
		threeBox:function(t1,n,t2){
			var self=this,
				  arr=[
							[
								['thl','thrls','thltms','thlbms'],['thr','thrrs','thrtms','thrbms']
							],
							[
								['thl','thrls','thltms','thlbms'],['thr','thrrs','thrtms','thrbms']
							],
							[
								['thrlm','thltmb','thlbmb'],['thrrm','thrtmb','thrbmb']
							],
							['thtrbl','thtrbc','thtrbr'],
							[
								['thl','thrls','thltms','thlbms'],['thr','thrrs','thrtms','thrbms']
							],
							[
								['thl','thrls','thltms','thlbms'],['thr','thrrs','thrtms','thrbms']
							],
							[
								['thrlm','thltmb','thlbmb'],['thrrm','thrtmb','thrbmb']
							]
						  ],
				  arrn=null,arrr=0,eq1=0,eq2=0,eq3=0,oDiv=$(".J-game-box"),arri=0,time=0,
				  oBox=$(".J-game-mbox"),arrr=self.randomarr(0,arr.length),htmlarr=[];
				function three(){
					animation=true;
					time=t1;
					htmlarr=[oDiv.eq(0).html(),oDiv.eq(1).html(),oDiv.eq(2).html(),oDiv.eq(3).html()];
					arrn=self.random(arr[arrr[arri]].length-1);
					//console.log(arrr[arri])
					//arrr[arri]=3;
					if (arrr[arri]!=3&&arrr[arri]!=7){
						arrn=self.random(arr[arrr[arri]][0].length-1);
						if (arrr[arri]==0||arrr[arri]==4){
							eq1=0;
							eq2=1;
						}else if (arrr[arri]==1||arrr[arri]==5){
							eq1=1;
							eq2=2;
						}else if (arrr[arri]==2||arrr[arri]==6){
							eq1=0;
							eq2=2;
						}
						$(".J-game-mbox").eq(eq1).css("-webkit-animation",arr[arrr[arri]][0][arrn] +' '+(time/1000)+"s linear forwards");
						$(".J-game-mbox").eq(eq2).css("-webkit-animation",arr[arrr[arri]][1][arrn] +' '+(time/1000)+"s linear forwards");
						if (arr[arrr[arri]][0][arrn]=="thrls"||arr[arrr[arri]][0][arrn]=="thrlm"){
							$(".J-game-mbox").eq(eq1).find(".J-game-boxbag").css("-webkit-animation",'thbagrr '+(time/1000)+"s linear forwards");
							$(".J-game-mbox").eq(eq2).find(".J-game-boxbag").css("-webkit-animation",'thbagrl '+(time/1000)+"s linear forwards");
						}
						$(".J-game-ptest").css("-webkit-animation",'opcityshow '+(time/1000)+"s linear forwards");
						//console.log(arr[arrr[arri]][0][arrn] +' '+(time/1000)+"s linear forwards")
					}else{
						time=t2;
						oBox.eq(0).css("-webkit-animation",'thtrbl '+(time/1000)+"s linear forwards");
						oBox.eq(1).css("-webkit-animation",'thtrbc '+(time/1000)+"s linear forwards");
						oBox.eq(2).css("-webkit-animation",'thtrbr '+(time/1000)+"s linear forwards");
						//console.log('thtrbr '+(time/1000)+"s linear forwards")
						$(".J-game-boxbag").eq(0).css("-webkit-animation",'thbrc1 '+(time/1000)+"s linear forwards");
						$(".J-game-boxbag").eq(1).css("-webkit-animation",'thbrr '+(time/1000)+"s linear forwards");
						$(".J-game-boxbag").eq(2).css("-webkit-animation",'thbrc '+(time/1000)+"s linear forwards");
						eq1=0;
						eq2=2;
						$(".J-game-ptest").css("-webkit-animation",'opcityshow '+(time/1000)+"s linear forwards");
						//console.log('thtrbl '+(time/1000)+"s linear forwards")
					}
					$(".J-game-ptest").off().on("webkitAnimationEnd",function(){
						arri++;
						$(".J-game-box").eq(eq1).html(htmlarr[eq2]);
						$(".J-game-box").eq(eq2).html(htmlarr[eq1]);
						$(".J-game-boxbag,.J-game-mbox,.J-game-ptest").css("-webkit-animation",'');
						$(".J-game-ptest").hide();
						setTimeout(function(){
							$(".J-game-ptest").show();
						},100)
						oBox=$(".J-game-mbox");
						if (arri<n){
							three();
						}else{
							click=true;
							$(".J-game-box").css("-webkit-animation",'boxsacle .3s linear forwards');
						}
					});	 
				}
				if (tollgaten==6||tollgaten==16){
					out=1500;
				}else{
					out=0;
				}
				three();
		},
		boxchange:function(){
			var self=this,score=0,html='',
				  oAlert=$(".J-result-alert");
			$("body").on("tap",".J-game-box",function(){
				var _this=$(this);
				if (click){
					if (_this.find(".J-game-people").length>0){//找到公主
						$(".J-game-mid").off();
						_this.find(".J-game-boxbag").css("-webkit-animation","boxup .3s linear forwards,boxdown .3s linear .6s forwards");
						_this.find(".J-game-light").css("-webkit-animation","lightshow .4s linear .3s forwards");
						setTimeout(function(){
							$(".J-game-box").css("-webkit-animation","").children().css("-webkit-animation","").children().css("-webkit-animation","");
							self.boxmove(tollgaten);
						},2000);
						score=tollgaten*scoren+'';
						score=score.split("");
						for (var i=0;i<score.length;i++){
							$(".J-number-box span").eq(i).attr("class",'m-number'+score[i]);
						}
						tollgaten++;
					}else{//没找到公主
						score=(tollgaten-1)*scoren+'';
						score=score.split("");
                        var num='';
						html='<div class="m-result-alert J-result-alert">'
									+'<div class="m-result-alertcon" style="background-image:url(' + checkValue(result, 'static/images/result-bag.png') +')">'
										+'<div class="m-alert-scorebox J-alert-scorebox">';
						for (var i=0;i<score.length;i++){
							html+='<span class="m-alert-score'+score[i]+'"></span>';
                            num+= score[i];
						}
						html+='<span></span><span></span>'
								+'</div>'
								+'<div class="m-alert-agin J-alert-agin"></div>'
								+'<div class="m-alert-share J-alert-share"></div>'
							+'</div>'
						+'</div>'
						
						$(".J-game-boxbag").css("-webkit-animation","boxup .29s linear .58s forwards");
						_this.find(".J-game-boxbag").css("-webkit-animation","boxup .29s linear forwards");
						_this.find(".m-game-ghost").css("-webkit-animation","ghost .29s linear .29s forwards");
						setTimeout(function(){
							if (oAlert.length>0){
								oAlert.show();
								for (var i=0;i<score.length;i++){
									$(".J-alert-scorebox span").eq(i).attr("class",'m-alert-score'+score[i]);
								}
							}else{
								$("body").append(html);
								oAlert=$(".J-result-alert");
							}
						},1400);

                        // 设置分享文案
                        shareresult(num);
					}
					click=false;
				}
			})
		},
		fourBox:function(t1,n,t2){
			var self=this,
				  arr=[
							[
								['fotl','fotr','fotul'],['ftol','ftor','ftoul']
							],
							[
								['fothll','fothr','fothl'],['ftholl','fthor','fthol']
							],
							[
								['fofl'],['ffol']
							],
							[],
							[
								['ftfl','ftfrl','ftfr'],['fftl','fftrl','fftr']
							],
							[
								['ftthl'],['fthtl']
							],
							[
								['fthfl','fthfr','fthfdl'],['ffthl','ffthr','ffthdl']
							]
						  ],
				  arrn=null,arrr=0,eq1=null,eq2=null,arri=0,time=0,out=0,htmlarr=[],oDiv=$(".J-game-box");
				  oBox=$(".J-game-mbox");
				arrr=self.randomarr(0,arr.length);
				//console.log(arrr)
				function four(){
					animation=true;
					htmlarr=[oDiv.eq(0).html(),oDiv.eq(1).html(),oDiv.eq(2).html(),oDiv.eq(3).html()];
					if (arrr[arri]!=3){
						time=t1;
						arrn=self.random(arr[arrr[arri]][0].length-1);
						if (arrr[arri]==0){
							eq1=0;
							eq2=1;
						}else if (arrr[arri]==1){
							eq1=0;
							eq2=2;
						}else if (arrr[arri]==2){
							eq1=0;
							eq2=3;
						}else if (arrr[arri]==4){
							eq1=1;
							eq2=3;
						}else if (arrr[arri]==5){
							eq1=1;
							eq2=2;
						}else if (arrr[arri]==6){
							eq1=2;
							eq2=3;
						}
						//console.log(eq1+"|||"+eq2)
						oBox.eq(eq1).css("-webkit-animation",arr[arrr[arri]][0][arrn] +' '+(time/1000)+"s linear forwards");
						oBox.eq(eq2).css("-webkit-animation",arr[arrr[arri]][1][arrn] +' '+(time/1000)+"s linear forwards");
						if (arr[arrr[arri]][0][arrn]=="fotr"||arr[arrr[arri]][0][arrn]=="ftfr"||arr[arrr[arri]][0][arrn]=="fthfr"){
							oBox.eq(eq1).find(".J-game-boxbag").css("-webkit-animation",'frotatel '+(time/1000)+"s linear forwards");
							oBox.eq(eq2).find(".J-game-boxbag").css("-webkit-animation",'frotater '+(time/1000)+"s linear forwards");
						}
						if (arr[arrr[arri]][0][arrn]=="fothr"){
							oBox.eq(eq1).find(".J-game-boxbag").css("-webkit-animation",'frotater '+(time/1000)+"s linear forwards");
							oBox.eq(eq2).find(".J-game-boxbag").css("-webkit-animation",'frotatel '+(time/1000)+"s linear forwards");
						}
						$(".J-game-ptest").css("-webkit-animation",'opcityshow '+(time/1000)+"s linear forwards");
						//console.log(arr[arrr[arri]][0][arrn] +' '+(time/1000)+"s linear forwards")
					}else{
						time=t2;
						//if (arrr[arri]==3){
						$(".J-game-mid").css('-webkit-animation','midr '+time/1000+'s linear forwards');
						oBox.eq(0).css('-webkit-animation','fboxr1 '+time/1000+'s linear forwards');
						oBox.eq(1).css('-webkit-animation','fboxr2 '+time/1000+'s linear forwards');
						oBox.eq(2).css('-webkit-animation','fboxr3 '+time/1000+'s linear forwards');
						oBox.eq(3).css('-webkit-animation','fboxr4 '+time/1000+'s linear forwards');
						$(".J-game-mid").children().css('-webkit-animation','boxr '+time/1000+'s linear forwards');
						oBox.find(".J-game-boxbag").css('-webkit-animation','fbagr '+time/1000+'s linear forwards');
						$(".J-game-ptest").css("-webkit-animation",'opcityshow '+(time/1000)+"s linear forwards");
						//console.log('fbagr '+time/1000+'s linear forwards')
						/*}else{
							console.log(22)
							$(".J-game-mid").css('-webkit-animation','midrr '+time/1000+'s linear forwards');
							oBox.eq(0).css('-webkit-animation','fboxrr1 '+time/1000+'s linear forwards');
							oBox.eq(1).css('-webkit-animation','fboxr2 '+time/1000+'s linear forwards');
							oBox.eq(2).css('-webkit-animation','fboxr3 '+time/1000+'s linear forwards');
							oBox.eq(3).css('-webkit-animation','fboxr4 '+time/1000+'s linear forwards');
							$(".J-game-mid").children().css('-webkit-animation','boxr '+time/1000+'s linear forwards');
							oBox.find(".J-game-boxbag").css('-webkit-animation','fbagr '+time/1000+'s linear forwards');
							
						}*/
					}
					$(".J-game-ptest").off().on("webkitAnimationEnd",function(e){
						if (arrr[arri]!=3){
							$(".J-game-box").eq(eq1).html(htmlarr[eq2]);
							$(".J-game-box").eq(eq2).html(htmlarr[eq1]);
						}else{
							$(".J-game-box").eq(0).html(htmlarr[3]);
							$(".J-game-box").eq(1).html(htmlarr[2]);
							$(".J-game-box").eq(2).html(htmlarr[1]);
							$(".J-game-box").eq(3).html(htmlarr[0]);
						}
						arri++;
						$(".J-game-mid,.J-game-box,.J-game-ptest,.J-game-mbox,.J-game-boxbag").css("-webkit-animation",'');
						
						$(".J-game-ptest").hide();
						setTimeout(function(){
							$(".J-game-ptest").show();
						},100);
						oBox=$(".J-game-mbox");
						//console.log(n+"||||"+arri)
						if (arri<n){
							setTimeout(function(){
								four();
							},200);
						}else{
							click=true;
							$(".J-game-box").css("-webkit-animation",'boxsacle .3s linear forwards');
						}
					});
				}
				
				if (tollgaten==11||tollgaten==21){
					out=time+1500;
				}else{
					out=time;
				}
				
				four();
				
				
		},
		random:function(m,n){
			var i=n?n:0;
			num=Math.random()*(m-i)+i;
			num =Math.ceil(num);
			return num;
		},
		randomarr:function(m,n){
			var count=n; 
			var original=new Array;//原始数组 
			for (var i=m;i<count;i++){ 
				original[i]=i; 
			} 
			original.sort(function(){ return 0.5 - Math.random(); }); 
			return original;
		},
		again:function(){
			var self=this;
			$("body").on("tap",".J-alert-agin",function(){
				var oDiv=$(".J-game-box");
				stop=false;
				var op=$(this).parents(".J-result-alert");
				if (op.length>0){
					op.hide();
				}
				$(".J-game-mid,.J-game-box,.J-game-mbox,.J-game-boxbag,.J-game-light,.J-game-ptest").css("-webkit-animation",'');
				tollgaten=1;
				$(".J-page-game").removeClass("m-game-animate")
				setTimeout(function(){
					$(".J-page-game").addClass("m-game-animate");
				},100)
				$(".J-game-mid").removeClass("m-game-threebox").removeClass("m-game-fourbox");
				$(".J-number-box span,.J-alert-scorebox span").attr("class","").eq(0).attr("class","m-number0").next().attr("class","m-number0");
				oDiv.eq(0).html(htmldefault[0]);
				oDiv.eq(1).html(htmldefault[1]);
				oDiv.eq(2).html(htmldefault[2]);
				oDiv.eq(3).html(htmldefault[3]);
				self.boxmove(1);
			})
		},
		share:function(){
			$("body").on("tap",".J-alert-share",function(){
				var oShare=$("J-share"),
					  html='<div class="m-share-alert J-share"  style="background-image:url(' + checkValue(share, 'static/images/share-bag.gif') +')"></div>';
				if (oShare.length>0){
					oShare.show();
				}else{
					$("body").append(html);
					oShare=$("J-share");
				}
			}).on("tap",".J-share",function(){
				$(this).hide();
			})
		},
		stop:function(){
			var self=this;
			$("body").on("tap",".J-game-stop",function(){
				var oStop=$(".J-stop-alert"),
					  html='<div class="m-result-alert J-stop-alert"><div class="m-stop-alertcon  style="background-image:url(' + checkValue(stopalert, 'static/images/stop-alert.png') +')""><div class="m-stop-btn J-stop-btn"></div></div></div>';
				if (oStop.length>0){
					oStop.show();
				}else{
					$("body").append(html);
					oStop=$(".J-stop-alert");
				}
				if ($(".J-page-game").hasClass("m-game-animate")){
					$(".J-page-game").addClass("m-game-paused");
				}else{
					$(".J-game-mid,.J-game-box,.J-game-mbox,.J-game-boxbag,.J-game-light,.J-game-ptest").css("-webkit-animation",'');
					$(".J-game-ptest").off();
				}
			}).on("tap",".J-stop-btn",function(){
				$(this).parents(".J-stop-alert").hide();
				if ($(".J-page-game").hasClass("m-game-animate")){
					$(".J-page-game").removeClass("m-game-paused");
				}else{
					stop=true;
				}
				$(".J-page-game").addClass("m-stop-look");
				setTimeout(function(){
					self.boxmove(tollgaten);
					$(".J-page-game").removeClass("m-stop-look");
				},1500)
			})
		}
	}
});
function checkValue(value, path){
    if(value == ''||value == undefined){
        return path;
    }else{
        return value;
    }
}