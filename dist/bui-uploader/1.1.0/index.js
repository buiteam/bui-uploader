define("bui-uploader/1.1.0/index",["bui-common/1.1.0/common","jquery","bui-list/1.1.0/index","bui-data/1.1.0/index","bui-swf/1.1.0/index"],function(e,t,r){var i=e("bui-common/1.1.0/common"),n=i.namespace("Uploader");i.mix(n,{Uploader:e("bui-uploader/1.1.0/src/uploader"),Queue:e("bui-uploader/1.1.0/src/queue"),Theme:e("bui-uploader/1.1.0/src/theme"),Factory:e("bui-uploader/1.1.0/src/factory")}),r.exports=n}),define("bui-uploader/1.1.0/src/uploader",["jquery","bui-common/1.1.0/common","bui-list/1.1.0/index","bui-data/1.1.0/index","bui-swf/1.1.0/index"],function(e,t,r){function i(e){return f[e]&&f[e]()}function n(e,t,r){u.isFunction(e.set)?e.set(t,r):e[t]=r}var a=e("jquery"),u=e("bui-common/1.1.0/common"),o=u.Component,s=e("bui-uploader/1.1.0/src/file"),l=e("bui-uploader/1.1.0/src/theme"),c=e("bui-uploader/1.1.0/src/factory"),d=e("bui-uploader/1.1.0/src/validator"),f={ajax:function(){return!!window.FormData},flash:function(){return!0},iframe:function(){return!0}},p=o.Controller.extend({initializer:function(){var e=this;e._initTheme(),e._initType()},renderUI:function(){var e=this;e._renderButton(),e._renderUploaderType(),e._renderQueue(),e._initValidator()},bindUI:function(){var e=this;e._bindButton(),e._bindUploaderCore(),e._bindQueue()},_initTheme:function(){var e=this,t=l.getTheme(e.get("theme")),r=e.getAttrVals();u.each(t,function(t,i){void 0===r[i]?e.set(i,t):a.isPlainObject(t)&&(u.mix(t,r[i]),e.set(i,t))})},_initType:function(){var e=this,t=e.get("types"),r=e.get("type");r||u.each(t,function(e){return i(e)?(r=e,!1):void 0}),e.set("type",r)},_initValidator:function(){var e=this,t=e.get("validator");t||(t=new d({queue:e.get("queue"),rules:e.get("rules")}),e.set("validator",t))},_renderUploaderType:function(){var e=this,t=e.get("type"),r=e.get("uploaderType"),i=c.createUploadType(t,r);i.set("uploader",e),e.set("uploaderType",i)},_renderButton:function(){var e=this,t=e.get("type"),r=e.get("el"),i=e.get("button");i.isController||(i.render=r,i.autoRender=!0,i=c.createButton(t,i),e.set("button",i)),i.set("uploader",e)},_renderQueue:function(){var e=this,t=e.get("el"),r=e.get("queue");r.isController||(r.render=t,r.autoRender=!0,r=c.createQueue(r),e.set("queue",r)),r.set("uploader",e)},_bindButton:function(){var e=this,t=e.get("button"),r=e.get("queue");t.on("change",function(t){var i=t.files;e.fire("beforechange",{items:i}),r.addItems(i),e.fire("change",{items:i})})},_bindQueue:function(){var e=this,t=e.get("queue"),r=(e.get("button"),e.get("validator"));t.on("itemrendered",function(i){var n=i.item,a=t.status(n)||"add";n.isUploaderFile||(n.result=u.cloneObject(n),n=s.create(n)),r.valid(n)||(a="error"),t.updateFileStatus(n,a),e.get("autoUpload")&&e.upload()}),t.on("itemupdated",function(){e.uploadFiles()})},_bindUploaderCore:function(){var e=this,t=e.get("queue"),r=e.get("uploaderType");r.on("start",function(t){var r=t.file;delete r.result,e.fire("start",{item:r})}),r.on("progress",function(r){var i=e.get("curUploadItem"),n=r.loaded,a=r.total;u.mix(i,{total:a,loaded:n,loadedPercent:100*n/a}),t.updateFileStatus(i,"progress"),e.fire("progress",{item:i,total:a,loaded:n})}),r.on("error",function(){var r=e.get("curUploadItem"),i=e.get("error"),n=e.get("complete");t.updateFileStatus(r,"error"),i&&u.isFunction(i)&&i.call(e),e.fire("error",{item:r}),n&&u.isFunction(n)&&n.call(e),e.fire("complete",{item:r}),e.set("curUploadItem",null)}),r.on("complete",function(r){var i=e.get("curUploadItem"),n=r.result,a=e.get("isSuccess"),o=e.get("success"),s=e.get("error"),l=e.get("complete");e.set("curUploadItem",null),i.result=n,a.call(e,n)?(u.mix(i,n),t.updateFileStatus(i,"success"),o&&u.isFunction(o)&&o.call(e,n),e.fire("success",{item:i,result:n})):(t.updateFileStatus(i,"error"),s&&u.isFunction(s)&&s.call(e,n),e.fire("error",{item:i,result:n})),l&&u.isFunction(l)&&l.call(e,n),e.fire("complete",{item:i,result:n})})},uploadFile:function(e){var t=this,r=t.get("queue"),i=t.get("uploaderType"),n=t.get("curUploadItem");e&&!n&&(t.set("curUploadItem",e),r.updateFileStatus(e,"start"),i.upload(e))},uploadFiles:function(){var e=this,t=e.get("queue"),r=t.getItemsByStatus("wait");r&&r.length&&e.uploadFile(r[0])},upload:function(){var e=this,t=e.get("queue"),r=t.getItemsByStatus("add");u.each(r,function(e){t.updateFileStatus(e,"wait")})},cancel:function(e){var t=this;return e?void t._cancel(e):void u.each(t.get("queue").getItemsByStatus("wait"),function(e){t._cancel(e)})},_cancel:function(e){var t=this,r=t.get("queue"),i=t.get("uploaderType"),n=t.get("curUploadItem");n===e&&(i.cancel(),t.set("curUploadItem",null)),r.updateFileStatus(e,"cancel"),t.fire("cancel",{item:e})},isValid:function(){var e=this,t=e.get("queue");return t.getItemsByStatus("success").length===t.getItems().length}},{ATTRS:{types:{value:["ajax","flash","iframe"]},type:{},theme:{value:"default"},button:{value:{},shared:!1},text:{setter:function(e){return n(this.get("button"),"text",e),e}},name:{setter:function(e){return n(this.get("button"),"name",e),n(this.get("uploaderType"),"fileDataName",e),e}},disabled:{value:!1,setter:function(e){return n(this.get("button"),"disabled",e),e}},multiple:{value:!0,setter:function(e){return n(this.get("button"),"multiple",e),e}},filter:{setter:function(e){return n(this.get("button"),"filter",e),e}},uploaderType:{value:{},shared:!1},url:{setter:function(e){return n(this.get("uploaderType"),"url",e),e}},data:{setter:function(e){return n(this.get("uploaderType"),"data",e),e}},queue:{value:{},shared:!1},resultTpl:{setter:function(e){return n(this.get("queue"),"resultTpl",e),e}},autoUpload:{value:!0},uploadStatus:{},isSuccess:{value:function(e){return e&&e.url?!0:!1}},validator:{},events:{value:{change:!1,start:!1,progress:!1,success:!1,error:!1,complete:!1,cancel:!1}}}},{xclass:"uploader"});r.exports=p}),define("bui-uploader/1.1.0/src/file",["bui-common/1.1.0/common","jquery"],function(e,t,r){function i(e){return e.replace(/.*(\/|\\)/,"")}function n(e){var t=/\.[^\.]+$/.exec(e)||[];return t.join("").toLowerCase()}function a(e){var t=-1;do e/=1024,t++;while(e>99);return Math.max(e,.1).toFixed(1)+["KB","MB","GB","TB","PB","EB"][t]}var u=e("bui-common/1.1.0/common");r.exports={create:function(e){return e.id=e.id||u.guid("bui-uploader-file"),e.name=i(e.name),e.ext=n(e.name),e.textSize=a(e.size),e.isUploaderFile=!0,e}}}),define("bui-uploader/1.1.0/src/theme",["bui-common/1.1.0/common","jquery"],function(e,t,r){var i=e("bui-common/1.1.0/common"),n={},a={addTheme:function(e,t){n[e]=t},getTheme:function(e){return i.cloneObject(n[e])}};a.addTheme("default",{elCls:"defaultTheme"}),a.addTheme("imageView",{elCls:"imageViewTheme",queue:{resultTpl:{success:'<div class="success"><img src="{url}" /></div>'}}}),r.exports=a}),define("bui-uploader/1.1.0/src/factory",["bui-common/1.1.0/common","jquery","bui-list/1.1.0/index","bui-data/1.1.0/index","bui-swf/1.1.0/index"],function(e,t,r){function i(){}var n=(e("bui-common/1.1.0/common"),e("bui-uploader/1.1.0/src/queue")),a=e("bui-uploader/1.1.0/src/button/htmlButton"),u=e("bui-uploader/1.1.0/src/button/swfButton"),o=e("bui-uploader/1.1.0/src/type/ajax"),s=e("bui-uploader/1.1.0/src/type/flash"),l=e("bui-uploader/1.1.0/src/type/iframe");i.prototype={createUploadType:function(e,t){return"ajax"===e?new o(t):"flash"===e?new s(t):new l(t)},createButton:function(e,t){return"ajax"===e||"iframe"===e?new a(t):new u(t)},createQueue:function(e){return new n(e)}},r.exports=new i}),define("bui-uploader/1.1.0/src/queue",["jquery","bui-common/1.1.0/common","bui-list/1.1.0/index","bui-data/1.1.0/index"],function(e,t,r){var i=e("jquery"),n=e("bui-common/1.1.0/common"),a=e("bui-list/1.1.0/index").SimpleList,u=n.prefix+"queue",o=u+"-item",s=a.extend({bindUI:function(){var e=this,t=e.get("el"),r=e.get("delCls");t.delegate("."+r,"click",function(t){var r=i(t.target).parents(".bui-queue-item"),n=e.getItemByElement(r);e.fire("beforeremove",{item:n})!==!1&&e.removeItem(n)})},removeItem:function(e){var t=this,r=t.get("uploader");r&&r.cancel&&r.cancel(e),s.superclass.removeItem.call(t,e)},updateFileStatus:function(e,t,r){var i=this,a=i.get("itemStatusFields");r=r||i.findElement(e),n.each(a,function(t,n){i.setItemStatus(e,n,!1,r)}),i.setItemStatus(e,t,!0,r),i._setResultTpl(e,t),i.updateItem(e)},_setResultTpl:function(e,t){var r=this,i=r.get("resultTpl"),a=i[t]||i["default"],u=n.mix(e,e.result);e.resultTpl=n.substitute(a,u)},status:function(e){var t,r=this,i=r.get("itemStatusFields");return n.each(i,function(r){return e[r]?(t=r,!1):void 0}),t}},{ATTRS:{itemTpl:{value:'<li>{resultTpl} <span class="action"><span class="'+o+'-del">\u5220\u9664</span></span></li>'},resultTpl:{value:{"default":'<div class="default">{name}</div>',success:'<div data-url="{url}" class="success">{name}</div>',error:'<div class="error"><span title="{name}">{name}</span><span class="uploader-error">{msg}</span></div>',progress:'<div class="progress"><div class="bar" style="width:{loadedPercent}%"></div></div>'},setter:function(e){return n.mix({},this.get("resultTpl"),e)}},itemCls:{value:o},delCls:{value:o+"-del"},itemStatusFields:{value:{add:"add",wait:"wait",start:"start",progress:"progress",success:"success",cancel:"cancel",error:"error"}}}},{xclass:"queue"});r.exports=s}),define("bui-uploader/1.1.0/src/button/htmlButton",["jquery","bui-common/1.1.0/common"],function(e,t,r){var i=e("jquery"),n=e("bui-common/1.1.0/common"),a=(n.Component,e("bui-uploader/1.1.0/src/file")),u=e("bui-uploader/1.1.0/src/button/base"),o=n.UA,s=u.extend({renderUI:function(){var e=this;e._createInput()},_createInput:function(){var e,t=this,r=t.get("buttonCls"),i=t.get("el").find("."+r),a=t.get("inputTpl"),u=t.get("name");a=n.substitute(a,{name:u}),i.append(a),e=i.find("input"),6==o.ie&&e.css("fontSize","400px"),t._bindChangeHandler(e),t.set("fileInput",e),t._uiSetMultiple(t.get("multiple")),t._uiSetDisabled(t.get("disabled")),t._uiSetFilter(t.get("filter"))},_bindChangeHandler:function(e){var t=this;i(e).on("change",function(r){var u=i(this).val(),o=r.target.files,s=[];o?n.each(o,function(t){s.push(a.create({name:t.name,type:t.type,size:t.size,file:t,input:e}))}):s.push(a.create({name:u,input:e})),t.fire("change",{files:s,input:this}),t.reset()})},reset:function(){var e=this,t=e.get("fileInput");return t.parent().remove(),e.set("fileInput",null),e._createInput(),e},_uiSetMultiple:function(e){var t=this,r=t.get("fileInput");return r&&r.length?(e?r.attr("multiple","multiple"):r.removeAttr("multiple"),e):!1},_uiSetDisabled:function(e){var t=this,r=t.get("fileInput");e?r.hide():r.show()},_uiSetFilter:function(e){var t=this,r=t.get("fileInput"),i=t.getFilter(e);return r&&r.length?(i.type&&r.attr("accept",i.type),i):!1},_uiSetName:function(e){i(this.get("fileInput")).attr("name",e)}},{ATTRS:{inputTpl:{view:!0,value:'<div class="file-input-wrapper"><input type="file" name="{name}" hidefocus="true" class="file-input" /></div>'},fileInput:{}}},{xclass:"uploader-htmlButton"});r.exports=s}),define("bui-uploader/1.1.0/src/button/base",["bui-common/1.1.0/common","jquery"],function(e,t,r){var i=e("bui-common/1.1.0/common"),n=i.Component,a=e("bui-uploader/1.1.0/src/button/filter"),u=i.prefix,o=u+"uploader",s=o+"-button",l=s+"-text",c=n.View.extend({_uiSetText:function(){var e=this,t=e.get("text"),r=e.get("textCls"),i=e.get("el").find("."+r);i.text(t)}},{ATTRS:{}},{xclass:"uploader-button-view"}),d=n.Controller.extend({getFilter:function(e){if(e){var t=[],r=[],i=[];return e.desc&&(t.push(e.desc),r.push(a.getExtByDesc(e.desc)),i.push(a.getTypeByDesc(e.desc))),e.ext&&(r.push(e.ext),i.push(a.getTypeByExt(e.ext))),e.type,{desc:t.join(","),ext:r.join(","),type:i.join(",")}}}},{ATTRS:{buttonCls:{value:s+"-wrap",view:!0},textCls:{value:l,view:!0},text:{view:!0,value:"\u4e0a\u4f20\u6587\u4ef6"},name:{value:"fileData"},tpl:{view:!0,value:'<a href="javascript:void(0);" class="'+s+'-wrap"><span class="'+l+'">{text}</span></a>'},disabled:{value:!1},multiple:{value:!0},filter:{shared:!1,value:[]},events:{value:{change:!1}},xview:{value:c}}},{xclass:"uploader-button"});d.View=c,r.exports=d}),define("bui-uploader/1.1.0/src/button/filter",["bui-common/1.1.0/common","jquery"],function(e,t,r){var i=e("bui-common/1.1.0/common"),n={msexcel:{type:"application/msexcel",ext:".xls,.xlsx"},msword:{type:"application/msword",ext:".doc,.docx"},gif:{type:"image/gif",ext:".gif"},jpeg:{type:"image/jpeg",ext:".jpg"},bmp:{type:"image/x-ms-bmp",ext:".bmp"},png:{type:"image/png",ext:".png"}};r.exports={_getValueByDesc:function(e,t){var r=[];return i.isString(e)&&(e=e.split(",")),i.isArray(e)&&i.each(e,function(e){var i=n[e];i&&i[t]&&r.push(i[t])}),r.join(",")},getTypeByDesc:function(e){return this._getValueByDesc(e,"type")},getExtByDesc:function(e){return this._getValueByDesc(e,"ext")},getTypeByExt:function(e){var t=[];return i.isString(e)&&(e=e.split(",")),i.isArray(e)&&i.each(e,function(e){i.each(n,function(r){i.Array.indexOf(e,r.ext.split(","))>-1&&t.push(r.type)})}),t.join(",")}}}),define("bui-uploader/1.1.0/src/button/swfButton",["jquery","bui-common/1.1.0/common","bui-swf/1.1.0/index"],function(e,t,r){function i(){return window.seajs?seajs.pluginSDK?seajs.pluginSDK.util.loaderDir:seajs.data.paths.bui:window.KISSY?KISSY.Config.packages.bui.base:void 0}var n=e("jquery"),a=e("bui-common/1.1.0/common"),u=(a.Component,e("bui-uploader/1.1.0/src/file")),o=e("bui-uploader/1.1.0/src/button/base"),s=i(),l=e("bui-uploader/1.1.0/src/button/ajbridge"),c=o.extend({renderUI:function(){var e=this;e._initSwfUploader()},bindUI:function(){var e=this,t=e.get("swfUploader");t.on("contentReady",function(){e.fire("swfReady",{swfUploader:t}),t.on("fileSelect",function(t){var r=t.fileList,i=[];a.each(r,function(e){i.push(u.create(e))}),e.fire("change",{files:i})})})},syncUI:function(){var e=this,t=e.get("swfUploader");t.on("contentReady",function(){e._uiSetMultiple(e.get("multiple")),e._uiSetFilter(e.get("filter"))})},_initSwfUploader:function(){var e,t=this,r=t.get("buttonCls"),i=t.get("el").find("."+r),u=t.get("flash"),o=t.get("flashUrl"),s=t.get("swfTpl"),c=n(s).appendTo(i);a.mix(u,{render:c,src:o}),e=new l(u),t.set("swfEl",c),t.set("swfUploader",e)},_uiSetMultiple:function(e){var t=this,r=t.get("swfUploader");return r&&r.multifile(e),e},_uiSetDisabled:function(e){var t=this,r=t.get("swfEl");return e?r.hide():r.show(),e},_convertFilter:function(e){var t=(e.desc,[]);return a.each(e.ext.split(","),function(e){e&&t.push("*"+e)}),e.ext=t.join(";"),e},_uiSetFilter:function(e){var t=this,r=t.get("swfUploader"),i=t._convertFilter(t.getFilter(e));return r&&r.filter([i]),e}},{ATTRS:{swfEl:{},swfUploader:{},flashUrl:{value:s+"uploader.swf"},flash:{value:{params:{allowscriptaccess:"always",bgcolor:"#fff",wmode:"transparent",flashvars:{hand:!0,btn:!0,jsEntry:"BUI.AJBridge.eventHandler"}}},shared:!1},swfTpl:{view:!0,value:'<div class="uploader-button-swf"></div>'}}},{xclass:"uploader-swfButton"});r.exports=c}),define("bui-uploader/1.1.0/src/button/ajbridge",["bui-common/1.1.0/common","jquery","bui-swf/1.1.0/index"],function(e,t,r){function i(e){i.superclass.constructor.call(this,e)}var n=e("bui-common/1.1.0/common"),a=e("bui-swf/1.1.0/index"),u={};n.mix(i,{eventHandler:function(e,t){var r=u[e];r&&r.__eventHandler(e,t)},augment:function(e,t){n.isString(t)&&(t=[t]),n.isArray(t)&&n.each(t,function(t){e.prototype[t]=function(){try{return this.callSWF(t,Array.prototype.slice.call(arguments,0))}catch(e){this.fire("error",{message:e})}}})}}),n.extend(i,a),n.augment(i,{initializer:function(){i.superclass.initializer.call(this);var e=this,t=e.get("attrs"),r=t.id;u[r]=e,e.set("id",r)},__eventHandler:function(e,t){var r=this,i=t.type;switch(t.id=e,i){case"log":n.log(t.message);break;default:r.fire(i,t)}},destroy:function(){i.superclass.destroy.call(this);var e=this.get("id");u[e]&&delete u[e]}}),i.augment(i,["activate","getReady","getCoreVersion","setFileFilters","filter","setAllowMultipleFiles","multifile","browse","upload","uploadAll","cancel","getFile","removeFile","lock","unlock","setBtnMode","useHand","clear"]),n.AJBridge=i,r.exports=i}),define("bui-uploader/1.1.0/src/type/ajax",["bui-common/1.1.0/common","jquery"],function(e,t,r){function i(e){var t=this;i.superclass.constructor.call(t,e)}var n="[uploader-Ajax]:",a=e("bui-uploader/1.1.0/src/type/base");BUI.extend(i,a,{upload:function(e){if(!e||!e.file)return BUI.log(n+"upload()\uff0cfileData\u53c2\u6570\u6709\u8bef\uff01"),!1;var t=this;return t.set("file",e),t.fire("start",{file:e}),t._setFormData(),t._addFileData(e.file),t.send(),t},cancel:function(){var e=this,t=e.get("xhr"),r=e.get("file");return t&&(t.abort(),e.fire("cancel",{file:r})),e.set("file",null),e},send:function(){var e=this,t=e.get("url"),r=e.get("formData"),i=e.get("file"),n=new XMLHttpRequest;return n.upload.addEventListener("progress",function(t){e.fire("progress",{loaded:t.loaded,total:t.total})}),n.onload=function(){var t=e._processResponse(n.responseText);e.fire("complete",{result:t,file:i})},n.onerror=function(){e.fire("error",{file:i})},n.open("POST",t,!0),n.send(r),e._setFormData(),e.set("xhr",n),e},reset:function(){},_setFormData:function(){var e=this;try{e.set("formData",new FormData),e._processData()}catch(t){BUI.log(n+"something error when reset FormData."),BUI.log(t,"dir")}},_processData:function(){var e=this,t=e.get("data"),r=e.get("formData");BUI.each(t,function(e,t){r.append(t,e)}),e.set("formData",r)},_addFileData:function(e){if(!e)return BUI.log(n+"_addFileData()\uff0cfile\u53c2\u6570\u6709\u8bef\uff01"),!1;var t=this,r=t.get("formData"),i=t.get("fileDataName");r.append(i,e),t.set("formData",r)}},{ATTRS:{formData:{},xhr:{},events:{value:{progress:!1}}}}),r.exports=i}),define("bui-uploader/1.1.0/src/type/base",["bui-common/1.1.0/common","jquery"],function(e,t,r){function i(e){var t=this;i.superclass.constructor.call(t,e)}var n=e("bui-common/1.1.0/common");i.ATTRS={file:{},url:{},data:{},fileDataName:{value:"Filedata"},events:{value:{start:!1,cancel:!1,success:!1,error:!1}}},n.extend(i,n.Base,{upload:function(){},cancel:function(){},_processResponse:function(e){{var t,r=this;r.get("file")}if(n.isString(e))try{t=n.JSON.parse(e)}catch(i){t=e}else n.isObject(e)&&(t=r._fromUnicode(e));return n.log("\u670d\u52a1\u5668\u7aef\u8f93\u51fa\uff1a"+n.JSON.stringify(t)),t},_fromUnicode:function(e){function t(e){n.each(e,function(r,i){n.isObject(e[i])?t(e[i]):e[i]=n.isString(r)&&n.fromUnicode(r)||r})}return n.isObject(e)?(t(e),e):e},reset:function(){}}),r.exports=i}),define("bui-uploader/1.1.0/src/type/flash",["jquery","bui-common/1.1.0/common"],function(e,t,r){function i(e){var t=this;i.superclass.constructor.call(t,e)}var n=e("jquery"),a=e("bui-uploader/1.1.0/src/type/base"),u="[uploader-Flash]:",o=new RegExp("^([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$"),s=new RegExp("^(?:([\\w\\d+.-]+):)?(?://([\\w\\d\\-\\u0100-\\uffff.+%]*))?.*$");BUI.extend(i,a,{_initSwfUploader:function(){var e=this,t=e.get("swfUploader");return t?(e.fire("swfReady"),e._hasCrossdomain(),t.on("uploadStart",function(){var t=e.get("file");e.fire("start",{file:t})}),t.on("uploadProgress",function(t){BUI.mix(t,{loaded:t.bytesLoaded,total:t.bytesTotal}),BUI.log(u+"\u5df2\u7ecf\u4e0a\u4f20\u5b57\u8282\u6570\u4e3a\uff1a"+t.bytesLoaded),e.fire("progress",{loaded:t.loaded,total:t.total})}),t.on("uploadCompleteData",function(t){var r=e.get("file"),i=e._processResponse(t.data);e.fire("complete",{result:i,file:r}),e.set("file",null)}),void t.on("uploadError",function(){var t=e.get("file");e.fire("error",{file:t}),e.set("file",null)})):(BUI.log(u+"swfUploader\u5bf9\u8c61\u4e3a\u7a7a\uff01"),!1)},upload:function(e){var t=this,r=t.get("swfUploader"),i=t.get("url"),n="POST",a=t.get("data"),u=t.get("fileDataName");if(e)return t.set("file",e),r.upload(e.id,i,n,a,u),t},cancel:function(){var e=this,t=e.get("swfUploader"),r=e.get("file");return r&&(t.cancel(r.id),e.fire("cancel",{file:r}),e.set("file",null)),e},_hasCrossdomain:function(){var e=this,t=e.get("url").match(s)||[],r=e.get("swfUploader").get("src").match(s)||[],i=t[2],a=r[2];i&&a&&i!==a&&n.ajax({url:t[1]+"://"+i+"/crossdomain.xml",dataType:"xml",error:function(){BUI.log("\u7f3a\u5c11crossdomain.xml\u6587\u4ef6\u6216\u8be5\u6587\u4ef6\u4e0d\u5408\u6cd5\uff01")}})}},{ATTRS:{uploader:{setter:function(e){var t=this;if(e&&e.isController){var r=e.get("button");r.on("swfReady",function(e){t.set("swfUploader",e.swfUploader),t._initSwfUploader()})}}},url:{setter:function(e){var t=/^http/;if(!t.test(e)){var r,i=location.href.match(o)||[],n=i[1]||"",a=n.split("/");r=BUI.Array.filter(a,function(e,t){return t<a.length-1}),e=r.join("/")+"/"+e}return e}},swfUploader:{},uploadingId:{},events:{value:{swfReady:!1,progress:!1}}}}),r.exports=i}),define("bui-uploader/1.1.0/src/type/iframe",["jquery","bui-common/1.1.0/common"],function(e,t,r){function i(e){var t=this;i.superclass.constructor.call(t,e)}var n=e("jquery"),a=e("bui-uploader/1.1.0/src/type/base"),u="bui-uploader-iframe-";BUI.extend(i,a,{upload:function(e){var t,r=this,i=e.input;return e?(r.fire("start",{file:e}),r.set("file",e),r.set("fileInput",i),r._create(),t=r.get("form"),void(t&&t[0].submit())):!1},cancel:function(){{var e=this;e.get("iframe")}return e.reset(),e.fire("cancel"),e},dataToHidden:function(e){if(!n.isPlainObject(e)||n.isEmptyObject(e))return"";var t=this,r=[],i=t.get("tpl"),a=i.HIDDEN_INPUT;if(!BUI.isString(a))return"";for(var u in e)r.push(BUI.substitute(a,{name:u,value:e[u]}));return r.join()},_createIframe:function(){var e,t=this,r=u+BUI.guid(),i=t.get("tpl"),a=(i.IFRAME,t.get("iframe"));return n.isEmptyObject(a)?(e=n(BUI.substitute(i.IFRAME,{id:r})),n("body").append(e),e.on("load",function(e){t._iframeLoadHandler(e)}),t.set("id",r),t.set("iframe",e),e):a},_iframeLoadHandler:function(e){var t,r=this,i=e.target,n=i.contentDocument||window.frames[i.id].document;if(!n||!n.body)return r.fire("error",{msg:"\u670d\u52a1\u5668\u7aef\u8fd4\u56de\u6570\u636e\u6709\u95ee\u9898\uff01"}),!1;var a=n.body.innerHTML;return""==a?void r.fire("error"):(t=r._processResponse(a),r.fire("complete",{result:t,file:r.get("file")}),void r.reset())},_createForm:function(){var e,t,r=this,i=r.get("id"),a=r.get("tpl"),u=a.FORM,o=r.get("data"),s=r.get("url"),l=r.get("fileInput");return BUI.isString(u)&&BUI.isString(s)?(e=r.dataToHidden(o),e+=r.dataToHidden({type:"iframe"}),t=BUI.substitute(u,{action:s,target:i,hiddenInputs:e}),t=n(t).append(l),n("body").append(t),r.set("form",t),t):!1},_create:function(){var e=this,t=e._createIframe(),r=e._createForm();e.fire("create",{iframe:t,form:r})},_remove:function(){var e=this,t=e.get("form");return t?(t.remove(),e.set("form",null),void e.fire("remove",{form:t})):!1},reset:function(){var e=this;e._remove(),e.set("file",null)}},{ATTRS:{tpl:{value:{IFRAME:'<iframe src="javascript:false;" name="{id}" id="{id}" border="no" width="1" height="1" style="display: none;" />',FORM:'<form method="post" enctype="multipart/form-data" action="{action}" target="{target}" style="visibility: hidden;">{hiddenInputs}</form>',HIDDEN_INPUT:'<input type="hidden" name="{name}" value="{value}" />'}},id:{value:u+BUI.guid()},iframe:{value:{}},form:{},fileInput:{},events:{value:{create:!1,remove:!1}}}}),r.exports=i}),define("bui-uploader/1.1.0/src/validator",["jquery","bui-common/1.1.0/common"],function(e,t,r){function i(e){i.superclass.constructor.call(this,e)}var n=e("jquery"),a=e("bui-common/1.1.0/common");i.ATTRS={rules:{},queue:{}},a.extend(i,a.Base),a.augment(i,{valid:function(e){return this._validItem(e)},_validItem:function(e){var t=this,r=t.get("rules"),i=!0;return a.each(r,function(r,n){return i=i&&t._validRule(e,n,r)}),i},_validRule:function(e,t,r,n){a.isArray(r)&&(n=a.substitute(r[1],r),r=r[0]);var u=i.getRule(t),o=u&&u.call(this,e,r,n),s=this._getResult(o);return s?(e.result=s,!1):!0},_getResult:function(e){return e?{msg:e}:void 0}});var u={};i.addRule=function(e,t){u[e]=t},i.getRule=function(e){return u[e]},i.addRule("maxSize",function(e,t,r){return e.size>1024*t?r:void 0}),i.addRule("minSize",function(e,t,r){return e.size<1024*t?r:void 0}),i.addRule("max",function(e,t,r){var i=this.get("queue").getCount();return i>t?r:void 0}),i.addRule("min",function(e,t,r){var i=this.get("queue").getCount();return t>i?r:void 0}),i.addRule("ext",function(e,t,r){var i=e.ext,t=t.split(",");return-1===n.inArray(i,t)?r:void 0}),r.exports=i});