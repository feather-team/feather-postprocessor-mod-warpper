feather-postprocessor-mod-wrapper
================

feather提供的自动为模块添加define头部的插件，可以在前端直接写和nodejs平台一样的风格代码，增加代码可移植性。
和feather-postprocessor-inline-compress一样，feather-postprocessor-mod-wrapper可同样作为fis的插件扩展。
注：feather-postprocessor-modwrapper并不会自动添加depens参数，目前类似requirejs或者seajs，depends参数非必填参数的模块加载工具，是可以直接使用feather-postprocessor-mod-wrapper自动添加头部。


###使用
feather-postprocessor-modwrapper在feather中无需再次安装，feather直接内置该插件。

/static/js/mod/a/a.js:
```js
var b = require('./b.js');

console.log(b.name);

exports.getName = function(){
    return 'a';
};
```

/static/js/mod/a/b.js:
```js
module.exports = {
    name: 'b'
};
```

通过该插件编译后：
/static/js/mod/a/a/.js
```js
define('/static/js/mod/a/a.js', function(require, exports, modules){
var b = require('/static/js/mod/a/b.js');

console.log(b.name);

exports.getName = function(){
    return 'a';
};
});
```

/static/js/mod/a/b.js
```js
define('/static/js/mod/a/b.js', function(require, exports, modules){
module.exports = {
    name: 'b'
};
});
```
