# swfuplod

---

## 默认使用方式

````html
<link href="http://g.tbcdn.cn/fi/bui/css/dpl-min.css" rel="stylesheet"> 
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
  var uploader = new Uploader.Uploader({
    type:'uploadify',
    render: '#J_Uploader',
    url: '../../../tests/data/uploader.json?nowrap'//,
    // button: {
    //   flashUrl: baseUrl + 'uploader/uploader.swf'
    // }
  });
  uploader.render();
});
````
