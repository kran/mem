
define(function(require, exports, module){

	//引用功能模块
	var $ = require('lib/zepto/zepto');						//zepto模块
	//触摸插件模块

	//全局音频类
	var GlobalAudio = function ($item) {
		//定义属性
		this._$globalAudio = $item;							//容器对象
		this.audio = this._$globalAudio.find('audio')[0];	//获取音频控件
		this.isAllowManually = false;						//是否允许手动操作
		this.playState = 'ready';							//当前播放状态
		//定义临时变量
		var theClass = this;

		//加载完成时自动播放
		if(this.audio.autoplay){
			this.audio.pause();
			$(window).on('load', function (e) {
				theClass.play();
			});
		}

		//加载完成后才允许手动控制播放
		$(window).on('load', function (e) {
			theClass.isAllowManually = true;		
		});

		//修复ios/android 4.4下音频不播放的问题
		$(document).one('touchstart', function (e) {
			theClass.audio.play();
		});
	};

	//播放
	GlobalAudio.prototype.play = function() {
		if(!this._$globalAudio.is('.z-play')){
			this.audio.play();
		}
	};

	//暂停
	GlobalAudio.prototype.pause = function() {
		if(!this._$globalAudio.is('.z-pause')){
			this.audio.pause();
		}
	};

	//显示提示
	GlobalAudio.prototype._showTip = function(msg) {
		var theClass = this;

	};

	//获取全局音频容器
	var $globalAudio = $('.globalAudio');
	var globalAudio;

	if($globalAudio.length){
		//初始化全局音频对象
		globalAudio = new GlobalAudio( $('.globalAudio') );
	}

	//对外输出接口
	module.exports = globalAudio;
});
