define(function(require, exports, module){
	//引用相关模块
	var $ = require('lib/zepto/zepto'),
		$ = require('lib/zepto/touch'),
		aImg = require('modules/imgsrc/main'),
		iScroll=require('lib/iscroll/iscroll.js');

	module.exports = {
		//初始化
		init: function() {
			this.loading();
			this.like();
			this.scroll();
			this.postInfo();
			this.share();
		},
		loading: function() {
			var oImages = [],
			n = 0;
			for(var i = 0, al = aImg.src.length; i < al; i++) {
				(function(i) {
					oImages[i] = new Image();
					oImages[i].onload = function() {
						n++;
						if(n >= al) {
							$('.J-load').remove();
							setTimeout(function() {
								$('.page1').animate({'opacity':'1'}, 2000, 'ease')
							}, 500)
						}
					};
					oImages[i].src = aImg.src[i];
				})(i);
			}
		},
		scroll: function() {
			if(!$('.l-box-page2').length)
				return;
			var myScroll = new iScroll('.l-box-page2', { 
				mouseWheel: true,
				probeType: 2,
				scrollbars: true,//有滚动条
				fadeScrollbars: true,//滚动时显示滚动条，默认影藏，并且是淡出淡入效果  
				bounce: true,//边界反弹  
				interactiveScrollbars: true,//滚动条可以拖动  
				shrinkScrollbars: 'scale',// 当滚动边界之外的滚动条是由少量的收缩。'clip' or 'scale'.  
				click: true ,// 允许点击事件  
				keyBindings: true,//允许使用按键控制  
				momentum: true,// 允许有惯性滑动  
			});
			var num = 1;
			myScroll.on('scrollEnd', function(){
				if(this.y - this.maxScrollY > 10)
					return;
				//这里写下来获取消息的ajax
				$.ajax({
					url: "index.php?r=home/ajaxPostList",
					data    : {
						'page_num' 	:num,
						'rand'		:Math.random(),
					},
					type    : 'get',
					dataType: 'json',
					jsonp   : 'jsoncallback',
					timeout : 0,
					success : function (back, status) {
						if(back.code=1){
							var html = '';
							var leng = back.data.length;
							if(leng>0){
								num++;
								$.each(back.data, function(key, val) {
									var bgurl	= '';
									if(val.is_favour == 'Y'){
										bgurl	= 'style="background: url(images/y-good.png);"';
									}
									
									html +='<div class="m-ask"><div class="m-num"></div><div class="m-left"><img src="'+ val.headimgurl +
										'" width="79px" height="79px"/></div><div class="m-right"><div class="m-name">'+ val.nickname +'</div><div class="m-talk">'+
										'<div class="croe"></div><div class="text">'+ val.post_desc +'</div><div style="clear:both;"></div>'+
										'</div><div class="m-other"><div class="m-zan"><img src="images/good.png" /><span class="zan-num">'+
										val.favour_num +'</span></div><div class="m-see"><img src="images/look.png" /><span>'+ val.visit_num +'</span></div>'+
										'<div class="m-love" num="'+ val.id +' ' +bgurl+'"'+
										'></div><div style="clear:both;"></div></div></div><div style="clear:both;"></div></div>';    
								});
								$(".m-section").append(html);
								setTimeout(function() {
									myScroll.refresh();
								}, 1000)
								
							}
						}
					}
				});
				
			})
			$('.l-box-page2').on('tap',function() {
				myScroll.refresh();
			});
		},
		//点赞或取消点赞
		like: function() {
			var post = function(val) {
				//在这里写ajax，将点赞或取消点赞当做参数val传入
			}
			$('body').on('tap', '.m-love', function(event) {
				var postid	= $(this).attr('num');
				var num = $(this).parent().find('.zan-num').html() - 0;
				if(!!~$(this).css("background").indexOf('n-good.png')) {
					$(this).css("background", "url(images/y-good.png)");
					$(this).parent().find('.zan-num').html(num + 1);
					//点赞
					postZan(postid,'1');
				} else {
					$(this).css("background", "url(images/n-good.png)");
					$(this).parent().find('.zan-num').html(num - 1);
					//取消点赞
					postZan(postid,'2');
				}
			});
		},
		postInfo: function() {
			$('.m-btn').click(function() {
				var text = $('.input-text').val();
				if(text == '') 
					return;

				if(text.length > 140) {
					return alert('最多只可输入140个字！');
				}
				$('.m-info').show();
				//发送消息
				/* $.post('ajaxNewPost', text, function(data, textStatus, xhr) {
					
					if(textStatus == 200) {
						$('.m-info').hide();
						document.location.href = 'w-03.html';
					}
				}); */
				$.ajax({
					url: "index.php?r=home/ajaxNewPost",
					data    : {
						'text'	:text,
						'rand'	:Math.random(),
					},
					type    : 'post',
					dataType: 'json',
					jsonp   : 'jsoncallback',
					timeout : 0,
					success : function (back, status) {
						if(back.code == '1'){
							$('.m-info').hide();
							//alert(back.data);
							document.location.href	= 'index.php?r=home/info&id=' + back.data;
						}else{
							document.location.href  = location;
						}
					}
				});
			})
		},
		share: function() {
			$('.m-fish-page3').click(function() {
				$('.l-share2').show();
				$('.l-share2').click(function() {
					//document.location.href = 'index.php?r=home/list';
					$('.l-share2').hide();
				})
			})
		}
	}
});
function postZan(postId,type){
	$.ajax({
		url: "index.php?r=home/ajaxZan",
		data    : {
			'post_id' 	:postId,
			'type' 		:type,
			'rand'		:Math.random(),
		},
		type    : 'post',
		dataType: 'json',
		jsonp   : 'jsoncallback',
		timeout : 0,
		success : function (back, status) {
		}
	});
}
