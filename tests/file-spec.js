var $ = require('jquery'),
  BUI = require('bui-common'),
  expect = require('expect.js'),
  UploaderFile = require('../src/file');
  
describe('测试获取文件类型', function(){
  var file = UploaderFile.create({
    name: 'a/b.php.jpg',
    size: 1024,
    type: 'image/jpeg'
  });

  it('测试文件名是否正确', function(){
    expect(file.name).to.be('b.php.jpg');
  })
  it('测试后缀名是否正确', function(){
    expect(file.ext).to.be('.jpg');
  })
  it('测试textSize是否正确', function(){
    expect(file.textSize).to.be('1.0KB');
  })
});
