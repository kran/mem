<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>2015新年</title>
	<link rel="stylesheet" href="css/css.css?_v=" />
	<!-- 微信分享组件S -->
    <script src="js/units/weChatApi.js"></script>
    <script type="text/javascript">
		var $STCONFIG = {
            STATIC_URL  : '',
			VERSION 	: ''
		};
		if(/Android (\d+\.\d+)/.test(navigator.userAgent)){
			var version = parseFloat(RegExp.$1);
			if(version > 2.3){
				var phoneScale = parseInt(window.screen.width) / 640;
				document.write('<meta name="viewport" content="width=640, minimum-scale = '+ phoneScale +', maximum-scale = '+ phoneScale +', target-densitydpi=device-dpi">');
			}else{
				document.write('<meta name="viewport" content="width=640, target-densitydpi=device-dpi">');
			}
		}else{
			document.write('<meta name="viewport" content="width=640, user-scalable=no, target-densitydpi=device-dpi">');
		}
		if(navigator.userAgent.indexOf('MicroMessenger') >= 0){
			document.addEventListener('WeixinJSBridgeReady', function() {
				//alert(1)
				//WeixinJSBridge.call('hideToolbar');
			});
		}
	</script>
</head>
<body>
<a href="javascript:void(0);" class="globalAudio">
	<audio src="audio/music.mp3" autoplay="autoplay" loop="loop"></audio>
</a>
	<section class="l-box J-box">
		<section class="l-loading J-loading" >
			<div class="l-load">
				<div class="circle-1"></div>
				<div class="circle"></div>
				<div class="circle-3"></div>
				<div class="cloud"></div>
				<div class="cloud1"></div>
				<div class="cloud2"></div>
                <!-- 首页logo -->
				<div class="logo" style="images/logo.png"></div>
				<div class="ship"></div>
				<div class="m-ship-loadname">
                    <!-- 首页品牌船体标识 -->
					<img src="images/name-bag.png"/>
				</div>
				<div class="spray"></div>
				<div class="circle-2"></div>
			</div>
		</section>
		<section class="l-game">
			<div class="header">
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</div>
			<div class="sea">
				<div class="setsail J-setsail"></div>
			</div>
			<div class="ship-box J-ship-box">
				<div class="cloud"></div>
				<div class="cloud1"></div>
				<div class="cloud2"></div>
				<div class="ship">
					<div class="chain J-chain"></div>
				</div>
			</div>
			<div class="spray"></div>
			<div class="seaweed"></div>
			<div class="l-five-box J-five-box">
				<div class="five-1 J-five"></div>
			</div>
			<div class="anchor-box J-anchor-box">
				<div class="anchor-chain J-anchor-chain">
					<div class="anchor J-anchor">
						<div class="m-five-maoicon"></div>
						<div class="m-five-water  J-five-icon"></div>
						<div class="m-five-water m-five-water1  J-five-icon"></div>
						<div class="m-five-water m-five-water2  J-five-icon"></div>
						<div class="m-five-num J-five-icon"></div>
					</div>
				</div>
			</div>
			<div class="chest-box J-chest-box">
				<div class="chest-chain J-chest-chain">
					<div class="chest J-chest">
						<div class="m-four-icon"></div>
						<div class="m-four-light J-four-icon">
							<span></span>
						</div>
						<div class="m-four-num J-four-icon"></div>
					</div>
				</div>
			</div>
			<div class="l-five-box J-five-box">
				<div class="five J-five"></div>
			</div>
			<div class="shelter"></div>
                <div class="bubble J-bubble w">未完成<br />的愿望</div>
            <!--
			<div class="bubble J-bubble w">未完成<br />的愿望</div>
			<div class="bubble J-bubble w">未完成<br />的愿望</div>
			<div class="bubble J-bubble w">未完成<br />的愿望</div>
			<div class="bubble J-bubble w">未完成<br />的愿望</div>
			<div class="bubble J-bubble y">取得的<br />成绩</div>
			<div class="bubble J-bubble y">取得的<br />成绩</div>
			<div class="bubble J-bubble y">取得的<br />成绩</div>
			<div class="bubble J-bubble y">取得的<br />成绩</div>
            -->
		</section>
		<section class="l-guide J-guide" style="display:none">
			<div class="m-guide-goldicon1"></div>
			<div class="m-guide-goldicon2"></div>
			<div class="m-guide-goldicon3"></div>
			<div class="m-guide-goldicon4"></div>
			<div class="m-guide-con"></div>
			<div class="m-guide-con1"></div>
		</section>

		<section class="l-front-cover-box J-front-cover-box "  >
			<div class="round">
				<div class="ship-box">
					<div class="cloud"></div>
					<div class="cloud1"></div>
					<div class="cloud2"></div>
					<div class="ship">
						<div class="m-end-shipbox">
                            <!-- 合书品牌船体logo -->
							<img src="images/name-bag1.png"/>
						</div>
					</div>
				</div>
				<div class="waves"></div>
			</div>
			<div class="l-front-cover"></div>
			<div class="fireworks">
				<span>
					<em></em>
				</span>
				<span>
					<em></em>
				</span>
				<span>
					<em></em>
				</span>
			</div>
            <!-- 合书logo -->
			<div class="logo" style="background:url(images/logo-1.png)"></div>
            <!-- 合书祝福话术 -->
			<div class="title" style="images/title.png"></div>
		</section>
	</section>
<script src="js/sea.js"></script>
<script src="js/modules/app/main.js"></script>
<script src="js/lib/jquery/jquery-1.8.2.min.js"></script>
</body>
</html>
