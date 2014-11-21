/*
mod文件添加define头
*/

'use strict';

var REQUIRE_REG = /require\((['"])([\s\S]+?)\1\)/g;

module.exports = function(content, file){
	if(file.isMod && file.isJsLike){
		if(!/^\s*define\s*\(/.test(content)){
            content = "define('" + file.subpath + "', function(require, exports, module){" + content + "\r\n});";
        }

        //feather中require的模块 要么是以/开头 要么是可map读取，
        //这边兼容下fis对require路径转换给PAFFE带来的bug
        content = content.replace(REQUIRE_REG, function(_0, _1, _2){
            var file = feather.file.wrap(_2);
            return "require('" + (file.exists() ? file.subpath : _2) + "')";
        });
	}

	return content;
};