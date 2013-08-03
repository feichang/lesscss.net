//设置lessc路径
var lessc ='~/git/less.js/bin/lessc';

var util = require('util'),
	exec  = require('child_process').exec;

//获取屏幕输入参数数组
var filenames = process.argv.slice(2);

filenames.forEach(function (val, index, array) {
	(function(filename){
		var tempTime;
		setInterval(function(){
			var child = exec('stat '+filename+'.less | grep Modify',
				function (error, stdout, stderr) {
					if(tempTime != stdout){
						console.log(''+filename+'.less changed');
						var lesschild = exec(''+lessc+' '+filename+'.less > '+filename+'.css'
							,function(erro,stdout,stderr){
							console.log(stdout);
							if (erro !== null) {
								console.log('exec erro: ' + erro+stderr);
							}
						});
						tempTime = stdout;
					}
				if (error !== null) {
					console.log('exec error: ' + error);
				}
			});
		},1000);
	})(val);
});
