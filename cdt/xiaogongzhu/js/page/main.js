define(function(require, exports, module){
	//初始化各页面级模块
    var $       = require('lib/zepto/zepto'),
        $       = require('lib/zepto/coffee'),
        $       = require('lib/zepto/touch'),
        main 	=  require('modules/page/main');
	$(document).on('touchmove', function (event){
		event.preventDefault();
	});
   	main.init();                                                      
    
	window.uploadCallback = function (picId, imgUrl){
		alert(1)
		main.upload(main, picId, imgUrl);
	}
	//输出提示touchstart touchend
	console.log('\n运行成功！');
});