gallery-by-react
=
a one picture gallery project

![](https://github.com/willngess/gallery-by-react/blob/master/src/images/R0VFA294ZRJ12CP914KI.png?raw=true)

使用webpack+ES6+React+sass构建的图片画廊应用,在线访问：[https://willngess.github.io/gallery-by-react/](https://willngess.github.io/gallery-by-react/)

## 项目说明
- 本项目学自materliu老师的视频教程（非原创），教程地址 [ React实战--打造画廊应用](http://www.imooc.com/learn/507)
- 教程讲师materliu的该项目的Github地址 [materliu/gallery-by-react](https://github.com/materliu/gallery-by-react)
- 项目构建的脚手架使用的是 [generator-react-webpack](https://github.com/react-webpack-generators/generator-react-webpack)
- 本项目使用的generator-react-webpack 的版本是@3.3.4
- 由于materliu老师视频教程发布的时间比较早，视频教程中使用的是ES5语法，本项目使用ES6语法，而且生成器的版本也不一向，所以有诸多的不同

##查看本地生成器版本
```
> $ npm ls -g | grep generator</br>
> +-- generator-react-webpack@3.3.4</br>
> |   | | `-- regenerator-runtime@0.10.1
```

## 如何开始
clone到本地
```
> git clone git@github.com:willngess/gallery-by-react.git
```
安装依赖
```
> npm install
如果有警告或者报错出现，请执行
> npm i -D
```
运行开发环境项目
```
> npm start
```
打包输出到dist目录
```
> npm run dist
```
更多命令请参考 **package.json** 文件里边的**script**项

## 目录说明
```

├── /cfg/                       # webpack配置文件存放目录
│   ├── base.js                 # 基础配置
│   ├── default.js              # 默认配置，loader的配置可以在这里进行更改
│   ├── dev.js                  # 开发环境配置
|   ├── dist.js                 # 生成环境配置
│   └── test.js                 # 测试环境配置
├── /dist/                      # 存放最终打包输出的用于生产环境的项目文件
├── /node_modules/              # node模块存放的目录
├── /src/                       # 存放开发环境项目源码
│   ├── /actions/               # flux actions目录（没用到）
│   ├── /components/            # 组件目录
│   ├── /config/                # 配置目录（没用到）
│   ├── /sources/               # flux datasources目录（没用到
│   ├── /stores/                # flux stores(没用到)
│   ├── /styles/                # 样式文件目录，内有一个App.css基础css文件，可根据需要进行更改
│   ├── index.html              # 项目入口文件
│   └── index.js                # js入口文件
├── /test/                      # 单元测试和集成测试目录
│── .babelrc                    # Babel 配置文件
|—— .editorconig                # 编码风格配置文件，支持多种编辑器
│── .eslintrc                   # ESLint代码风格检测配置文件
│── .gitignore                  # 配置不需要加入Git版本管理的文件
│── .yo-rc.json                 # yeoman的配置文件
│── karma.conf.js               # karma测试框架的配置
│── LICENSE                     # 软件使用许可
│── package.json                # npm的依赖配置项
│── README.md                   # 项目说明文件
│── server.js                   # 项目运行的js文件，命令可查看package.json中的script
└── webpack.config.js           # webpack配置文件，不同环境的配置项在cfg目录下
```

##ES5和ES6的不同
创建组件
```
#ES5
var AppComponent = React.creatClass({
...
});

#ES6
class AppComponent extends React.Component{
...
}
```
定义组件初始化state
```
#ES5
getInitialState:function(){
  return {
    "key":"value"
  }
}

#ES6
ES6中是在constructor中来初始化
constructor(props){
  super(props);
  this.state={
    "key":"value"
  }
}
```
事件绑定this
```
#ES5
...
handkeClick:function(e){
...
}
...
render:function(){
  return (
    <div onClick={this.handleClick}></div>
  )
}

#ES6
在ES6中React不在自动绑定this,在ES6中有以下四种方式来主动绑定this

1、在调用事件是绑定
...
handkeClick(e){
...
}
...
render:function(){
  return (
    <div onClick={this.handleClick.bind(this)}></div>
  )
}

2、使用箭头函数来自动绑定this
...
handleClick = (e) => {
...
}
...
render(){
   return (
    <div onClick={this.handleClick}></div>
  )
}

3、使用::来给事件绑定this
...
handkeClick(e){
...
}
...
render:function(){
  return (
    <div onClick={::this.handleClick}></div>
  )
}

4、在构造函数中绑定this
constructor (props){
  super(props);
  this.handleClick = this.handleClick.bind(this);
}
...
handleClick(e){
...
}
...
```
以上四种方式都可以在ES6 React中对事件绑定this，推荐使用第四种方式。前三种方式在调用时都会根据当前上下文绑定this然后再创建函数，比较消耗性能，推荐在构造函数中直接绑定this
