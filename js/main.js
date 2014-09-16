require.config({
  paths: {
    jquery: 'jquery-1.11.1.min'
  }
});

require(['jquery','slide'], function($, s) {

  var pics = ['1.jpg', '2.jpg', '3.jpg', '4.jpg'];
  var slider = new s.Slide({
    images: pics, 
    path: 'img'
  });

  slider.show();
})