/**
 + ---------------------------------------- +
 + 版权所有2013年，移动端轮播图
 + Author: luzhichao
 + QQ: 190135180
 + Mail: luzhichao@shiqutech.com
 + ---------------------------------------- +
 + Date: 2014-01-14
 + ---------------------------------------- +
**/
/**
 * mobileFocusMap构造函数
 * @name mobileFocusMap
 * @param {json} option    参数设置
 * @function
 */
var mobileFocusMap = function (option){

		var mix	= function (r, s, ov, wl){
        		var i, p, l;
                if(!s || !r) return r;
                ov === undefined && (ov = true);

                if(wl && (l = wl.length)){
                    for(i = 0; i < l; i++){
                        p = wl[i];
                        if(p in s){
                            if(ov || !(p in r)){
                                r[p] = s[p];
                            } 
                        } 
                    }
                }
                else{
                    for(p in s){
                        if(ov || !(p in r)){
                            r[p] = s[p];
                        } 
                    }
                }
                return r;
        	},
			option 	= option || {},
		setting 	= {
			elem		: '.tabimg',		//{array | element}: 焦点图父级
			btn			: '.left, .right',	//{string}: 左右切换按钮
			list		: '.slider-item',	//{string}: 滚动内容className
			type		: false,			//{Boolean}: (可选, 默认:false)不连续滚动
			istab		: false,			//{Boolean}: (可选, 默认:false)是否显示切换按钮
			tabClass	: '.tab, .on',		//{string}: (可选, 默认:false)是否显示切换按钮
			index 		: 0,				//{Number}: (可选, 默认:1)第几张图片开始
			imgInit		: 1,				//{Number}: (可选, 默认:1)图片滚动张数
			tween		: 'ease',			//{string}: (可选, 默认:linear, 运动形式:linear[匀速]|ease[缓冲]|ease-in[加速]|ease-out[减速]|ease-in-out[先加速后减速])匀速运动
			tweentimer	: 400,				//{Number}: (可选, 默认:400)运动时间
		    autoPlay	: true, 			//{Boolean}: ((可选, 默认:true)是否自动播放
		   	timer		: 4000, 			//{Number}: ((可选, 默认:4000毫秒)自动播放时间
		    callback	: function (){}, 	//{Function}: (可选)页面切换完成(滑动完成)时执行的函数,参数为滑动后的page页码
			createback	: function (){}
		},
		self = this;
		/*20140506加，给自动播放模拟点击用*/
		if(!option.btn && option.autoPlay){
	        $(option.elem).parent().append('<div class="right" style="display:none;"></div>');
		}
		this.setting= mix(setting, option);
		this.create();
		/*var supportsOrientationChange = "onorientationchange" in window,
			orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
		window.addEventListener(orientationEvent, function(){
			setTimeout(function(){
				var obj = $(self.setting.elem),
					iWidth = obj.width()/self.setting.imgInit; 
				self.setting.createback();
				obj[0].children[0].style.width = iWidth * obj.find('.slider-item').length +'px';
				obj.find('.slider-item').css('width', iWidth);
				self.width = obj.width();
				//alert(obj.width());
				//obj[0].style.left = -self.setting.index * self.width+'px';
				//console.log(self.setting.index)
				//self.createback();
				self.slide(self.index + self.direction);
			}, 100);//测试手机反应慢，所在这里做100毫秒的延时

		});*/

};
/**
 * mobileFocusMap原型
 * @object
 */
