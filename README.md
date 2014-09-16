slide-items
===========
轮播图组件

在需要添加轮播图处添加<section class="slideItems"></section> DOM 节点, 并引入css默认样式
<link rel="stylesheet" type="text/css" href="css/slide.css"> 和  <script data-main="js/main.js" src='js/require.js'></script>

该组件用到jquery库和requireJs库, main.js 为主入口文件, 用于调用及自定义初始化. 

main.js 调用组件：
require(['jquery','slide'], function($, s) {

  var pics = ['1.jpg', '2.jpg', '3.jpg', '4.jpg'];  // 轮播图片数组
  var slider = new s.Slide({  // 自定义初始化
    images: pics, 
    path: 'img'
  });

  slider.show();   // 调用显示轮播图
})



初始化参数：

1.images: 必须. 图片数组,存放图片名.
2.path: 图片路径, 默认为空.
3.skinClassName: 自定义容器样式, 主要用于设置最外层容器样式. 参数为class name, 新样式写入css/slide.css中.
4.wrapId: 最外层容器ID, 默认slideItems.
5.width: 轮播图款,默认600
6.height: 轮播图高, 默认400, 根据需要自行设定图片大小, 但每幅图大小必须一致
7.interval: 自动播放时间间隔, 默认为3000毫秒
8.isCircleBtn: 是否显示圆形按钮, 默认为true
9.isLeftRight: 是否显示左右翻页按钮, 默认为true
10.isAuto: 是否自动翻页, 默认为true


