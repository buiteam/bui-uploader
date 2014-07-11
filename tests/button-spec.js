var $ = require('jquery'),
  BUI = require('bui-common'),
  expect = require('expect.js'),
  Filter = require('../src/button/filter'),
  HtmlButton = require('../src/button/htmlButton'),
  SwfButton = require('../src/button/swfButton');


describe('测试获取文件类型', function(){
  it('getTypeByDesc函数是否正确', function(){
    expect(Filter.getTypeByDesc('gif')).to.be('image/gif');
    expect(Filter.getTypeByDesc(['gif'])).to.be('image/gif');
    expect(Filter.getTypeByDesc('gif,png')).to.be('image/gif,image/png');
  });

  it('getTypeByExt函数是否执行正确', function(){
    expect(Filter.getTypeByExt('.gif')).to.be('image/gif');
    expect(Filter.getTypeByExt(['.gif'])).to.be('image/gif');
    expect(Filter.getTypeByExt('.gif,.png')).to.be('image/gif,image/png');
  });

  it('getExtByDesc函数是否执行正确', function(){
    expect(Filter.getExtByDesc('gif')).to.be('.gif');
    expect(Filter.getExtByDesc(['gif'])).to.be('.gif');
    expect(Filter.getExtByDesc('gif,png')).to.be('.gif,.png');
  });
});


//测试HtmlButton
describe('测试HtmlButton', function(){

  $('<div id="J_HtmlButton"></div>').appendTo(document.body);

  var htmlButton = new HtmlButton({
    name: 'filedata',
    text: '请选择',
    render: "#J_HtmlButton",
    filter: {desc: 'png'}
  }).render();

  var el = htmlButton.get('el');

  describe('测试HtmlButton', function(){
    it('测试input是否生成功能', function(){
      expect(el.find('input').length).not.to.be(0);
    });
    it('测试name是否设置正确', function(){
      expect(el.find('input').attr('name')).to.be(htmlButton.get('name'));
    });
    it('测试text是否设置正确', function(){
      expect(el.find('.bui-uploader-button-text').text()).to.be(htmlButton.get('text'));
    });
    
    it('测试文件禁用是否OK', function(){
      expect(el.find('input').attr('multiple')).not.to.be(undefined);
    });
    it('测试文件类型是否OK', function(){
      expect(el.find('input').attr('accept')).not.to.be(undefined);
    });
  });

  describe('测试HtmlButton multiple属性', function(){
    it('测试初始是值是否正确', function(){
      expect(el.find('input').attr('multiple')).not.to.be(undefined);
    });
    it('设置为非多选', function(){
      htmlButton.set('multiple', false);
      expect(el.find('input').attr('multiple')).to.be(undefined);
    });
    it('设置为多选', function(){
      htmlButton.set('multiple', true);
      expect(el.find('input').attr('multiple')).not.to.be(undefined);
    });
  });

  describe('测试HtmlButton disalbed属性', function(){
    it('测试初始是值是否正确', function(){
      expect(el.find('input').css('display')).not.to.be('none');
    });
    it('禁用', function(){
      htmlButton.set('disabled', true);
      expect(el.find('input').css('display')).to.be('none');
    });
    it('启用', function(){
      htmlButton.set('disabled', false);
      expect(el.find('input').css('display')).not.to.be('none');
    });
  });
});


//测试SwfButton
describe('测试SwfButton', function() {
  $('<div id="J_SwfButton"></div>').appendTo(document.body);
  var swfButton = new SwfButton({
      elCls: 'defaultTheme-button',
      render: '#J_SwfButton',
      text: '请选择',
      filter: {desc: 'png', ext: '.png'}
    }).render();
  var el = swfButton.get('el'),
    swfEl = swfButton.get('swfEl');

  describe('测试SwfButton', function(){
    it('测试swf是否生成成功', function(){
      expect(el.find('.uploader-button-swf').children().length).not.to.be(0);
    });
    it('测试text是否设置正确', function(){
      expect(el.find('.bui-uploader-button-text').text()).to.be(swfButton.get('text'));
    });
  });


  describe('测试SwfButton disalbed属性', function(){
    it('测试初始是值是否正确', function(){
      expect(swfEl.css('display')).not.to.be('none');
    });
    it('禁用', function(){
      swfButton.set('disabled', true);
      expect(swfEl.css('display')).to.be('none');
    });
    it('启用', function(){
      swfButton.set('disabled', false);
      expect(swfEl.css('display')).not.to.be('none');
    });
  });
})
