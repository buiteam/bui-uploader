var $ = require('jquery'),
  BUI = require('bui-common'),
  expect = require('expect.js'),
  sinon = require('sinon'),
  Uploader = require('../index');



//使用浏览器支持的默认方式进行上传
describe('使用浏览器支持的默认方式进行上传', function() {
  $('<div id="J_Uploader"></div>').appendTo(document.body);
  var uploader = new Uploader.Uploader({
    render: '#J_Uploader',
    url: 'data/uploader.json',
    rules: {
      //文的类型
      //ext: ['.doc,.docx,.png,.jpg','文件类型只能为{0}']
    }
  });
  uploader.render();
  var el = uploader.get('el');

  describe('测试render', function(){
    it('button是否初始化', function(){
      expect(uploader.get('button').isController).to.be(true);
    });
    it('queue是否初始化', function(){
      expect(uploader.get('queue').isController).to.be(true);
    });
  });

  describe('测试multiple属性', function(){
    it('初始值', function(){
      expect(uploader.get('button').get('multiple')).to.be(true);
    });
    it('禁用', function(){
      uploader.set('multiple', false);
      expect(uploader.get('button').get('multiple')).to.be(false);
    });
    it('启用', function(){
      uploader.set('multiple', true);
      expect(uploader.get('button').get('multiple')).to.be(true);
    });
  });

  describe('测试disalbed属性', function(){
    it('初始值', function(){
      expect(uploader.get('button').get('disabled')).to.be(false);
    });
    it('禁用', function(){
      uploader.set('disabled', true);
      expect(uploader.get('button').get('disabled')).to.be(true);
    });
    it('启用', function(){
      uploader.set('disabled', false);
      expect(uploader.get('button').get('disabled')).to.be(false);
    });
  });

  describe('测试修改url', function(){
    it('测试修改url', function(){
      var old = uploader.get('url'),
        newUrl = 'http://localhost/upload/uploadNew.php';
      uploader.set('url', newUrl);
      expect(uploader.get('uploaderType').get('url')).to.be(newUrl);
      uploader.set('url', old);
    })
  })

  describe('测试修改text', function(){
    it('测试修改text', function(){
      uploader.set('text', '选择文件');
      expect(uploader.get('button').get('text')).to.be('选择文件');
    });
  })

  describe('测试修改name', function(){
    it('测试修改name', function(){
      uploader.set('name', 'fileName');
      expect(uploader.get('button').get('name')).to.be('fileName');
    });
  })



  var file = {'name': 'a.jpg', 'size': 1000},
    files = [
      {id: '1','name': 'a.jpg', 'size': 1000, ext:'.jpg', success:true},
      {id: '2','name': 'b.jpg', 'size': 1000, ext:'.jpg', file: 'a'}
    ];

  var successCallback = sinon.spy(),
    completeCallback = sinon.spy();

  uploader.on('success', successCallback);
  uploader.on('complete', completeCallback);

  describe('测试文件的上传', function(){

    if(!!window.FormData){
      uploader.get('queue').addItems(BUI.cloneObject(files));

      it('测试success的回调', function(done){
        setTimeout(function(){
          expect(successCallback.called).to.be(true);
          done();
        }, 200);
      });
      it('测试complete的回调', function(done){
        setTimeout(function(){
          expect(completeCallback.called).to.be(true);
          done();
        }, 200);
      });
      it('测试回调执行的次数是否正确', function(done){
        setTimeout(function(){
          expect(successCallback.callCount).to.be(1);
          done();
        }, 200)
      });
    }
  })

  describe('测试不进行自动上传', function(){

    uploader.set('autoUpload', false);

    it('添加的数量是否正确', function(){
      uploader.get('queue').addItems(BUI.cloneObject(files));
      expect(uploader.get('queue').getItemsByStatus('add').length).to.be(1);
    });

    // waits(200);
    // uploader.set('autoUpload', true);

  //   waits(100);
  //   it('测试success的回调', function(){
  //     runs(function(){
  //       expect(successCallback.callCount).to.be(1);
  //     });
  //   });
  //   it('测试complete的回调', function(){
  //     runs(function(){
  //       expect(completeCallback.callCount).to.be(1);
  //     });
  //   });

    
  //   it('测试回调执行的次数是否正确', function(){
  //     runs(function(){
        
  //     })
  //   });
  })
});

//测试flash上传类型
describe('测试flash上传类型', function() {
  $('<div id="J_UploaderFlash"></div>').appendTo(document.body);
  var uploader = new Uploader.Uploader({
    render: '#J_UploaderFlash',
    type: 'flash',
    // disabled: true,
    // multiple: false,
    // queueTarget: '#J_UploaderQueue',
    url: 'upload/upload.php',
    button: {
      filter: {ext:".jpg,.jpeg,.png,.gif,.bmp"}//,
      // flashUrl: 'http://g.tbcdn.cn/fi/bui/uploader/uploader.swf'
    }
  });
  uploader.render();
  var el = uploader.get('el');

  describe('测试DOM生成', function(){
    it('render函数是否执行成功', function(){
      //expect(el.children().length).not.to.be(0);
    });
  });

  describe('测试disalbed属性', function(){
    it('初始值', function(){
      expect(uploader.get('button').get('disabled')).to.be(false);
    });
    it('禁用', function(){
      uploader.set('disabled', true);
      expect(uploader.get('button').get('disabled')).to.be(true);
    });
    it('启用', function(){
      uploader.set('disabled', false);
      expect(uploader.get('button').get('disabled')).to.be(false);
    });
  });
});

//测试iframe上传类型
describe('测试iframe上传类型', function() {
  $('<div id="J_UploaderIframe"></div>').appendTo(document.body);
  var uploader = new Uploader.Uploader({
    render: '#J_UploaderIframe',
    type: 'iframe',
    // disabled: true,
    // queueTarget: '#J_UploaderQueue',
    url: 'upload/upload.php',
    button: {
      filter: {ext:".jpg,.jpeg,.png,.gif,.bmp"}
    }
  });
  uploader.render();
  var el = uploader.get('el');

  describe('测试DOM生成', function(){
    it('render函数是否执行成功', function(){
      //expect(el.children().length).not.to.be(0);
    });
  });
});
