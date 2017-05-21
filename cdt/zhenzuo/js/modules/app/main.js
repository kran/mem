seajs.config({
	// 路径配置
	debug : 2,
	paths : {
		//'tools': './'
	},
    map: [
          [  /^(.*\.(?:css|js))(.*)$/i, '$1?version='+$STCONFIG.VERSION ] // timestamp here, clean the cache
       ]
});
seajs.use('page/main');