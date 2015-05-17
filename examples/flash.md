# Flash

---

## Normal usage

````html
<link rel="stylesheet" href="../css/uploader.css">
<div class="row">
  <div class="span8">
    <div id="J_Uploader">
      <input type="hidden" />
    </div>
  </div>
</div>
````

````javascript
seajs.use('index', function(Uploader) {
  //使用此类型时，需要确认assets的域名是否和上传路径的域名一致
  //如果不一致，则需要在上传路径的根目录下主置crossdomain.xml文件
  //或者把uploader.swf放到同域名下，然后指定flashUrl
  var uploader = new Uploader.Uploader({
    type:'flash',
    render: '#J_Uploader',
    url: '../../../test/upload/upload.php'//,
    // button: {
    //   flashUrl: baseUrl + 'uploader/uploader.swf'
    // }
  });
  uploader.render();
});
````
