define(function(require, exports, module){
    var $               = require('lib/zepto/zepto'),
        $               = require('lib/zepto/touch'),
        oImages         =[];

	module.exports = {
        /**
         * 设置loading页面
         * @class setLoadingPage
         * @static
         * @requires $(zepto)
         */
		setLoadingPage : function(){
            var self        = this,
                oSrc        = 'images/',
                srcArr      = [
                   //oSrc + 'guide.gif',//20150626
                   oSrc + 'pic-01.png',
                   oSrc + 'pic-02.png',
                   oSrc + 'pic-03.jpg',
                   oSrc + 'pic-04.png',
                   oSrc + 'pic-05.png',
                   oSrc + 'pic-06.jpg',
                   oSrc + 'pic-07.jpg',
                   oSrc + 'pic-08.jpg',
                   oSrc + 'pic-09.jpg',
                   oSrc + 'pic-010.jpg',
                   oSrc + 'pic-011.png',
                   oSrc + 'pic-012.png',
                   oSrc + 'pic-013.png',
                   oSrc + 'pic-014.png',
                   oSrc + 'pic-015.png',
                   oSrc + 'pic-016.png',
                   oSrc + 'pic-017.png',
                   oSrc + 'pic-018.png',
                   oSrc + 'pic-019.png',
                   oSrc + 'pic-020.png',
                   oSrc + 'pic-021.png',
                   oSrc + 'pic-022.png',
                   oSrc + 'pic-023.png',
                   oSrc + 'pic-024.png',
                   oSrc + 'pic-025.png',
                   oSrc + 'pic-026.png',
                   oSrc + 'pic-027.png',
                   oSrc + 'pic-028.png',
                   oSrc + 'pic-029.png',
                   oSrc + 'pic-030.png',
                   oSrc + 'pic-031.png',
                   oSrc + 'pic-032.png',
                   oSrc + 'pic-033.png',
                   oSrc + 'pic-034.png',
                   oSrc + 'pic-035.png',
                   oSrc + 'pic-036.png',
                   oSrc + 'pic-037.png',
                   oSrc + 'pic-038.png',
                   oSrc + 'pic-039.png',
                   oSrc + 'pic-040.png',
                   oSrc + 'pic-041.png',
                   oSrc + 'pic-042.png',
                   oSrc + 'pic-043.png',
                   oSrc + 'pic-044.png',
                   oSrc + 'pic-045.png',
                   oSrc + 'pic-046.png',
                   oSrc + 'pic-047.png',
                   oSrc + 'pic-048.png',
                   oSrc + 'pic-049.png',
                   oSrc + 'pic-050.png',
                   oSrc + 'pic-051.png',
                   oSrc + 'pic-052.png',
                   oSrc + 'pic-053.png',
                   oSrc + 'pic-054.png',
                   oSrc + 'pic-055.png',
                   oSrc + 'pic-056.png',
                   oSrc + 'pic-057.png',
                   oSrc + 'pic-058.png',
                   oSrc + 'pic-059.png',
                   oSrc + 'pic-060.png',
                   oSrc + 'pic-061.png',
                   oSrc + 'pic-062.png',
                   oSrc + 'pic-063.png',
                   oSrc + 'pic-064.png',
                   oSrc + 'pic-065.png',
                   oSrc + 'pic-070.png',
                   oSrc + 'pic-071.jpg',
                   oSrc + 'pic-072.png',
                   oSrc + 'pic-073.png',
                   oSrc + 'pic-074.png',
                   oSrc + 'pic-075.png',
                   oSrc + 'pic-076.png',
                   oSrc + 'pic-077.png',
                   oSrc + 'pic-078.png',
                   oSrc + 'pic-079.png',
                   oSrc + 'pic-080.png',
                   oSrc + 'pic-081.png',
                   oSrc + 'pic-081.png',
                   oSrc + 'pic-082.png',
                   oSrc + 'pic-083.png',
                   oSrc + 'pic-084.png',
                   oSrc + 'pic-085.png',
                   oSrc + 'pic-086.png',
                   oSrc + 'pic-087.png',
                   oSrc + 'pic-089.png',
                   oSrc + 'pic-091.png',
                   oSrc + 'pic-092.png',
                   oSrc + 'pic-093.png',
                   oSrc + 'pic-094.png',
                   oSrc + 'pic-095.png',
                   oSrc + 'pic-096.png',
                   oSrc + 'pic-097.png',
                   oSrc + 'pic-098.png',
                   oSrc + 'pic-099.png'
                ],
                n       = 0,
                num     = 0,
                loadBox = $('.J-load-box');
            for (i=0,len=srcArr.length;i<len;i++){
                (function(i){
                    oImages[i]=new Image()
                    oImages[i].onload=function(){
                        n++;
                        num=parseInt((n/len*100).toFixed(2));
                        loadBox.css('height', num + '%');
                        if(n>=len){
                            $('.J-start-page').show();
                            $('.J-load-page').animate({opacity:0}, function(){
                                $(this).hide();
                            });
                        }
                    };
                    oImages[i].src= srcArr[i];
                })(i);
            }    
        }
	};
});
