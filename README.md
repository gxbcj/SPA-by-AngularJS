SPA-by-AngularJS
================

这个项目是根据`angular-ui-router`中的`sample`更改的(比较懒...)，主要还是为了做个对比原项目[ui-router](https://github.com/angular-ui/ui-router/tree/master/sample)<br>
在这个sample的基础上添加了requirejs模块化编程，前端项目构建grunt。<br>
要使用firefox打开index.html，chrome打开会报XMLHttpRequest加载本地文件错误。

##前端模块化编程
在我们之前的编程中，代码几乎都是放在script的文件夹中，使用的时候，要根据依赖关系，在页面中引入，这样就比较杂乱。
引入前端模块化管理，它可以轻松管理各种JavaScript脚本的依赖关系，自动加载各个模块，使得网页结构清晰合理，这里使用了requireJS。

##模块化编程带来的弊端
我们通过`requireJS`可以将代码分割成若干模块，保持了代码的模块化和易维护性。但是在生产环境中，所有的JavaScript文件分离，带来的弊端就是会导致很多次的请求(request)，会浪费很多的时间。因此通过合并这些脚本文件，可以减少请求次数来优化项目。
其实把所有js合并到一个文件，对于调试js也比较方便。

##单页应用(Single Page Application)
单页应用的出现是前后端分离的极致体现。前端负责界面显示，后端负责数据存储和计算，同时减轻服务器端的压力，服务器只管出数据就可以了，页面的合成交给前端，之前都是需要那些模版工具在服务器端渲染的。这个和restful api一起配合使用。其实这样对缓存的粒度可以变得更细，页面都在前端，所以只要管理好接口数据的缓存就可以了。
AngularJS就是单页应用的前端架构。

#安装node.js
首先需要安装[nodejs](http://www.nodejs.org/).

#安装grunt
安装grunt，这里使用node.js命令安装
```javascript
npm install -g grunt-cli
```
建立一个grunt项目，一般需要在项目中准备两个文件package.json和Gruntfile.js。

#框架介绍
准备工作做完，下面先介绍下这个项目的目录组织结构
##目录结构
`src`, `common` 为用户代码，之所以用两个目录也只是为了演示多目录的使用，就像我们java项目中的src folder, 每个js文件都是符合requireJS标准的。<br>
lib第三方代码库。比如`jquery`, `angular`, `lodash`, `require`等。<br>
'template'，存放的是html模版。<br>
`asset` 放的是演示数据，其实实际中，这些数据是通过`restful api`获取的<br>
`css` css文件放这里<br>
`config` requires的配置文件<br>
`build` 编译后的目录<br>
`node_modules` 运行grunt的node依赖包<br>
##配置介绍
###require.config.js
```javascript
require.config({
	baseUrl: 'dest',
  	deps: ['bootstrap'],
	shim: {
	    jquery: {
	     	exports: 'jquery'
	    },
	    lodash: {
	     	exports: '_'
	    },
	    angular: {
	     	exports: 'angular'
	    },
	    'angular-animate': {
	     	deps: ['angular']
	    },
	    'ui.router': {
	        deps: ['angular']
	    }
  	}
});
```
shim描述了lib间的依赖关系，比如angular-animate和ui.router依赖angular。

###grunt配置文件
####package.json
package.json文件主要用来存储npm模块的依赖项，
####gruntfile.js文件
主要用来配置各个任务的参数，在这个项目中，我们一共使用了5个任务，分别时copy，watch，clean，cssmin，requirejs，通过代码
```javasrcipt
grunt.loadNpmTasks('grunt-contrib-requirejs');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-copy');
```
加载这个5个任务。

每个任务负责不同的工作，因此需要进行参数配置，比如copy任务，需要指定其拷贝文件的来源和目的。在代码
```javascript
grunt.initConfig({
...
});
```
中配置。具体的参数配置可以查阅相关的任务文档，这里不细致的阐述个参数的意义了(其实看看名字都可以猜出来)...

最后就是注册任务
```javascript
grunt.registerTask('build', ['requirejs:root','cssmin','copy','clean']);
```
这里注册了一个build的自定义任务，这里总共运行了4个任务<br>
`require:root`，把所有的js文件合并到build/bootstrap.js文件中。<br>
`cssmin`，压缩css文件到build/all.min.css。<br>
`copy`，把文件bootstrap.js和all.min.css拷贝到目录dest中<br>
`clean`，清除build目录下的所有文件<br>
运行效果：
```bash
CH-C02MM1SYFH00:contacts xguo$ grunt build
Running "requirejs:root" (requirejs) task

Running "cssmin:minify" (cssmin) task
File build/css/styles.min.css created: 741 B → 608 B

Running "cssmin:combine" (cssmin) task
File build/css/all.min.css created: 339.01 kB → 236.95 kB

Running "copy:main" (copy) task
Copied 2 files

Running "clean:dist" (clean) task
>> 5 paths cleaned.

Done, without errors.
```
#####grunt watch
打包后会带来个问题，在开发环境中，文件的更改就需要编译合并，每次运行grunt build都很麻烦，这里有watch task来帮助我们。
watch任务会监控文件的改变，当每次保存后，可以运行指定的task。
```javascript
watch : {
	'root-requirejs' : { 
		files: 
			['src/**/*.js',
		     'common/**/*.js'
		    ],
	  	tasks: [ 'requirejs:root','copy','clean' ],
	  	options: { livereload: true } 
	},
	'root-cssmin': {
		files:
			['css/*.css'
			],
		tasks: ['cssmin','copy','clean'],
		options: { livereload: true } 
	}
},
```
配置参数中，files代表监控的文件，tasks代表一旦文件变化，就运行哪些task。
在开发的时候，运行命令grunt watch，
```bash
CH-C02MM1SYFH00:contacts xguo$ grunt watch
Running "watch" task
Waiting...
```
下面的例子就是src/configApp.js文件被修改后的效果。
```bash
>> File "src/configApp.js" changed.
Running "requirejs:root" (requirejs) task

Running "copy:main" (copy) task
Copied 1 file

Running "clean:dist" (clean) task
>> 4 paths cleaned.

Done, without errors.
```
后记
-------
现在的前端项目构建越来越复杂了，感觉后端有的概念，前端也有，grunt＋bower就等于maven，本项目还没使用bower，觉得前端的第三方lib不是那么多，就没引入。
该项目还不是最"极端"的SPA，我们至少还保留了template中的html文件，其实这些可以用jade来代替，编译后的html以requirejs模块合并到bootstrap文件中，那整个项目就一个index.html，一个bootstrap.js，一个all.min.css。
jade模块很容易上手，关键强制dom层次可以增加代码的阅读，实在受不了那些不注重层次缩进的html代码。反正我习惯了jade后，再也不想些html了。







