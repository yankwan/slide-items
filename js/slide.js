define(['jquery'], function($) {

  function Slide(config) {
    // 基础配置信息
    this.config = {
      wrapId: "slideItems", // 最外层容器默认ID
      width: 600,
      height: 400,  // 轮播图片默认大小
      images: [],  // 轮播图图片存放地址 初始化传入
      path: '',     // 图片路径
      interval: 3000,  // 自动播放时间间隔
      isCircleBtn: true,
      isLeftRight: true,
      isAuto: true,
      skinClassName: null   // 自定义外观
    };

    $.extend(this.config, config);

    // 相关dom节点
    this.container = $('.' + this.config.wrapId);
    this.list = $('<section class="list"></section>');
    this.buttons = $('<section class="buttons" style="display:none"></section>');
    this.btnList = null;
    this.prev = $('<a href="javascript:;" class="arrow prev">&lt;</a>');
    this.next = $('<a href="javascript:;" class="arrow next">&gt;</a>');
    
    this.sLeft = parseInt(-this.config.width); // 起始偏移量
    this.index = 1;  
    this.len = 0;

    this.timer; // 定时器 

  }

  Slide.prototype = {

    // dom 结构生成
    init: function() {

      if(this.config.skinClassName)
        this.container.addClass(this.config.skinClassName);

      // 生成图片列表
      var left = this.sLeft;
      this.list.css("left", left);
      this.list.appendTo(this.container);
      
      this.len = this.config.images.length;
      var pics = '<img src="'+ this.config.path + '/' + this.config.images[this.len-1] +'">';
      
      for(var i = 0; i < this.len; i++) {
        pics += '<img src="' + this.config.path + '/' + this.config.images[i] + '">';
      }
      pics += '<img src="'+ this.config.path + '/' + this.config.images[0] +'">';
      $(pics).appendTo(this.list);

      // 圆形图标生成
      this.buttons.appendTo(this.container);
      var btns = '<span index="1" class="on"></span>';
      for(var i = 1; i < this.len; i++) {
        btns += '<span index="'+ (i+1) +'"></span>';
      }
      $(btns).appendTo(this.buttons);
      this.btnList = this.buttons.find("span");

      // 左右翻页
      this.prev.appendTo(this.container);
      this.next.appendTo(this.container);

    },

    animate: function(offset) {

      var leftStart = this.sLeft;
      var leftEnd = leftStart * this.len;
      var that = this;

      var _left = parseInt(this.list.css('left')) + offset;

      this.list.animate({left: _left + 'px'}, 300, function() {
        if(_left < leftEnd) {
          that.list.css('left', leftStart);
        }
        if(_left > leftStart) {
          that.list.css('left', leftEnd);
        }
      });
    },

    clickEvent: function(offset) {

      var total = this.len;
      var that = this;

      this.next.bind("click", function() {
        if (that.list.is(':animated'))
          return;
        that.animate(-offset);
        if (that.index == total)
          that.index = 1;
        else
          that.index ++;
        that.showButton();
      })

      this.prev.bind("click", function() {
        if (that.list.is(':animated'))
          return;
        that.animate(offset);
        if (that.index == 1)
          that.index = total;
        else
          that.index --;
        that.showButton();
      });

    },

    buttonEvent: function() {
      var that = this;
      this.btnList.each(function() {
        $(this).bind('click', function() {
          if (that.list.is(':animated') || $(this).attr('class') == "on")
            return;
          var theIndex = parseInt($(this).attr('index'));
          var offset = (theIndex - that.index) * that.sLeft;
          that.animate(offset);
          that.index = theIndex;
          that.showButton();
        })
      })
    },

    showButton: function() {
      this.btnList.eq(this.index-1).addClass('on').siblings().removeClass('on');
      
    },

    autoPlay: function() {
      var that = this;
      timer = setInterval(function() {
        that.next.trigger('click');
      }, that.config.interval);
    },

    show: function() {
      this.init();
      if (this.config.isCircleBtn) {
        this.buttons.css('display', 'block');
        this.showButton();
        this.buttonEvent();
      }

      if (!this.config.isLeftRight) {
        this.next.css("visibility", "hidden");
        this.prev.css("visibility", "hidden");
      }

      this.clickEvent(this.config.width);
      
      if (this.config.isAuto) {
        this.autoPlay();
      }
    }

  };

  return {
    Slide: Slide
  }
})