var $ = require('jquery'),
  BUI = require('bui-common'),
  expect = require('expect.js'),
  Flash = require('../src/type/flash');


var flash = new Flash({
  url: 'upload.php?p=a/b/c#a/b/c'
});

describe('测试flash上传类型', function(){
  it('url的路径是否正确', function(){
    var absolutePath = location.href.substring(0, location.href.lastIndexOf('/') + 1);
    expect(flash.get('url')).to.be(absolutePath + 'upload.php?p=a/b/c#a/b/c');
  })
});
