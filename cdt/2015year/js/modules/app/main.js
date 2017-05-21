var config = {};
seajs.config({
	// 路径配置
	debug : 2,
	paths : {
		//'tools': './'
	},
	map: [[  /^(.*\.(?:css|js))(.*)$/i, '$1?version='+$STCONFIG.VERSION ]]
});
seajs.use('page/main');