mobileFocusMap.prototype = {
	constructor : mobileFocusMap,
	/**
	 * 创建焦点图
	 * @name create
	 * @function
	 */
	create : function (){
		//console.log($(this.setting.elem)[0]);
		var self 	= this,
			elem 	= $(self.setting.elem)[0],
			width 	= $(elem).width(),
			height	= '100%',
			items 	= elem.children,
			wheel	= document.createElement('div'),
			whchild	= document.createElement('div'),
			tab		= document.createElement('div'),
			i,len 	= items.length,
			j 		= 0;

		/* 设置切换按钮className */
		self.setting.istab && (self.setting.tabClass = self.setting.tabClass.replace(/\./g,'').split(','));

		/* 设置切换元素 */
		while(i = items[0]){
			$(i).addClass(self.setting.list.substring(1));
			$(i).addClass(self.setting.list.substring(1)).css({width:width/self.setting.imgInit});
			whchild.appendChild(i);
			j++
			
//(self.setting.istab ? Math.ceil(items[0] / self.setting.imgInit) : items[0])

			/* 插入切换按钮 */
			if(self.setting.istab && j<=Math.ceil(len / self.setting.imgInit)){
				var tabSpan	= document.createElement('span');
				tabSpan.className = self.setting.tabClass[0];
				tab.appendChild(tabSpan);
			}
		}

		$(whchild).css({
			height 	: height,
			float	: 'left'
		});
		$(wheel).css({
			width 	: width * len, 
			height 	: height, 
			position: 'absolute',
			left	: - self.setting.index * width,
			top		: 0
		})
		wheel.appendChild(whchild);
		self.setting.type && (wheel.innerHTML += wheel.innerHTML);
		elem.appendChild(wheel);
		wheel.style.width = width * (len * 2) + 'px';			
		/* 插入切换按钮box */
		if(self.setting.istab){//20140501日guochuihui修改部分数据，目前只针对微电商项目，过后有时间要改成传进来的数据
			$(tab).addClass('c-DS-slider-item')
			$(tab).css({
				'position' 	: 'absolute',
				//'right'		: '42%',
				'bottom'	: 0,
				'zIndex'	: 1
			})
			elem.appendChild(tab);
			/* 设置当前第几张 */
			self.tab = tab.children;
			
			$(self.tab[self.setting.index]).addClass(self.setting.tabClass[1]);
		}
		/* 对外 */
        self.wheel		= wheel;
        self.items		= $(wheel).find(self.setting.list);
        self.length		= Math.ceil(self.items.length/self.setting.imgInit);
        self.width		= width;
        self.height		= height;
        self.index		= self.setting.index;
        self.direction 	= 1;
        self.needPlay 	= true;
        self.events();
		self.setting.createback(self.setting.index);
	},
	/**
	 * 初始化事件
	 * @name events
	 * @function
	 */
	events : function (){
		var self		= this,
			wheel		= self.wheel,
			btn 		= self.setting.btn.split(',');
			
		/* 点击事件 */
		$(btn[0]).on('click', function (){
			if(!self.setting.type && self.index >= self.length)return self;
			var index 	= self.index,
				length 	= self.length;
			if(self.setting.type){
            	if(index > 0 && (index < length - 1)){
            		self.index = index;
            	}
            	else{
					if(index === 0){
						self.index = length / 2;
					}
					else{
						self.index = index;
					}
            	}
            	self.wheel.style.WebkitTransitionDuration = '0ms';
            	self.wheel.style.left = -self.index * self.width + 'px';
            }
            setTimeout(function (){
				self.slide(self.index - Math.abs(self.direction));
			},30);
		});
		$(btn[1]).on('click', function (){
			if(!self.setting.type && self.index >= self.length-1)return self;
			var index 	= self.index,
				length 	= self.length;


			if(self.setting.type){
            	if(index > 0 && (index < length - 1)){
            		self.index = index;
            	}
            	else{
					if(index === 0){
						self.index = length / 2;
					}
					else{
						self.index = index;
					}
            	}
            	self.wheel.style.WebkitTransitionDuration = '0ms';
            	self.wheel.style.left = -self.index * self.width + 'px';
            }
			setTimeout(function (){
				self.slide(self.index + self.direction);
			},30);
		});
		$(btn[2]).on('click', function (){
			self.setting.autoPlay ? self.setting.autoPlay = false : self.setting.autoPlay = true;
			self.setTimeout();
		});
		/* 滑动事件 */
		$(wheel).on('touchstart',function (event){self.eventsHandler.call(this, event, self)});
		$(wheel).on('touchmove',function (event){self.eventsHandler.call(this, event, self)});
		$(wheel).on('touchend',function (event){self.eventsHandler.call(this, event, self)});
		$(wheel).on('touchcancel',function (event){self.eventsHandler.call(this, event, self)});
		$(wheel).on('webkitTransitionEnd',function (event){self.eventsHandler.call(this, event, self)});
		self.setTimeout();
	},
	/**
	 * 数据缓存
	 * @name data
	 * @json
	 */
	data : {},
	/**
	 * 事件处理函数
	 * @name eventsHandler
	 * @function
	 */
	eventsHandler : function (event, self){
		switch(event.type){
			case 'touchstart':
				self.data.pageX 	= event.touches[0].pageX;
                self.data.pageY 	= event.touches[0].pageY;
                self.data.Y 		= false;      //判断滚动方向
                self.data.T 		= false;      //判断XY轴
                self.data.X 		= 0;          //X滚动方向
                this.style.WebkitTransitionDuration = '0ms';
				break;
			case 'touchmove':
				self.data.X = event.touches[0].pageX - self.data.pageX;
                if(!self.data.T) {
                    var index 	= self.index,
                		length 	= self.length,
                    	Y 		= Math.abs(self.data.X) < Math.abs(event.touches[0].pageY - self.data.pageY);
                    if(self.setting.type){
                    	if(index > 0 && (index < length - 1)){
                    		self.index = index;
                    	}
                    	else{
                    		if((index === length - 1) && self.data.X < 0){
                    			self.index = length/2 - 1;
                    		}
                    		else{
                    			if(index === 0){
                    				self.index = length / 2;
                    			}
                    			else{
                    				self.index = index;
                    			}
                    		}
                    	}
                    }
                    Y || clearTimeout(self.play);
                    self.data.T = true;
                    self.data.Y = Y;
                }
                if(!self.data.Y) {
                    event.stopPropagation();
                    event.preventDefault();
                    self.wheel.style.left = self.data.X - self.index * self.width + 'px';
                }
				break;
			case 'touchend':
			case 'touchcancel':
				self.touchEnd()
				break;
			case 'webkitTransitionEnd':
				var wheel 		= self.wheel,
					width		= self.width,
					length		= self.length;
				self.setTimeout();
                self.setting.callback && self.setting.callback.call(self, self.index);
				break;
		}
	},
	/**
	 * 运动触发
	 * @name touchEnd 
	 * @function
	 */		
	touchEnd : function (){
		var self = this,
			X 	 = self.data.X,
			Y 	 = self.data.Y;
		//console.log(self.index + (X <= -20 ? Math.ceil(-X / self.width) : (X > 20) ? -Math.ceil(X / self.width) : 0))
		Y || self.slide(self.index + (X <= -20 ? Math.ceil(-X / self.width) : (X > 20) ? -Math.ceil(X / self.width) : 0));
	},
	/**
	 * 判断滑动位置
	 * @name slide
	 * @param {Number}  index   当前索引
	 * @param {Boolean}	auto   	判断是否倒退播放
	 * @function
	 */
	slide : function (index, auto){
		//console.log(index)
		var self 	= this,
			length	= self.length,
			wheel 	= self.wheel,
			width 	= self.width;
			//alert(length);
			if(-1 < index && index < length){
                self.animation(index);
            }
            else if(index >= length){
            	if(self.setting.type){
            		wheel.style.Transition = '';
            		wheel.style.left = - (length / 2 - 1) * width + 'px';
                    self.direction =  1;
                    setTimeout(function (){
                    	self.animation(length / 2);
                    },30);
            	}
            	else{
            		//self.animation(length - 1)//(auto ? 2 : 1));
                    //self.direction = -1;
					self.animation(length - (auto ? 2 : 1));
					self.direction = -1;
            	}
            }
            else{
            	if(self.setting.type){
            		wheel.style.Transition = '';
            		wheel.style.left = - (length / 2 - 1) * width + 'px';
                    setTimeout(function (){
                    	self.animation(length / 2 - 1);
                    },30);
            	}
            	else{
                    self.animation(auto ? 1 : 0);
                }
                self.direction =  1;
            }
	},
	/**
	 * 轮播方法
	 * @name animation
	 * @param {Number}  index   当前索引
	 * @function
	 */
	animation : function (index){
		var self 		= this,
			length 		= self.length,
			width		= self.width,
			wheel		= self.wheel;
			self.index 	= index;             
            clearTimeout(self.play);
        	/* 设置滚动距离 */
        	self.wheel.style.WebkitTransition = self.setting.tweentimer + 'ms';
        	self.wheel.style.WebkitTransitionTimingFunction = self.setting.tween;
        	self.wheel.style.left = - index * self.width + 'px';
                        
            /* tab切换 */
            if(self.setting.istab){
            	var tabIndex = 0;
            	self.setting.type ?
        		tabIndex = (self.index < 0 ? length/2 - 1 : self.index >= length / 2 ? self.index - length / 2 : self.index) :
        		tabIndex = (self.index < 0 ? length - 1 : self.index >= length ? 0 : self.index);
				$(self.setting.elem+' .'+self.setting.tabClass[0]).removeClass(self.setting.tabClass[1]);/*20140502修改*/
            	$(self.setting.elem+' .'+self.setting.tabClass[0]).eq(tabIndex).addClass(self.setting.tabClass[1]);/*20140502修改*/
            }
	},
	/**
	 * 设置自动播放
	 * @name setTimeout 
	 * @function
	 */
	setTimeout : function (){
		var self = this,
			X 	 = self.data.X,
			Y 	 = self.data.Y,
			btn 		= self.setting.btn.split(',');
		clearTimeout(self.play);
        if(!self.needPlay || !self.setting.autoPlay) return self;

        self.play = setTimeout(function() {
        	$(btn[1]).click();//20140506改

            //self.slide.call(self, self.index + self.direction, true);
        }, self.setting.timer);
	}
};