/*
mod文件添加define头
*/

'use strict';

var REQUIRE_REG = /require\((['"])([\s\S]+?)\1\)/g, DEFINE_REG = /\/\/[^\r\n]*|\/\*[\s\S]*?\*\/|\b(define)\s*\(\s*((?:(?!function\()[\s\S])+,)?\s*function\(/g;
var USE_REQUIRE = feather.config.get('require.use'), COMPONENT_USE_WRAPER = feather.config.get('require.componentUseWraper');

module.exports = function(content, file){
    if(file.isComponentLike && file.isJsLike && !USE_REQUIRE && !COMPONENT_USE_WRAPER) return content;

    if(file.isMod && file.isJsLike){
        var found = false;

        content = content.replace(DEFINE_REG, function($0, $1, $2){
            if($1){
                found = true;

                if($2 == null || $2[0] == '['){
                    return 'define("' + file.subpath + '",' + ($2 || '') + 'function(';
                }
            }
            
            return $0;
        });

        if(!found){
            content = "define('" + file.subpath + "', function(require, exports, module){\r\n" + content + "\r\n});";
        }

        //feather中require的模块 要么是以/开头 要么是可map读取，
        //这边兼容下fis对require路径转换给feather带来的bug
        content = content.replace(REQUIRE_REG, function(_0, _1, _2){
            var file = feather.file.wrap(_2);
            return "require('" + (file.exists() ? file.subpath : _2) + "')";
        });
    }

    return content;
};