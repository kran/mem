define(function(require, exports, module){
	//初始化各页面级模块
    var $       = require('lib/zepto/zepto'),
        $       = require('lib/zepto/coffee'),
        $       = require('lib/zepto/touch');
	$(document).on('touchstart touchend touchmove', function (event){
        event.preventDefault();
    });
    require('modules/page/main').init();
	//输出提示
	console.log('\n运行成功！');
});